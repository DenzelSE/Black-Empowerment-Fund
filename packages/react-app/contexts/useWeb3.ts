import { useEffect, useState } from "react";
import StableTokenABI from "./cusd-abi.json";
import StokvelNFT from "./StockvelNFT.json"
import Treasury from "./Treasury.json";
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
import { celoAlfajores } from "viem/chains"; 


import { useAccount } from "wagmi"; // pretty shit, pretty useless unless in a component


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
    const account = useAccount();
    const u_address = account.address;

    // const celoWalletClient = createWalletClient({
    //     chain: celoAlfajores,
    //     transport: custom(window.ethereum),
    // });

    // join stokvel function
    const joinStokvel = async () => {

        let celoWalletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        try {
            const { request } = await celoPublicClient.simulateContract({
                address: StockvelNFTAddress,
                abi: StokvelNFT.abi,
                functionName: 'join',
                account: u_address,
              })

              const hash = await celoWalletClient.writeContract(request)
              return hash;

        } catch (e) {
            alert(e);
        }
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

    const mintTokens = async () => {

        let celoWalletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        
        let [address] = await celoWalletClient.getAddresses();

        const res = await celoWalletClient.writeContract({
            address: BEFTokenAddress,
            abi: StableTokenABI.abi,
            functionName: 'mint',
            args: [u_address],
            account: address,
        });

        return res;

    }

    const hasJoined = async () => {
        
        let celoWalletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        
        let [address] = await celoWalletClient.getAddresses();

        const res = await celoPublicClient.readContract({
            address: StockvelNFTAddress,
            abi: StokvelNFT.abi,
            functionName: 'hasJoined',
            args: [u_address],
            account: address,
          });

          return res;
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
            args: [StockvelNFTAddress, amount * 1e6],
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
    
    const contribute = async (tokenId: number) =>{
        
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        try {
            const res = await walletClient.writeContract({
                address: TreasuryAddress,
                abi: Treasury.abi,
                functionName: 'contribute',
                args: [tokenId],
                account: address,
              })

              return res;

        } catch (e) {
            alert(e);
        }
    }

    const getTreasuryBalances = async () =>{
        let celoWalletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        
        let [address] = await celoWalletClient.getAddresses();

        const savings = await celoPublicClient.readContract({
            address: TreasuryAddress,
            abi: Treasury.abi,
            functionName: 'savingsBalance',
            account: u_address,
          });

        
          const defiBalance = await celoPublicClient.readContract({
            address: TreasuryAddress,
            abi: Treasury.abi,
            functionName: 'defiBalance',
            account: u_address,
          });

        

          return {savings, defiBalance};
    }

    const memberData = async () => {
        let celoWalletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        
        let [address] = await celoWalletClient.getAddresses();

        const Mdata = await celoPublicClient.readContract({
            address: TreasuryAddress,
            abi: Treasury.abi,
            functionName: 'memberData',
            account: u_address,
          });

        return Mdata;
    }

    const hasContributed = async () => {
        
        let celoWalletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        
        let [address] = await celoWalletClient.getAddresses();

        const res = await celoPublicClient.readContract({
            address: TreasuryAddress,
            abi: Treasury.abi,
            functionName: 'hasContributed',
            account: address,
          });

          return res;
    }

    return {
        u_address,
        account,
        signTransaction,
        joinStokvel,
        getStableAllowance,
        increaseStableAllowance,
        mintTokens,
        hasJoined,
        contribute,
        getTreasuryBalances,
        memberData

    };
};
function async() {
    throw new Error("Function not implemented.");
}

