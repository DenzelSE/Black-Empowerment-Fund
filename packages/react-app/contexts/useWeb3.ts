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

const celoStable = getContract({
    abi: StableTokenABI.abi,
    address: BEFTokenAddress,
    client: celoPublicClient,
});


export const useWeb3 = () => {
    const { data: hash, writeContract } = useWriteContract()
    const account = useAccount();
    const u_address = account.address;
    const [stableAllowance, setStableAllowance] = useState(0);


    // join stokvel function
    const joinStokvel = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        const allowance = await getStableAllowance();
        

    }

    const getStableAllowance = async () => {

        const data = await celoPublicClient.readContract({
            address: BEFTokenAddress,
            abi: StableTokenABI.abi,
            functionName: 'allowance',
            args: [u_address, StockvelNFTAddress],
          })
        
          const user_allowance = parseFloat((data as bigint).toString()) / 1e6;

        return user_allowance;
    }

    const increaseStableAllowance = async (amount: number) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const res = await walletClient.writeContract({
            address: BEFTokenAddress,
            abi: StableTokenABI.abi,
            functionName: 'approve',
            args: [StockvelNFTAddress, parseEther(amount.toString())],
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
        getStableAllowance,
    };
};
