"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {



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
