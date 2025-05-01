'use client'

import React from 'react'
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Home, LogOut, Wallet, PiggyBank, BarChart3, Users, Calendar,
    TrendingUp, ArrowUpRight, ArrowDownRight, Landmark, Radio, Vote
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from '@/contexts/useWeb3';

const DashboardPage = () => {
    const navigate = useRouter();
    const { toast } = useToast();
    const {u_address} = useWeb3();
    const [memberName, setMemberName] =  useState(u_address)// get address from local storage
    const [payoutMonth, setPayoutMonth] = useState(3); // 1-6
    const [currentMonth, setCurrentMonth] = useState(2); // 1-6
    const [totalContributions, setTotalContributions] = useState(2000);
    const [treasuryValue, setTreasuryValue] = useState(3250);
    const [isLoading, setIsLoading] = useState(true);

    

    useEffect(() => {
        // Simulate loading data, will fetch blockchain data here
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        toast({
            title: "Logged out",
            description: "You have successfully logged out.",
        });
        navigate.push("/");
    };

    // Mock data for investments
    const defiInvestments = [
        { protocol: "Aave", amount: "R750", apy: "4.2%", status: "active" },
        { protocol: "Compound", amount: "R500", apy: "3.8%", status: "active" },
    ];

    // Mock data for upcoming payments
    const upcomingPayments = [
        {
            type: "Contribution",
            amount: "R1,000",
            date: "May 1, 2025",
            status: "pending"
        }
    ];

    // Mock voting proposals
    const activeProposals = [
        {
            id: 1,
            title: "Allocate R250 to Yearn Finance",
            proposer: "Member 4",
            votes: 2,
            totalVotes: 6,
            deadline: "Apr 20, 2025"
        },
        {
            id: 2,
            title: "Increase DeFi allocation to 30%",
            proposer: "Member 1",
            votes: 3,
            totalVotes: 6,
            deadline: "Apr 23, 2025"
        }
    ];


    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <div className="hidden md:flex w-64 flex-col bg-bef-black text-white animate-fade-in">
                <div className="flex items-center justify-center h-16 border-b border-white/10 px-4">
                    <h1 className="text-xl font-bold">
                        <span className="text-bef-gold">BEF</span> Stokvel
                    </h1>
                </div>

                <div className="flex flex-col flex-grow p-4 space-y-4">
                    <div className="flex flex-col space-y-1 animate-fade-in">
                        <Link href="/dashboard" className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white">
                            <Home className="h-5 w-5 mr-3" />
                            Dashboard
                        </Link>
                        <Link href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
                            <Wallet className="h-5 w-5 mr-3" />
                            My Payouts
                        </Link>
                        <Link href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
                            <PiggyBank className="h-5 w-5 mr-3" />
                            Treasury
                        </Link>
                        <Link href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
                            <BarChart3 className="h-5 w-5 mr-3" />
                            Investments
                        </Link>
                        <Link href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
                            <Vote className="h-5 w-5 mr-3" />
                            Proposals
                        </Link>
                        <Link href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
                            <Users className="h-5 w-5 mr-3" />
                            Members
                        </Link>
                    </div>

                    <div className="mt-auto">
                        <Button
                            variant="outline"
                            className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white"
                            onClick={handleLogout}
                            title='Logout'
                        >
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                {/* Mobile header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b">
                    <h1 className="text-lg font-bold">
                        <span className="text-bef-gold">BEF</span> Stokvel
                    </h1>
                    <Button variant="ghost" size="icon" onClick={handleLogout} title='Logout'>
                        <LogOut className="h-5 w-5" />
                    </Button>
                </div>

                <main className="p-4 md:p-6 max-w-7xl mx-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-screen -mt-16">
                            <div className="flex flex-col items-center">
                                <div className="h-12 w-12 rounded-full border-4 border-t-bef-purple border-bef-gold/30 animate-spin"></div>
                                <p className="mt-4 text-bef-purple font-medium">Loading dashboard...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 animate-fade-in">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, {u_address?.slice(0,10)}</h1>
                                    <p className="text-gray-500">
                                        Member since March 2025 • NFT ID: #1234
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center">
                                    <Badge variant="outline" className="text-bef-purple border-bef-purple mr-2 animate-pulse-slow">
                                        Pilot Program
                                    </Badge>
                                    <Badge className="bg-bef-gold text-black animate-float-subtle">
                                        Month {currentMonth}/6
                                    </Badge>
                                </div>
                            </div>

                            {/* Overview cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <Card className="border-bef-purple/10 shadow-md animate-float-subtle">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm text-gray-500 flex items-center">
                                            <PiggyBank className="h-4 w-4 mr-2 text-bef-purple" />
                                            Total Contributions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">R{totalContributions}</div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {currentMonth} months × R1,000
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-bef-purple/10 shadow-md animate-float-subtle">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm text-gray-500 flex items-center">
                                            <Calendar className="h-4 w-4 mr-2 text-bef-purple" />
                                            Your Payout Month
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Month {payoutMonth}</div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {payoutMonth <= currentMonth ? "Received" : `${payoutMonth - currentMonth} months remaining`}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-bef-purple/10 shadow-md animate-float-subtle">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm text-gray-500 flex items-center">
                                            <Landmark className="h-4 w-4 mr-2 text-bef-purple" />
                                            Treasury Value
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">R{treasuryValue}</div>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                                            <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                                            +7.2% from initial deposit
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Main content tabs */}
                            <Tabs defaultValue="overview" className="animate-fade-in">
                                <TabsList className="mb-6 bg-white border border-gray-200">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="investments">Investments</TabsTrigger>
                                    <TabsTrigger value="governance">Governance</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-6">
                                    {/* Treasury allocation */}
                                    <Card className="border-bef-purple/10 shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Treasury Allocation</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 rounded-full bg-bef-purple mr-2"></div>
                                                        <span>Savings (50%)</span>
                                                    </div>
                                                    <span>R1,500</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div className="bg-bef-purple h-2.5 rounded-full" style={{ width: "50%" }}></div>
                                                </div>

                                                <div className="flex justify-between items-center mt-2">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 rounded-full bg-bef-gold mr-2"></div>
                                                        <span>DeFi Investments (50%)</span>
                                                    </div>
                                                    <span>R1,750</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div className="bg-bef-gold h-2.5 rounded-full" style={{ width: "50%" }}></div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Upcoming payments */}
                                    <Card className="border-bef-purple/10 shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Upcoming Payments</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {upcomingPayments.length > 0 ? (
                                                <div className="space-y-4">
                                                    {upcomingPayments.map((payment, index) => (
                                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                            <div>
                                                                <p className="font-medium">{payment.type}</p>
                                                                <p className="text-sm text-gray-500">{payment.date}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-bold">{payment.amount}</p>
                                                                <Badge variant={payment.status === "pending" ? "outline" : "default"} className="mt-1">
                                                                    {payment.status}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">No upcoming payments.</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="investments" className="space-y-6">
                                    <Card className="border-bef-purple/10 shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-lg">DeFi Investments</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {defiInvestments.length > 0 ? (
                                                <div className="space-y-4">
                                                    {defiInvestments.map((investment, index) => (
                                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                            <div className="flex items-center">
                                                                <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center mr-3">
                                                                    <TrendingUp className="h-4 w-4 text-white" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium">{investment.protocol}</p>
                                                                    <p className="text-sm text-gray-500">APY: {investment.apy}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-bold">{investment.amount}</p>
                                                                <Badge className="bg-green-500 mt-1">
                                                                    {investment.status}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">No active investments.</p>
                                            )}

                                            <div className="mt-4">
                                                <Button className="w-full bg-bef-purple hover:bg-bef-darkPurple mt-2"
                                                title='View All Investments'
                                                onClick={() => console.log('View All Investments clicked')}>
                                                    View All Investments
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="governance" className="space-y-6">
                                    <Card className="border-bef-purple/10 shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Active Proposals</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {activeProposals.length > 0 ? (
                                                <div className="space-y-4">
                                                    {activeProposals.map((proposal) => (
                                                        <div key={proposal.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h3 className="font-medium">{proposal.title}</h3>
                                                                    <p className="text-sm text-gray-500">
                                                                        Proposed by: {proposal.proposer} • Ends: {proposal.deadline}
                                                                    </p>
                                                                </div>
                                                                <Badge variant="outline" className="text-bef-purple border-bef-purple">
                                                                    {proposal.votes}/{proposal.totalVotes} Votes
                                                                </Badge>
                                                            </div>

                                                            <div className="mt-3">
                                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                    <div
                                                                        className="bg-bef-purple h-2.5 rounded-full"
                                                                        style={{ width: `${(proposal.votes / proposal.totalVotes) * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-3 flex space-x-2">
                                                                <Button variant="outline" className="border-bef-purple text-bef-purple hover:bg-bef-purple hover:text-white"
                                                                title='Vote' onClick={() => console.log('Vote clicked')}>
                                                                    <Radio className="h-4 w-4 mr-1" /> Vote
                                                                </Button>
                                                                <Button variant="ghost"
                                                                title='View Details'
                                                                onClick={() => console.log('Details clicked')}>View Details</Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">No active proposals.</p>
                                            )}

                                            <div className="mt-4">
                                                <Button className="w-full bg-bef-purple hover:bg-bef-darkPurple mt-2"
                                                title='Create New Proposal'
                                                onClick={() => console.log('Create New Proposal clicked')}>
                                                    Create New Proposal
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}

export default DashboardPage
