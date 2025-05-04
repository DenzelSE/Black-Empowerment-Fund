import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button1"
import { TrendingUp, ArrowUpRight } from "lucide-react"

export default function InvestmentsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Investments</h1>

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

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

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
