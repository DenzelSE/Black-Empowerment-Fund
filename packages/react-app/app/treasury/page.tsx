import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, TrendingUp, PiggyBank } from "lucide-react"

export default function TreasuryPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Treasury</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Treasury Value</CardTitle>
            <PiggyBank className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R3,250</div>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+7.2% from initial deposit</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.6% Monthly</div>
            <div className="text-sm text-muted-foreground">Based on last 2 months</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="allocation" className="w-full">
        <TabsList>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="allocation" className="space-y-6">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Treasury Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                    <span>Savings (50%)</span>
                  </div>
                  <span>R1,500</span>
                </div>
                <Progress value={50} className="h-2 bg-gray-200" indicatorClassName="bg-purple-600" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <span>DeFi Investments (50%)</span>
                  </div>
                  <span>R1,750</span>
                </div>
                <Progress value={50} className="h-2 bg-gray-200" indicatorClassName="bg-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>DeFi Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span>USDC Lending</span>
                <div className="text-right">
                  <div>R875</div>
                  <div className="text-xs text-green-500">+4.2% APY</div>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span>ETH Staking</span>
                <div className="text-right">
                  <div>R525</div>
                  <div className="text-xs text-green-500">+5.8% APY</div>
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Liquidity Provision</span>
                <div className="text-right">
                  <div>R350</div>
                  <div className="text-xs text-green-500">+7.5% APY</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Treasury History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Treasury history will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance metrics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
