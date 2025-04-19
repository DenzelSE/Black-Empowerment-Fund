// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BlackEconomicFundTestToken is ERC20 {
    constructor() ERC20("Black Economic Fund Test Token", "BEFT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    // function to allow minting of tokens
    function mint(address to) external {
        _mint(to, 10000000000000);
    }
}