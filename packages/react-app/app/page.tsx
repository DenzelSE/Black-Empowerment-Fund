"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";

export default function Home() {
    


    return (
        <div className="min-h-screen flex flex-col">
            <Hero />
        </div>
    );
}
