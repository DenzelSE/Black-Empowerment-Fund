"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { useWeb3 } from "@/contexts/useWeb3";

export default function Home() {

    const { address, isMember, nftOwnership } = useWeb3();




    return (
        <div className="min-h-screen flex flex-col w-full">
            <Hero />
            <Features />
            <HowItWorks />
            <Benefits />
            <FAQ />
            <CTA />
        </div>
    );
}
