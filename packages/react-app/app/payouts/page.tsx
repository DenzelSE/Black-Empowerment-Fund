'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button1";
import { useRouter } from 'next/navigation';
import {
  Home, LogOut, Wallet, PiggyBank, BarChart3, Users, Calendar,
  TrendingUp, ArrowUpRight, ArrowDownRight, Landmark, Radio, Vote,
  Clock
} from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function PayoutsPage() {
    const navigate = useRouter();
    const { toast } = useToast();


  const handleLogout = () => {
    toast({
        title: "Logged out",
        description: "You have successfully logged out.",
    });
    navigate.push("/");
};
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 gap-8">
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
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                        </Button>
                    </div>
                </div>
            </div>


      <div className="space-y-4 py-4 ">
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
      <h2 className="text-xl font-bold ">Payout Schedule</h2>
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
