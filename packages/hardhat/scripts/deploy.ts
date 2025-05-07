const {ethers} = require("hardhat");

function printMessage(contractName : string, contractAddress: string) {
    console.log(`${contractName} deployed to: ${contractAddress} \n`);
}

async function DeployWithParams(contractName: string, ...params: any) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy(...params);
    printMessage(contractName, contract.target);
    return contract;
}

async function DeployNoParams(contractName: string) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    printMessage(contractName, contract.target);
    return contract;
}

async function main() {
    
    // Deploy all contracts
    const mockStableCoin = await DeployNoParams("BlackEconomicFundTestToken");
    const stokvelNFT = await DeployWithParams("StockvelNFT",mockStableCoin.target, mockStableCoin.target);
    const stokvelTreasury = await DeployWithParams("Treasury", stokvelNFT.target, mockStableCoin.target);
    // call change treasury on nft contract
    const tx = await stokvelNFT.updateTreasury(stokvelTreasury.target);
    await tx.wait();
    console.log("Treasury updated on NFT contract");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
    