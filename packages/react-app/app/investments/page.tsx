'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button1"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"
import {
  Home, LogOut, Wallet, PiggyBank, BarChart3, Calendar,
  TrendingUp, ArrowUpRight, ArrowDownRight, Landmark, Radio, Vote,
  Clock,Users 
} from "lucide-react";
import Link from "next/link"

export default function InvestmentsPage() {
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
              className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={handleLogout}
              title='Logout'
          >
              <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
      </div>
  </div>
</div>


      <Tabs defaultValue="portfolio" className="w-full">
      <h1 className="text-2xl font-bold">Investments</h1>
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Investment Value</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R1,750</div>
          <div className="flex items-center text-green-500 text-sm">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+16.7% from initial investment</span>
          </div>
        </CardContent>
      </Card>

        <TabsContent value="portfolio" className="space-y-6">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current Investments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">USDC Lending</div>
                  <div className="text-xs text-muted-foreground">Aave Protocol</div>
                </div>
                <div className="text-right">
                  <div>R875</div>
                  <div className="text-xs text-green-500">+4.2% APY</div>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">ETH Staking</div>
                  <div className="text-xs text-muted-foreground">Lido Finance</div>
                </div>
                <div className="text-right">
                  <div>R525</div>
                  <div className="text-xs text-green-500">+5.8% APY</div>
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <div className="font-medium">Liquidity Provision</div>
                  <div className="text-xs text-muted-foreground">Uniswap V3</div>
                </div>
                <div className="text-right">
                  <div>R350</div>
                  <div className="text-xs text-green-500">+7.5% APY</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Initial Investment</span>
                  <span>R1,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current Value</span>
                  <span>R1,750</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Profit</span>
                  <span className="text-green-500">+R250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ROI</span>
                  <span className="text-green-500">+16.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Investment Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <div className="font-medium">Stablecoin Yield Farming</div>
                  <div className="text-green-500">+8.5% APY</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Earn yield on stablecoins through automated yield farming strategies.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Learn More
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Propose</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <div className="font-medium">BTC Yield Strategy</div>
                  <div className="text-green-500">+4.2% APY</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Generate yield on Bitcoin through collateralized lending.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Learn More
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Propose</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Investment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "May 1, 2025", action: "Deposit", amount: "R250", asset: "ETH Staking", status: "Completed" },
                  { date: "Apr 15, 2025", action: "Yield", amount: "+R25", asset: "USDC Lending", status: "Completed" },
                  {
                    date: "Apr 1, 2025",
                    action: "Deposit",
                    amount: "R500",
                    asset: "USDC Lending",
                    status: "Completed",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <div className="font-medium">
                        {item.action}: {item.asset}
                      </div>
                      <div className="text-xs text-muted-foreground">{item.date}</div>
                    </div>
                    <div className="text-right">
                      <div className={item.action === "Yield" ? "text-green-500" : ""}>{item.amount}</div>
                      <div className="text-xs text-muted-foreground">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
