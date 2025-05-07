// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./StokvelNFT.sol";

contract Treasury {

    IERC20 public stableCoin; // ZAR stablecoin
    StockvelNFT public nftContract;
    
    struct MemberData {
        uint8 defaults;
        uint256 contributionBalance;
    }

    modifier onlyNFT {
        require(msg.sender == address(nftContract), "Unauthorized");
        _;
    }

    uint256 public constant CONTRIBUTION_AMOUNT = 1000e6; // R1,000 (6 decimals)
    uint256 public savingsBalance;
    uint256 public defiBalance;
    uint256 public reserveFund;
    uint256 public currentCycle;
    uint256 public cycleStartTime;
    uint256 public payoutIndex;
    uint256[] public payoutOrder = [1,2,3,4,5,6]; // Sequential order

    mapping(uint256 => MemberData) public memberData;
    mapping(uint256 => bool) public hasContributed;

    constructor(address _nftAddress, address _stableCoin) {
        stableCoin = IERC20(_stableCoin);
        nftContract = StockvelNFT(_nftAddress);
        cycleStartTime = block.timestamp;

    }

    // Initialize member in Treasury when they join
    function initializeMember(uint256 tokenId) external onlyNFT{
        require(msg.sender == address(nftContract), "Unauthorized");
        memberData[tokenId] = MemberData({
            defaults: 0,
            contributionBalance: 1000e6 // Initial contribution
        });
    }

    // Make monthly contribution
    function contribute(uint256 tokenId) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not member");
        require(nftContract.isMemberActive(tokenId), "Inactive");
        require(block.timestamp <= cycleStartTime + 10 days, "Late contribution");
        require(stableCoin.transferFrom(msg.sender, address(this), CONTRIBUTION_AMOUNT), "Transfer failed");
        
        // Split funds
        uint256 payoutShare = CONTRIBUTION_AMOUNT / 2;
        uint256 savingsShare = CONTRIBUTION_AMOUNT / 4;
        uint256 defiShare = CONTRIBUTION_AMOUNT / 4;
        
        savingsBalance = savingsBalance + savingsShare;
        defiBalance = defiBalance + defiShare;
        memberData[tokenId].contributionBalance = memberData[tokenId].contributionBalance + payoutShare;
        hasContributed[tokenId] = true;
        
        // Check if all members contributed
        if (allMembersContributed()) {
            distributePayout();
            resetCycle();
        }
    }

    // Distribute monthly payout with penalty deductions
    function distributePayout() internal {
        uint256 tokenId = payoutOrder[payoutIndex];
        uint256 penalty = calculatePenalty(tokenId);
        uint256 payoutAmount = memberData[tokenId].contributionBalance - penalty;
        
        stableCoin.transfer(nftContract.ownerOf(tokenId), payoutAmount);
        memberData[tokenId].contributionBalance = 0;
        payoutIndex = (payoutIndex + 1) % 6;
    }

    // Calculate penalty based on defaults
    function calculatePenalty(uint256 tokenId) internal returns (uint256) {
        uint256 penalty;
        if (memberData[tokenId].defaults == 1) penalty = CONTRIBUTION_AMOUNT / 10;
        else if (memberData[tokenId].defaults == 2) penalty = CONTRIBUTION_AMOUNT * 4 / 10;
        memberData[tokenId].defaults = 0;
        return penalty;
    }

    // Apply penalty for missed contributions
    function applyPenalty(uint256 tokenId) external {
        require(!hasContributed[tokenId], "Contribution made");
        require(block.timestamp > cycleStartTime + 10 days, "Grace period ongoing");
        
        memberData[tokenId].defaults++;
        if (memberData[tokenId].defaults >= 3) {
            // Forfeit collateral
            stableCoin.transfer(address(nftContract), CONTRIBUTION_AMOUNT);
            nftContract.exit(tokenId);
        }
    }

    // Exit payout calculation
    function processExit(uint256 tokenId) external returns (uint256) {
        require(nftContract.isMemberActive(tokenId), "Inactive");
        require(block.timestamp >= nftContract.joinedAt(tokenId) + 180 days, "Cycle not complete");
        
        uint256 totalTreasury = savingsBalance + defiBalance + reserveFund;
        uint256 memberShare = totalTreasury / 6;
        uint256 payout = (memberShare*70)/100;
        
        // Distribute 70% to remaining members
        for (uint256 i = 0; i < payoutOrder.length; i++) {
            if (payoutOrder[i] != tokenId && nftContract.isMemberActive(payoutOrder[i])) {
                stableCoin.transfer(nftContract.ownerOf(payoutOrder[i]), payout / 5);
            }
        }
        
        // 30% to reserve
        reserveFund = reserveFund + ((memberShare*30)/(100));
        return payout;
    }

    // Check if all members contributed
    function allMembersContributed() internal view returns (bool) {
        for (uint256 i = 0; i < payoutOrder.length; i++) {
            if (!hasContributed[payoutOrder[i]]) return false;
        }
        return true;
    }

    // Start new cycle
    function resetCycle() internal {
        currentCycle++;
        cycleStartTime = block.timestamp;
        for (uint256 i = 0; i < payoutOrder.length; i++) {
            hasContributed[payoutOrder[i]] = false;
        }
    }
}