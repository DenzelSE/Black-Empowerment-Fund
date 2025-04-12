"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
    


    return (
        <div className="min-h-screen flex flex-col">
            <Hero />
            <Features />
            <HowItWorks />
            <Benefits />
            <FAQ />
            <CTA />

        </div>
    );
}
