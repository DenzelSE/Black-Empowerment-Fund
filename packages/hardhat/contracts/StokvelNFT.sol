// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


interface ITreasury {
    function initializeMember(uint256 tokenId) external;
    function checkContributionStatus(uint256 tokenId) external view returns (bool);
}

contract StockvelNFT is ERC721, Ownable {
    struct Member {
        uint32 joinedAt;
        uint8 defaultCount;
        bool isActive;
    }

    uint256 public constant MAX_MEMBERS = 6;
    uint256[] public activeMembers;
    mapping(uint256 => Member) public members;
    ITreasury public treasury;
    IERC20 public zarStable; // ZAR stablecoin
    mapping(address => bool) public hasJoined;


    event MemberJoined(uint256 indexed tokenId, address member);
    event MemberExited(uint256 indexed tokenId);

    constructor(address _treasury, address _stableCoin) 
        ERC721("Black Empowerment Fund", "BEF")
        Ownable(msg.sender) 
    {
        treasury = ITreasury(_treasury);
        zarStable = IERC20(_stableCoin);

    }

    // Join the stokvel (mint NFT + first contribution)
    function join() external {
        require(!hasJoined[msg.sender], "Already a member");
        require(activeMembers.length < MAX_MEMBERS, "Max members reached");
        uint256 tokenId = activeMembers.length + 1;
        require(zarStable.transferFrom(msg.sender, address(this), 1000e6), "Transfer failed");
        
        _mint(msg.sender, tokenId);
        members[tokenId] = Member({
            joinedAt: uint32(block.timestamp),
            defaultCount: 0,
            isActive: true
        });
        activeMembers.push(tokenId);
        treasury.initializeMember(tokenId);
        hasJoined[msg.sender] = true;
        emit MemberJoined(tokenId, msg.sender);
    }

    // Exit after 6 months
    function exit(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        require(members[tokenId].isActive, "Inactive");
        require(block.timestamp >= members[tokenId].joinedAt + 180 days, "Cycle not complete");
        
        members[tokenId].isActive = false;
        for (uint256 i = 0; i < activeMembers.length; i++) {
            if (activeMembers[i] == tokenId) {
                activeMembers[i] = activeMembers[activeMembers.length - 1];
                activeMembers.pop();
                break;
            }
        }
        emit MemberExited(tokenId);

        // burn the NFT
        _burn(tokenId);
    }

    // Check if member is current with contributions
    function isMemberCurrent(uint256 tokenId) external view returns (bool) {
        return treasury.checkContributionStatus(tokenId);
    }

    function isMemberActive(uint256 tokenId) external view returns (bool) {
        return members[tokenId].isActive;
    }

    function joinedAt(uint256 tokenId) external view returns (uint32) {
        return members[tokenId].joinedAt;
    }

    function updateTreasury(address _newTreasury) external onlyOwner {
        treasury = ITreasury(_newTreasury);
    }
}