import { useEffect, useState } from "react";
import StableTokenABI from "./cusd-abi.json";
import MinipayNFTABI from "./minipay-nft.json";
import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem";
import { celoAlfajores } from "viem/chains";

const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});

const cUSDTokenAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // Testnet
const MINIPAY_NFT_CONTRACT = "0xE8F4699baba6C86DA9729b1B0a1DA1Bd4136eFeF"; // Testnet

const BEFNFT = getContract({
    abi: MinipayNFTABI.abi,
    address: MINIPAY_NFT_CONTRACT,
    client: publicClient,
});



export const useWeb3 = () => {
    const [address, setAddress] = useState<string | null>(null);
    const [isMember, setIsMember] = useState<boolean>(false);
    const [nftOwnership, setNftOwnership] = useState<boolean>(false);

    const getWalletClient = () => {
        return createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
    };

    const getUserAddress = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            let walletClient = getWalletClient();
            let [address] = await walletClient.getAddresses();
            if (!address) {
                console.error("No address found");
                return;
            }
            setAddress(address);

            const isNFTOwner = (await BEFNFT.read.balanceOf([address])) as number;
            setNftOwnership(isNFTOwner > 0);
            setIsMember(isNFTOwner > 0);
        }
    };

    useEffect(() => {
        try {
            getUserAddress();
        } catch (error) {
            console.error("Error getting user address:", error);
        }
    }, []);

    const checkMembership = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            let walletClient = getWalletClient();
            let [address] = await walletClient.getAddresses();

            const isNFTOwner = (await BEFNFT.read.balanceOf([address])) as number;
            setNftOwnership(isNFTOwner > 0);
            setIsMember(isNFTOwner > 0);
        }
    }

    const sendCUSD = async (to: string, amount: string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const amountInWei = parseEther(amount);

        const tx = await walletClient.writeContract({
            address: cUSDTokenAddress,
            abi: StableTokenABI.abi,
            functionName: "transfer",
            account: address,
            args: [to, amountInWei],
        });

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const mintMinipayNFT = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: MINIPAY_NFT_CONTRACT,
            abi: MinipayNFTABI.abi,
            functionName: "safeMint",
            account: address,
            args: [
                address,
                "https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/sections/2023/hero-top/products/minipay/minipay__desktop@2x.a17626ddb042.webp",
            ],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const getNFTs = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        const minipayNFTContract = getContract({
            abi: MinipayNFTABI.abi,
            address: MINIPAY_NFT_CONTRACT,
            client: publicClient,
        });

        const [address] = await walletClient.getAddresses();
        const nfts: any = await minipayNFTContract.read.getNFTsByAddress([
            address,
        ]);

        let tokenURIs: string[] = [];

        for (let i = 0; i < nfts.length; i++) {
            const tokenURI: string = (await minipayNFTContract.read.tokenURI([
                nfts[i],
            ])) as string;
            tokenURIs.push(tokenURI);
        }
        return tokenURIs;
    };

    const signTransaction = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const res = await walletClient.signMessage({
            account: address,
            message: stringToHex("Hello from Celo Composer MiniPay Template!"),
        });

        return res;
    };

    return {
        address,
        isMember,
        nftOwnership,
        setIsMember,
        setNftOwnership,
        getUserAddress,
        sendCUSD,
        mintMinipayNFT,
        getNFTs,
        signTransaction,
    };
};
