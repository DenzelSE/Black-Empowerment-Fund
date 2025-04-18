// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title StockvelNFT
 * @dev NFT-based membership for a 6-member stockvel with contribution tracking and exit policy
 */
contract StockvelNFT is ERC721, Ownable {
    
    // Maximum number of members
    uint256 public constant MAX_MEMBERS = 6;
    
    // Cycle duration in seconds (6 months)
    uint256 public constant CYCLE_DURATION = 180 days;
    
    // Cycle start timestamp
    uint256 public cycleStartTime;
    
    // Treasury address
    address public treasury;
    
    // Member NFT ID counter
    uint256 private _tokenIdCounter;
    
    // Membership price
    uint256 public membershipPrice;

    //Conttibution amount
    uint256 public  contribution;
    
    IERC20 public _stableToken;

    // Member information
    struct Member {
        bool isActive;
        uint256 joinedAt;
        uint256 contributions;
        bool hasPaidCurrentCycle;
    }
    
    // Mapping from NFT ID to Member info
    mapping(uint256 => Member) public members;
    
    // Array of active member token IDs
    uint256[] public activeMemberTokens;
    
    // Events
    event MemberJoined(address indexed member, uint256 tokenId);
    event MemberLeft(address indexed member, uint256 tokenId);
    event ContributionMade(address indexed member, uint256 amount);
    event PayoutReleased(address indexed member, uint256 amount);
    event NewCycleStarted(uint256 timestamp);
    
    /**
     * @dev Constructor to set up the initial contract state
     * @param _owner Initial owner of the contract
     * @param _treasury Treasury address
     * @param _membershipPrice Initial membership price
     */
    constructor(address _owner, address _treasury, uint256 _membershipPrice) 
        ERC721("Stockvel Membership", "STVL") 
        Ownable(_owner) 
    {
        require(_treasury != address(0), "Treasury cannot be zero address");
        treasury = _treasury;
        _stableToken = IERC20(0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8);
        membershipPrice = _membershipPrice;
        cycleStartTime = block.timestamp;
    }
    
    /**
     * @dev Join the stockvel by minting a membership NFT
     */
    function joinStockvel() external {
        require(activeMemberTokens.length < MAX_MEMBERS, "Membership is full");
        // require(msg.value >= membershipPrice, "Insufficient payment");
        require(_stableToken.transferFrom(msg.sender, address(this), membershipPrice),"Transer failed");
        
        // Only allow new members at the beginning of a cycle if not the first members
        if (activeMemberTokens.length > 0) {
            require(
                block.timestamp < (cycleStartTime + 30 days),
                "New members can only join at the beginning of a cycle"
            );
        }
        
        // Mint new NFT
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        
        // Create and store member information
        members[tokenId] = Member({
            isActive: true,
            joinedAt: block.timestamp,
            contributions: 0,
            hasPaidCurrentCycle: false
        });
        
        // Add to active members
        activeMemberTokens.push(tokenId);
        
        emit MemberJoined(msg.sender, tokenId);
    }
    
    /**
     * @dev Check if the caller is approved or the owner of the token
     * @param spender address to check
     * @param tokenId ID of the token
     * @return bool whether the spender is approved for the token
     */
    function _checkOwnership(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner || isApprovedForAll(owner, spender) || getApproved(tokenId) == spender);
    }
    
    /**
     * @dev Make a contribution for the current cycle
     * @param tokenId The NFT token ID of the member
     */
    function makeContribution(uint256 tokenId) external payable {
        require(_checkOwnership(msg.sender, tokenId), "Not owner of NFT");
        require(members[tokenId].isActive, "Not an active member");
        // require(msg.value > 0, "Contribution must be greater than 0");
        require(_stableToken.transferFrom(msg.sender, treasury, contribution), "Insufficient payment");
        require(!members[tokenId].hasPaidCurrentCycle, "Already contributed for this cycle");
        
        // Update contributions
        members[tokenId].contributions = members[tokenId].contributions + msg.value;
        members[tokenId].hasPaidCurrentCycle = true;
        
        emit ContributionMade(msg.sender, msg.value);
        
        // Check if all members have contributed to potentially trigger payout
        checkAllContributed();
    }
    
    /**
     * @dev Check if all active members have made their contributions
     */
    function checkAllContributed() internal {
        bool allContributed = true;
        
        for (uint256 i = 0; i < activeMemberTokens.length; i++) {
            if (!members[activeMemberTokens[i]].hasPaidCurrentCycle) {
                allContributed = false;
                break;
            }
        }
        
        // If all members have contributed, determine who gets the payout
        if (allContributed && activeMemberTokens.length == MAX_MEMBERS) {
            processPayout();
        }
    }
    
    /**
     * @dev Process payout to the eligible member
     */
    function processPayout() internal {
        // Calculate cycle number based on time since contract creation
        uint256 cycleNumber = (block.timestamp - cycleStartTime) / CYCLE_DURATION;
        
        // Use cycle number to determine which member gets the payout (rotating)
        uint256 payoutMemberIndex = cycleNumber % activeMemberTokens.length;
        uint256 payoutTokenId = activeMemberTokens[payoutMemberIndex];
        
        // Calculate total payout amount
        uint256 totalContribution = 0;
        for (uint256 i = 0; i < activeMemberTokens.length; i++) {
            uint256 tokenId = activeMemberTokens[i];
            totalContribution = totalContribution + members[tokenId].contributions;
            
            // Reset for next cycle
            members[tokenId].hasPaidCurrentCycle = false;
        }
        
        address payoutAddress = ownerOf(payoutTokenId);
        
        // Send payout
        payable(payoutAddress).transfer(totalContribution);
        
        emit PayoutReleased(payoutAddress, totalContribution);
        
        // Start new cycle
        cycleStartTime = block.timestamp;
        emit NewCycleStarted(cycleStartTime);
    }
    
    /**
     * @dev Leave the stockvel (only after completing the 6-month cycle)
     * @param tokenId The NFT token ID of the member
     */
    function leaveStockvel(uint256 tokenId) external {
        require(_checkOwnership(msg.sender, tokenId), "Not owner of NFT");
        require(members[tokenId].isActive, "Not an active member");
        
        // Check if member has completed at least one 6-month cycle
        require(
            block.timestamp >= members[tokenId].joinedAt + CYCLE_DURATION,
            "Cannot exit before completing the 6-month cycle"
        );
        
        // Calculate NFT sale value
        uint256 nftValue = membershipPrice;
        
        // 70% to remaining members, 30% to treasury
        uint256 treasuryShare = (nftValue * 30)/(100);
        uint256 membersShare = nftValue - treasuryShare;
        
        // Mark as inactive
        members[tokenId].isActive = false;
        
        // Remove from active members list
        removeActiveMember(tokenId);
        
        // Send treasury share
        payable(treasury).transfer(treasuryShare);
        
        // Distribute remaining amount to active members
        uint256 sharePerMember = membersShare / activeMemberTokens.length;
        for (uint256 i = 0; i < activeMemberTokens.length; i++) {
            payable(ownerOf(activeMemberTokens[i])).transfer(sharePerMember);
        }
        
        // Burn the NFT
        _burn(tokenId);
        
        emit MemberLeft(msg.sender, tokenId);
    }
    
    /**
     * @dev Remove a token ID from active members array
     * @param tokenId The NFT token ID to remove
     */
    function removeActiveMember(uint256 tokenId) internal {
        for (uint256 i = 0; i < activeMemberTokens.length; i++) {
            if (activeMemberTokens[i] == tokenId) {
                // Replace with the last element and pop
                activeMemberTokens[i] = activeMemberTokens[activeMemberTokens.length - 1];
                activeMemberTokens.pop();
                break;
            }
        }
    }
    
    /**
     * @dev Get current cycle information
     * @return startTime Start time of current cycle
     * @return endTime End time of current cycle
     * @return timeRemaining Time remaining in current cycle
     */
    function getCurrentCycleInfo() external view returns (
        uint256 startTime,
        uint256 endTime,
        uint256 timeRemaining
    ) {
        startTime = cycleStartTime;
        endTime = cycleStartTime + CYCLE_DURATION;
        
        if (block.timestamp < endTime) {
            timeRemaining = endTime - block.timestamp;
        } else {
            timeRemaining = 0;
        }
    }
    
    /**
     * @dev Get number of active members
     * @return Number of active members
     */
    function getActiveMemberCount() external view returns (uint256) {
        return activeMemberTokens.length;
    }
    
    /**
     * @dev Update membership price (only owner)
     * @param _newPrice New membership price
     */
    function updateMembershipPrice(uint256 _newPrice) external onlyOwner {
        membershipPrice = _newPrice;
    }
    
    /**
     * @dev Update treasury address (only owner)
     * @param _newTreasury New treasury address
     */
    function updateTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Treasury cannot be zero address");
        treasury = _newTreasury;
    }
}