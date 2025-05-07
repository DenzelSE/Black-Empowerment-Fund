"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button1"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, CheckCircle, XCircle, ArrowRight} from "lucide-react"
import { getProposals } from "./actions"
import { Badge } from "@/components/ui/badge1"
import { useToast } from "@/hooks/use-toast";
import {
  Home, LogOut, Wallet, PiggyBank, BarChart3, Calendar,
  TrendingUp, ArrowUpRight, ArrowDownRight, Landmark, Radio, Vote,
  Clock,Users 
} from "lucide-react";

export default function ProposalsPage() {
  const router = useRouter()
  const [proposals, setProposals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useRouter();
  const { toast } = useToast();


const handleLogout = () => {
  toast({
      title: "Logged out",
      description: "You have successfully logged out.",
  });
  navigate.push("/");
};

  useEffect(() => {
    async function loadProposals() {
      try {
        const data = await getProposals()
        setProposals(data)
      } catch (error) {
        console.error("Failed to load proposals:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProposals()
  }, [])

  const activeProposals = proposals.filter((p) => p.status === "active")
  const passedProposals = proposals.filter((p) => p.status === "passed" || p.status === "executed")
  const rejectedProposals = proposals.filter((p) => p.status === "rejected")

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 gap-4">
    {/* Sidebar */}
    <div className="hidden md:flex w-64 flex-col bg-bef-black text-white animate-fade-in">
  <div className="flex items-center justify-center h-16 border-b border-white/10 px-4">
      <h1 className="text-xl font-bold">
          <span className="text-bef-gold">BEF</span> Stokvel
      </h1>
  </div>

  <div className=" flex-grow p-4 space-y-4">
      <div className="flex flex-col space-y-1 animate-fade-in">
          <Link href="/dashboard" className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white">
              <Home className="h-5 w-5 mr-3" />
              Dashboard
          </Link>
          <Link href="/payouts" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
              <Wallet className="h-5 w-5 mr-3" />
              My Payouts
          </Link>
          <Link href="/treasury" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
              <PiggyBank className="h-5 w-5 mr-3" />
              Treasury
          </Link>
          <Link href="/investments" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
              <BarChart3 className="h-5 w-5 mr-3" />
              Investments
          </Link>
          <Link href="/proposals" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
              <Vote className="h-5 w-5 mr-3" />
              Proposals
          </Link>
          <Link href="/members" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 text-white">
              <Users className="h-5 w-5 mr-3" />
              Members
          </Link>
      </div>

      <div className="mt-auto">
          <Button
              variant="outline"
              className="w-full border-white/20 text-black hover:bg-white/10 hover:text-white"
              onClick={handleLogout}
              title='Logout'
          >
              <LogOut className="h-4 w-4 mr-2 text-black" /> Logout
          </Button>
      </div>
  </div>
</div>
      

      <Tabs defaultValue="active" className="w-full py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Proposals</h1>
        <Link href="/proposals/create-proposal">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="mr-2 h-4 w-4" />
            Create Proposal
          </Button>
        </Link>
      </div>

        <TabsList>
          <TabsTrigger value="active">Active ({activeProposals.length})</TabsTrigger>
          <TabsTrigger value="passed">Passed ({passedProposals.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedProposals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          
          {loading ? (
            <p>Loading proposals...</p>
          ) : activeProposals.length === 0 ? (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No active proposals at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            activeProposals.map((proposal) => (
              <Card key={proposal.id} className="mt-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{proposal.title}</CardTitle>
                      <CardDescription>
                        Proposed by: {proposal.proposer} • {proposal.createdAt}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Clock className="mr-1 h-4 w-4" />
                      <span className="text-sm">{proposal.daysLeft} days left</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{proposal.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Voting Progress</span>
                      <span>{proposal.votesFor + proposal.votesAgainst}/6 votes cast</span>
                    </div>
                    <Progress value={((proposal.votesFor + proposal.votesAgainst) / 6) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="border rounded-md p-3 text-center">
                      <div className="text-green-600 font-medium">For</div>
                      <div className="text-2xl font-bold">{proposal.votesFor}</div>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <div className="text-red-600 font-medium">Against</div>
                      <div className="text-2xl font-bold">{proposal.votesAgainst}</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Link href={`/proposals/${proposal.id}`}>
                      <Button variant="outline" className="flex items-center">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="passed">
          {loading ? (
            <p>Loading proposals...</p>
          ) : passedProposals.length === 0 ? (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No passed proposals yet.</p>
              </CardContent>
            </Card>
          ) : (
            passedProposals.map((proposal) => (
              <Card key={proposal.id} className="mt-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{proposal.title}</CardTitle>
                        <Badge variant={proposal.status === "executed" ? "default" : "success"}>
                          {proposal.status === "executed" ? "Executed" : "Passed"}
                        </Badge>
                      </div>
                      <CardDescription>
                        Proposed by: {proposal.proposer} • {proposal.createdAt}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      <span className="text-sm">
                        Passed ({proposal.votesFor}/{proposal.votesFor + proposal.votesAgainst})
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{proposal.description}</p>
                  <div className="flex justify-end mt-4">
                    <Link href={`/proposals/${proposal.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {loading ? (
            <p>Loading proposals...</p>
          ) : rejectedProposals.length === 0 ? (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No rejected proposals yet.</p>
              </CardContent>
            </Card>
          ) : (
            rejectedProposals.map((proposal) => (
              <Card key={proposal.id} className="mt-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{proposal.title}</CardTitle>
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                      <CardDescription>
                        Proposed by: {proposal.proposer} • {proposal.createdAt}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-red-500">
                      <XCircle className="mr-1 h-4 w-4" />
                      <span className="text-sm">
                        Rejected ({proposal.votesAgainst}/{proposal.votesFor + proposal.votesAgainst})
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{proposal.description}</p>
                  <div className="flex justify-end mt-4">
                    <Link href={`/proposals/${proposal.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
