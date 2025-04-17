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
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});


const BEFNFT = getContract({
    abi: MinipayNFTABI.abi,
    address: '0x4d7a1b8c5f3e2c9a6f8e4b5d3f2e4c5f3e2c9a6f',
    client: publicClient,
});



export const useWeb3 = () => {
    const account = useAccount();
    const u_address = account.address;

    const getWalletClient = () => {
        return createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
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
        u_address,
        signTransaction,
    };
};
