const {expect} = require("chai");
const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("StokvelNFT", function() {
    async function deployNFTFixture() {
        const [owner, addr1, addr2, addr3, addr4, addr5, addr6] = await ethers.getSigners();

        // Deploy Mock Stable coin
        const MockStableCoin = await ethers.getContractFactory("BlackEconomicFundTestToken");
        const mockStableCoin = await MockStableCoin.deploy();

        // Deploy StokvelNFT contract
        const StokvelNFT = await ethers.getContractFactory("StockvelNFT");
        const stokvelNFT = await StokvelNFT.deploy(mockStableCoin.target, mockStableCoin.target);

        // Deploy Treasury contract
        const Treasury = await ethers.getContractFactory("Treasury");
        const stokvelTreasury = await Treasury.deploy(stokvelNFT.target, mockStableCoin.target);

        // call change treasury on nft contract
        const tx = await stokvelNFT.updateTreasury(stokvelTreasury.target);
        await tx.wait();


        // send approval for all addresses for the mock stable coin
        const addresses = [owner, addr1, addr2, addr3, addr4, addr5, addr6];
        for (const address of addresses) {
            const txAllowance = await mockStableCoin.connect(address).approve(stokvelNFT.target, 10000000000000);
            await txAllowance.wait();
        }

        // mint 1000 tokens for each address
        for (const address of addresses) {
            const txMint = await mockStableCoin.connect(address).mint(address);
            await txMint.wait();
        }

        return {stokvelNFT, mockStableCoin, stokvelTreasury, owner, addr1, addr2};
    }

    describe("Deployment", function() {
        
        it("Should set the right owner", async function() {
            const {stokvelNFT, owner} = await loadFixture(deployNFTFixture);
            expect(await stokvelNFT.owner()).to.equal(owner.address);
        });

        it("Should set the right treasury address", async function() {
            const {stokvelNFT, stokvelTreasury} = await loadFixture(deployNFTFixture);
            expect(await stokvelNFT.treasury()).to.equal(stokvelTreasury.target);
        });
    });

    describe("Minting", function() {
        it("Should mint an NFT", async function() {
            const {stokvelNFT, owner} = await loadFixture(deployNFTFixture);
            const tokenId = 1;
            const tx = await stokvelNFT.join();
            await tx.wait();

            expect(await stokvelNFT.ownerOf(tokenId)).to.equal(owner.address);
        });


    //    not allow the same address to mint more than one NFT
        it("Should not allow the same address to mint more than one NFT", async function() {
            const {stokvelNFT, owner} = await loadFixture(deployNFTFixture);
            const tx = await stokvelNFT.join();
            await tx.wait();
            await expect(stokvelNFT.join()).to.be.revertedWith("Already a member");
        });
    });

    describe("Exiting", function() {
        it("Should not allow a member to exit before cycle finished", async function() {
            const {stokvelNFT, owner} = await loadFixture(deployNFTFixture);
            const tokenId = 1;
            const tx = await stokvelNFT.join();
            await tx.wait();
            await expect(stokvelNFT.exit(tokenId)).to.be.revertedWith("Cycle not complete");
        });

        it("Should allow a member to exit after cycle finished", async function() {
            const {stokvelNFT, owner} = await loadFixture(deployNFTFixture);
            const tokenId = 1;
            const tx = await stokvelNFT.join();
            await tx.wait();

            // simulate cycle finished
            await ethers.provider.send("evm_increaseTime", [181 * 24 * 60 * 60]); // 180 days
            await ethers.provider.send("evm_mine");

            const txExit = await stokvelNFT.exit(tokenId);
            await txExit.wait();
            
            // check token has been burnt
            await expect(stokvelNFT.ownerOf(tokenId)).to.be.revertedWithCustomError(stokvelNFT, "ERC721NonexistentToken");
        });
    });
})

