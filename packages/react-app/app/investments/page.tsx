import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button1"
import { Calendar, Clock } from "lucide-react"

export default function PayoutsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Payouts</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Next Payout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span>Month 3 (June 2025)</span>
            </div>
            <div className="text-xl font-bold">R3,000</div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>1 month remaining</span>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Set Payment Method</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold">Payout Schedule</h2>
      <div className="space-y-4">
        {[
          { month: 1, member: "John D.", amount: "R3,000", status: "Completed", date: "April 2025" },
          { month: 2, member: "Sarah M.", amount: "R3,000", status: "Completed", date: "May 2025" },
          { month: 3, member: "You", amount: "R3,000", status: "Upcoming", date: "June 2025" },
          { month: 4, member: "Michael K.", amount: "R3,000", status: "Scheduled", date: "July 2025" },
          { month: 5, member: "Thabo N.", amount: "R3,000", status: "Scheduled", date: "August 2025" },
          { month: 6, member: "Lerato M.", amount: "R3,000", status: "Scheduled", date: "September 2025" },
        ].map((payout) => (
          <Card key={payout.month} className={payout.member === "You" ? "border-purple-600" : ""}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Month {payout.month}</div>
                  <div className="text-sm text-muted-foreground">{payout.date}</div>
                </div>
                <div>
                  <div className="font-medium">{payout.member}</div>
                  <div className="text-sm text-muted-foreground">{payout.amount}</div>
                </div>
                <div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      payout.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : payout.status === "Upcoming"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {payout.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
