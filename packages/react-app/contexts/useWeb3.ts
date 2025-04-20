import { useEffect, useState } from "react";
import StableTokenABI from "./cusd-abi.json";
import StokvelNFT from "./StockvelNFT.json"
import StokvelTreasury from "./Treasury.json"
import { BEFTokenAddress, StockvelNFTAddress, TreasuryAddress } from "../constants";

import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem"; // low level shit
import { celoAlfajores, hardhat } from "viem/chains"; 


import { useAccount, useWriteContract, useReadContract } from "wagmi"; // pretty shit


// only used for read only transactions to the blockchain
const celoPublicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});

const befBFT_celo = getContract({
    abi: StokvelNFT.abi,
    address: StockvelNFTAddress,
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

        try {
            const res = await walletClient.writeContract({
                address: StockvelNFTAddress,
                abi: StokvelNFT.abi,
                functionName: 'join',
                args: [],
                account: address,
            });

            console.log("res", res);
            return res;

        } catch (error) {
            console.log("error", error);
        }
        

        
        

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
