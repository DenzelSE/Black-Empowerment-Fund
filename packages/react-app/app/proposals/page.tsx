import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button1"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react"

export default function ProposalsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Proposals</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <FileText className="mr-2 h-4 w-4" />
          Create Proposal
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="passed">Passed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Increase DeFi Allocation to 60%</CardTitle>
                  <CardDescription>Proposed by: Thabo N. • 2 days ago</CardDescription>
                </div>
                <div className="flex items-center text-amber-500">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="text-sm">3 days left</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This proposal suggests increasing our DeFi allocation from 50% to 60% to take advantage of higher yields
                in the current market conditions.
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Voting Progress</span>
                  <span>3/6 votes cast</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border rounded-md p-3 text-center">
                  <div className="text-green-600 font-medium">For</div>
                  <div className="text-2xl font-bold">2</div>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <div className="text-red-600 font-medium">Against</div>
                  <div className="text-2xl font-bold">1</div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">View Details</Button>
                <Button className="bg-green-600 hover:bg-green-700">Vote For</Button>
                <Button variant="destructive">Vote Against</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Add Bitcoin Exposure (5%)</CardTitle>
                  <CardDescription>Proposed by: Sarah M. • 5 days ago</CardDescription>
                </div>
                <div className="flex items-center text-amber-500">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="text-sm">2 days left</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This proposal suggests allocating 5% of our treasury to Bitcoin as a long-term store of value and hedge
                against inflation.
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Voting Progress</span>
                  <span>4/6 votes cast</span>
                </div>
                <Progress value={66.7} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border rounded-md p-3 text-center">
                  <div className="text-green-600 font-medium">For</div>
                  <div className="text-2xl font-bold">3</div>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <div className="text-red-600 font-medium">Against</div>
                  <div className="text-2xl font-bold">1</div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">View Details</Button>
                <Button className="bg-green-600 hover:bg-green-700">Vote For</Button>
                <Button variant="destructive">Vote Against</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passed">
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Increase Monthly Contribution to R1,200</CardTitle>
                  <CardDescription>Proposed by: John D. • 3 weeks ago</CardDescription>
                </div>
                <div className="flex items-center text-green-500">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  <span className="text-sm">Passed (5/6)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This proposal to increase the monthly contribution from R1,000 to R1,200 was approved and will take
                effect from next month.
              </p>
              <div className="flex justify-end mt-4">
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Reduce Group Size to 5 Members</CardTitle>
                  <CardDescription>Proposed by: Michael K. • 1 month ago</CardDescription>
                </div>
                <div className="flex items-center text-red-500">
                  <XCircle className="mr-1 h-4 w-4" />
                  <span className="text-sm">Rejected (2/6)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This proposal to reduce the group size from 6 to 5 members was rejected by majority vote.
              </p>
              <div className="flex justify-end mt-4">
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
