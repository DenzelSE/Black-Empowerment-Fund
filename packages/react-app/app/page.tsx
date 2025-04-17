"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { useWeb3 } from "@/contexts/useWeb3";
import { Button } from "@/components/ui/button";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {toast} from "sonner";


export default function Home() {

    const { u_address, signTransaction } = useWeb3();
    const { openConnectModal } = useConnectModal();
    

    




    return (
        <div className="min-h-screen flex flex-col w-full">

            
            <Hero />
            {/* <Features /> */}
            {/* <HowItWorks /> */}
            {/* <Benefits /> */}
            {/* <FAQ /> */}
            {/* <CTA /> */}
        </div>
    );
}
