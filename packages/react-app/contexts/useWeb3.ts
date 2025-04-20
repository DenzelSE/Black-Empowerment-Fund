import { useEffect, useState } from "react";
import StableTokenABI from "./cusd-abi.json";
import StokvelNFT from "./StockvelNFT.json"
import StokvelTreasury from "./Treasury.json"
import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem"; // low level shit
import { celoAlfajores, hardhat } from "viem/chains"; // pretty shit
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";


const celoPublicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});

const befBFT_celo = getContract({
    abi: StokvelNFT.abi,
    address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
    client: celoPublicClient,
});


export const useWeb3 = () => {
    const { data: hash, writeContract } = useWriteContract()
    const account = useAccount();
    const u_address = account.address;


    // join stokvel function
    const joinStokvel = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        let [address] = await walletClient.getAddresses();

        // check user token allowance. Make sure it's over 1000
        

        const res = await walletClient.writeContract({
            address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            abi: StokvelNFT.abi,
            functionName: 'join',
            args: [],
            account: address,
        });

        return res;
        

    }

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
        account,
        signTransaction,
        joinStokvel,
    };
};
