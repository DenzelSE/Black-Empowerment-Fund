"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button1"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge1"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getProposal, voteOnProposal, executeProposal } from "@/app/proposals/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Vote = {
  voter: string
  vote: "for" | "against"
  time: string
}

type ProposalType = {
  id: string
  title: string
  proposer: string
  createdAt: string
  daysLeft?: number
  type: string
  description: string
  action: string
  amount: string
  status: string
  votesFor: number
  votesAgainst: number
  votes: Vote[]
  executedAt?: string
}

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [proposal, setProposal] = useState<ProposalType | null>(null)
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(false)
  const [executing, setExecuting] = useState(false)
  const [userVote, setUserVote] = useState<"for" | "against" | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    async function loadProposal() {
      try {
        // Skip loading if the ID is "create" to prevent the error
        if (params.id === "create") {
          setLoading(false)
          return
        }

        const data = await getProposal(params.id)
        setProposal(data as ProposalType)
        // Check if current user has voted
        const currentUserVote = data.votes.find((vote) => vote.voter === "You")
        if (currentUserVote) {
          setUserVote(currentUserVote.vote as "for" | "against")
        }
      } catch (error) {
        console.error("Failed to load proposal:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProposal()
  }, [params.id])

  const handleVote = async (vote: "for" | "against") => {
    setVoting(true)
    try {
      await voteOnProposal(params.id, vote)

      // Update local state
      setProposal((prev) => {
        if (!prev) return null

        const newVotes = [...prev.votes]
        const userVoteIndex = newVotes.findIndex((v) => v.voter === "You")

        if (userVoteIndex >= 0) {
          newVotes[userVoteIndex] = { ...newVotes[userVoteIndex], vote, time: "Just now" }
        } else {
          newVotes.push({ voter: "You", vote, time: "Just now" })
        }

        return {
          ...prev,
          votes: newVotes,
          votesFor:
            vote === "for"
              ? userVote === "for"
                ? prev.votesFor
                : prev.votesFor + 1
              : userVote === "for"
                ? prev.votesFor - 1
                : prev.votesFor,
          votesAgainst:
            vote === "against"
              ? userVote === "against"
                ? prev.votesAgainst
                : prev.votesAgainst + 1
              : userVote === "against"
                ? prev.votesAgainst - 1
                : prev.votesAgainst,
        }
      })

      setUserVote(vote)
      setMessage({ type: "success", text: "Your vote has been recorded." })
    } catch (error) {
      console.error("Failed to vote:", error)
      setMessage({ type: "error", text: "Failed to submit your vote. Please try again." })
    } finally {
      setVoting(false)
    }
  }

  const handleExecute = async () => {
    setExecuting(true)
    try {
      await executeProposal(params.id)
      setProposal((prev) => {
        if (!prev) return null
        return {
          ...prev,
          status: "executed",
          executedAt: new Date().toLocaleDateString(),
        }
      })
      setMessage({ type: "success", text: "Proposal has been executed successfully!" })
    } catch (error) {
      console.error("Failed to execute proposal:", error)
      setMessage({ type: "error", text: "Failed to execute the proposal. Please try again." })
    } finally {
      setExecuting(false)
    }
  }

  if (params.id === "create") {
    router.push("/proposals/create-proposal")
    return null
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/proposals">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Loading Proposal...</h1>
        </div>
      </div>
    )
  }

  if (!proposal) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/proposals">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Proposal Not Found</h1>
        </div>
        <p>The proposal you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  const votingProgress = ((proposal.votesFor + proposal.votesAgainst) / 6) * 100
  const isPassed = proposal.status === "passed" || proposal.votesFor > 3
  const isRejected = proposal.status === "rejected" || proposal.votesAgainst > 3
  const isExecuted = proposal.status === "executed"
  const canExecute = isPassed && !isExecuted

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/proposals">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Proposal Details</h1>
      </div>

      {message && (
        <Alert variant={message.type === "success" ? "default" : "destructive"}>
          <AlertTitle>{message.type === "success" ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>{proposal.title}</CardTitle>
                <Badge variant={isExecuted ? "default" : isPassed ? "success" : isRejected ? "destructive" : "outline"}>
                  {isExecuted ? "Executed" : isPassed ? "Passed" : isRejected ? "Rejected" : "Active"}
                </Badge>
              </div>
              <CardDescription>
                Proposed by: {proposal.proposer} • {proposal.createdAt}
              </CardDescription>
            </div>
            {!isPassed && !isRejected && proposal.daysLeft !== undefined && (
              <div className="flex items-center text-amber-500">
                <Clock className="mr-1 h-4 w-4" />
                <span className="text-sm">{proposal.daysLeft} days left</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{proposal.type}</Badge>
            {proposal.amount && <span>Amount: {proposal.amount}</span>}
          </div>

          <div className="bg-muted/50 p-4 rounded-md">
            <p className="whitespace-pre-line">{proposal.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Proposed Action</h3>
            <p className="text-sm">{proposal.action}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Voting</h3>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {proposal.votesFor + proposal.votesAgainst}/6 votes cast
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={votingProgress} className="h-2" />
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

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Votes</h4>
              <div className="space-y-2">
                {proposal.votes.map((vote, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{vote.voter.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className={vote.voter === "You" ? "font-medium" : ""}>{vote.voter}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={vote.vote === "for" ? "success" : "destructive"}>
                        {vote.vote === "for" ? "For" : "Against"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{vote.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isExecuted && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-md">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Proposal Executed</h3>
                  <p className="text-sm">This proposal has been executed on {proposal.executedAt}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            {!isPassed && !isRejected && !userVote && (
              <>
                <Button onClick={() => handleVote("against")} variant="destructive" disabled={voting}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Vote Against
                </Button>
                <Button onClick={() => handleVote("for")} className="bg-green-600 hover:bg-green-700" disabled={voting}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Vote For
                </Button>
              </>
            )}

            {userVote && !isPassed && !isRejected && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">You voted: </span>
                <Badge variant={userVote === "for" ? "success" : "destructive"}>
                  {userVote === "for" ? "For" : "Against"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote(userVote === "for" ? "against" : "for")}
                  disabled={voting}
                >
                  Change Vote
                </Button>
              </div>
            )}

            {canExecute && (
              <Button onClick={handleExecute} className="bg-purple-600 hover:bg-purple-700" disabled={executing}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {executing ? "Executing..." : "Execute Proposal"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
