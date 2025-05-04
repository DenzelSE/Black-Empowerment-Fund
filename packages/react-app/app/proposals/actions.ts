"use server"

import { revalidatePath } from "next/cache"

// Define types for our data structures
type Vote = {
  voter: string
  vote: "for" | "against"
  time: string
}

type Proposal = {
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

type Treasury = {
  totalValue: number
  allocation: {
    savings: number
    defi: number
  }
}

// Mock database for proposals
let proposals: Proposal[] = [
  {
    id: "1",
    title: "Increase DeFi Allocation to 60%",
    proposer: "Thabo N.",
    createdAt: "2 days ago",
    daysLeft: 3,
    type: "allocation",
    description:
      "This proposal suggests increasing our DeFi allocation from 50% to 60% to take advantage of higher yields in the current market conditions.",
    action: "Change DeFi allocation from 50% to 60%",
    amount: "",
    status: "active",
    votesFor: 2,
    votesAgainst: 1,
    votes: [
      { voter: "Thabo N.", vote: "for", time: "2 days ago" },
      { voter: "John D.", vote: "for", time: "1 day ago" },
      { voter: "Sarah M.", vote: "against", time: "12 hours ago" },
    ],
  },
  {
    id: "2",
    title: "Add Bitcoin Exposure (5%)",
    proposer: "Sarah M.",
    createdAt: "5 days ago",
    daysLeft: 2,
    type: "investment",
    description:
      "This proposal suggests allocating 5% of our treasury to Bitcoin as a long-term store of value and hedge against inflation.",
    action: "Allocate 5% of treasury to Bitcoin",
    amount: "R162.50",
    status: "active",
    votesFor: 3,
    votesAgainst: 1,
    votes: [
      { voter: "Sarah M.", vote: "for", time: "5 days ago" },
      { voter: "Michael K.", vote: "for", time: "4 days ago" },
      { voter: "Lerato M.", vote: "for", time: "3 days ago" },
      { voter: "John D.", vote: "against", time: "2 days ago" },
    ],
  },
  {
    id: "3",
    title: "Increase Monthly Contribution to R1,200",
    proposer: "John D.",
    createdAt: "3 weeks ago",
    type: "governance",
    description:
      "This proposal to increase the monthly contribution from R1,000 to R1,200 was approved and will take effect from next month.",
    action: "Increase monthly contribution from R1,000 to R1,200",
    amount: "R200",
    status: "passed",
    votesFor: 5,
    votesAgainst: 1,
    votes: [
      { voter: "John D.", vote: "for", time: "3 weeks ago" },
      { voter: "Sarah M.", vote: "for", time: "3 weeks ago" },
      { voter: "Michael K.", vote: "for", time: "3 weeks ago" },
      { voter: "Thabo N.", vote: "for", time: "3 weeks ago" },
      { voter: "Lerato M.", vote: "for", time: "3 weeks ago" },
      { voter: "You", vote: "against", time: "3 weeks ago" },
    ],
  },
  {
    id: "4",
    title: "Reduce Group Size to 5 Members",
    proposer: "Michael K.",
    createdAt: "1 month ago",
    type: "membership",
    description: "This proposal to reduce the group size from 6 to 5 members was rejected by majority vote.",
    action: "Reduce group size from 6 to 5 members",
    amount: "",
    status: "rejected",
    votesFor: 2,
    votesAgainst: 4,
    votes: [
      { voter: "Michael K.", vote: "for", time: "1 month ago" },
      { voter: "Thabo N.", vote: "for", time: "1 month ago" },
      { voter: "John D.", vote: "against", time: "1 month ago" },
      { voter: "Sarah M.", vote: "against", time: "1 month ago" },
      { voter: "Lerato M.", vote: "against", time: "1 month ago" },
      { voter: "You", vote: "against", time: "1 month ago" },
    ],
  },
  {
    id: "5",
    title: "Increase USDC Lending Allocation",
    proposer: "John D.",
    createdAt: "2 months ago",
    type: "investment",
    description: "This proposal to increase USDC lending allocation was approved and executed.",
    action: "Increase USDC lending allocation by 10%",
    amount: "R175",
    status: "executed",
    executedAt: "04/15/2025",
    votesFor: 5,
    votesAgainst: 1,
    votes: [
      { voter: "John D.", vote: "for", time: "2 months ago" },
      { voter: "Sarah M.", vote: "for", time: "2 months ago" },
      { voter: "Michael K.", vote: "for", time: "2 months ago" },
      { voter: "Thabo N.", vote: "for", time: "2 months ago" },
      { voter: "Lerato M.", vote: "for", time: "2 months ago" },
      { voter: "You", vote: "against", time: "2 months ago" },
    ],
  },
]

// Mock treasury state
const treasury: Treasury = {
  totalValue: 3250,
  allocation: {
    savings: 1500, // 50%
    defi: 1750, // 50%
  },
}

export async function getProposals(): Promise<Proposal[]> {
  // In a real app, this would fetch from a database
  return proposals
}

// Add better error handling in the getProposal function
export async function getProposal(id: string): Promise<Proposal> {
  // In a real app, this would fetch from a database
  const proposal = proposals.find((p) => p.id === id)
  if (!proposal) {
    throw new Error(`Proposal with ID ${id} not found`)
  }
  return proposal
}

type ProposalData = {
  title: string
  description: string
  type: string
  action: string
  amount: string
}

export async function createProposal(data: ProposalData): Promise<Proposal> {
  // In a real app, this would save to a database and interact with a blockchain
  const newProposal: Proposal = {
    id: (proposals.length + 1).toString(),
    title: data.title,
    proposer: "You",
    createdAt: "Just now",
    daysLeft: 7,
    type: data.type,
    description: data.description,
    action: data.action,
    amount: data.amount || "",
    status: "active",
    votesFor: 1, // Creator automatically votes for
    votesAgainst: 0,
    votes: [{ voter: "You", vote: "for", time: "Just now" }],
  }

  proposals = [newProposal, ...proposals]
  revalidatePath("/proposals")
  return newProposal
}

export async function voteOnProposal(id: string, vote: "for" | "against"): Promise<Proposal> {
  // In a real app, this would update a database and interact with a blockchain
  const proposalIndex = proposals.findIndex((p) => p.id === id)
  if (proposalIndex === -1) {
    throw new Error("Proposal not found")
  }

  const proposal = proposals[proposalIndex]
  const userVoteIndex = proposal.votes.findIndex((v) => v.voter === "You")

  // Update the vote count
  if (userVoteIndex >= 0) {
    const previousVote = proposal.votes[userVoteIndex].vote
    proposal.votes[userVoteIndex] = { voter: "You", vote, time: "Just now" }

    if (previousVote === "for" && vote === "against") {
      proposal.votesFor--
      proposal.votesAgainst++
    } else if (previousVote === "against" && vote === "for") {
      proposal.votesFor++
      proposal.votesAgainst--
    }
  } else {
    proposal.votes.push({ voter: "You", vote, time: "Just now" })
    if (vote === "for") {
      proposal.votesFor++
    } else {
      proposal.votesAgainst++
    }
  }

  // Check if proposal has passed or been rejected
  if (proposal.votesFor > 3) {
    proposal.status = "passed"
  } else if (proposal.votesAgainst > 3) {
    proposal.status = "rejected"
  }

  proposals[proposalIndex] = proposal
  revalidatePath("/proposals")
  return proposal
}

export async function executeProposal(id: string): Promise<Proposal> {
  // In a real app, this would update a database and interact with a blockchain
  const proposalIndex = proposals.findIndex((p) => p.id === id)
  if (proposalIndex === -1) {
    throw new Error("Proposal not found")
  }

  const proposal = proposals[proposalIndex]
  if (proposal.status !== "passed" && proposal.votesFor <= 3) {
    throw new Error("Proposal has not passed yet")
  }

  // Execute the proposal based on its type
  if (proposal.type === "allocation") {
    // Example: Change DeFi allocation from 50% to 60%
    if (proposal.action.includes("60%")) {
      const totalValue = treasury.totalValue
      treasury.allocation.defi = Math.round(totalValue * 0.6)
      treasury.allocation.savings = totalValue - treasury.allocation.defi
    }
  } else if (proposal.type === "investment") {
    // Example: Allocate 5% of treasury to Bitcoin
    if (proposal.action.includes("Bitcoin")) {
      // In a real app, this would trigger a blockchain transaction
      console.log("Executing Bitcoin investment")
    }
  }

  proposal.status = "executed"
  proposal.executedAt = new Date().toLocaleDateString()
  proposals[proposalIndex] = proposal

  revalidatePath("/proposals")
  revalidatePath("/treasury")
  revalidatePath("/dashboard")

  return proposal
}

export async function getTreasury(): Promise<Treasury> {
  return treasury
}
