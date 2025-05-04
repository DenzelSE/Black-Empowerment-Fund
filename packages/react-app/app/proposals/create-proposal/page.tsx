"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button1"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createProposal } from "@/app/proposals/actions"

export default function CreateProposalPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "allocation",
    action: "",
    amount: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))

    // Clear error when field is edited
    if (errors.type) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.type
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters."
    }

    if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters."
    }

    if (!formData.action) {
      newErrors.action = "Please specify the action to be taken."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await createProposal(formData)
      router.push("/proposals")
      router.refresh()
    } catch (error) {
      console.error("Failed to create proposal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/proposals">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Create Proposal</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Proposal</CardTitle>
          <CardDescription>
            Create a proposal for the group to vote on. Proposals require a majority vote to pass.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="E.g., Increase DeFi Allocation to 60%"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <p className="text-sm font-medium text-destructive">{errors.title}</p>}
              <p className="text-sm text-muted-foreground">A clear, concise title for your proposal.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Proposal Type</Label>
              <Select onValueChange={handleSelectChange} defaultValue={formData.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a proposal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allocation">Treasury Allocation</SelectItem>
                  <SelectItem value="investment">New Investment</SelectItem>
                  <SelectItem value="governance">Governance Change</SelectItem>
                  <SelectItem value="membership">Membership</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm font-medium text-destructive">{errors.type}</p>}
              <p className="text-sm text-muted-foreground">The category this proposal falls under.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide details about your proposal and why it should be approved..."
                className="min-h-32"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p className="text-sm font-medium text-destructive">{errors.description}</p>}
              <p className="text-sm text-muted-foreground">
                Explain your proposal in detail, including the rationale and expected benefits.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="action">Proposed Action</Label>
              <Input
                id="action"
                name="action"
                placeholder="E.g., Change DeFi allocation from 50% to 60%"
                value={formData.action}
                onChange={handleChange}
              />
              {errors.action && <p className="text-sm font-medium text-destructive">{errors.action}</p>}
              <p className="text-sm text-muted-foreground">The specific action to be taken if this proposal passes.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (if applicable)</Label>
              <Input
                id="amount"
                name="amount"
                placeholder="E.g., R500"
                value={formData.amount}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                If your proposal involves a specific amount, enter it here.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                <FileText className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
