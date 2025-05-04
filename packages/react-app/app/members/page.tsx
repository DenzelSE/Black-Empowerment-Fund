import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button1"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, Bell } from "lucide-react"

export default function MembersPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Members</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Your Group</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">BEF Stokvel</div>
          <div className="text-sm text-muted-foreground">6 members • Cycle: 2/6 months</div>
        </CardContent>
      </Card>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              { name: "John Doe", role: "Admin", month: 1, status: "Active", contribution: "R2,000" },
              { name: "Sarah Mokoena", role: "Member", month: 2, status: "Active", contribution: "R2,000" },
              { name: "You", role: "Member", month: 3, status: "Active", contribution: "R2,000" },
              { name: "Michael Khumalo", role: "Member", month: 4, status: "Active", contribution: "R2,000" },
              { name: "Thabo Ndlovu", role: "Member", month: 5, status: "Active", contribution: "R2,000" },
              { name: "Lerato Moloi", role: "Member", month: 6, status: "Active", contribution: "R2,000" },
            ].map((member, index) => (
              <Card key={index} className={member.name === "You" ? "border-purple-600" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">Payout Month: {member.month}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge variant={member.role === "Admin" ? "default" : "outline"}>{member.role}</Badge>
                          <span className="text-sm text-green-500 mt-1">{member.status}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>Total Contributed:</span>
                        <span>{member.contribution}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Group Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    sender: "John Doe",
                    time: "Yesterday",
                    message: "Monthly meeting scheduled for this Saturday at 10 AM.",
                  },
                  {
                    sender: "Sarah Mokoena",
                    time: "3 days ago",
                    message: "I've submitted a new investment proposal. Please check and vote!",
                  },
                  {
                    sender: "System",
                    time: "1 week ago",
                    message: "May contributions have been processed successfully.",
                  },
                ].map((message, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm mt-1">{message.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <Bell className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Payment",
                    time: "2 days ago",
                    message: "Your May contribution of R1,000 has been received.",
                  },
                  { type: "Proposal", time: "3 days ago", message: "New proposal: Increase DeFi Allocation to 60%" },
                  { type: "Treasury", time: "1 week ago", message: "Treasury value increased by 3.2% this month." },
                  { type: "System", time: "2 weeks ago", message: "Your payout is scheduled in 1 month." },
                ].map((notification, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0">
                    <div
                      className={`w-2 h-2 mt-2 rounded-full ${
                        notification.type === "Payment"
                          ? "bg-green-500"
                          : notification.type === "Proposal"
                            ? "bg-purple-500"
                            : notification.type === "Treasury"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{notification.type}</span>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm mt-1">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline">Mark All as Read</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
