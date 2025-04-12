import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Users, Shield, BarChart, Wallet } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-bef-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Innovative Features</span> for Community Growth
          </h2>
          <p className="text-lg text-gray-700">
            Our platform combines traditional stokvel principles with decentralized finance to create a powerful wealth-building tool.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="border-t-4 border-t-bef-purple transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-bef-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-bef-purple" />
              </div>
              <CardTitle>Monthly Payouts</CardTitle>
              <CardDescription>
                Each month, one member receives the collective contribution, providing immediate financial support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our rotation system ensures fair distribution, and the schedule is transparent and agreed upon in advance by all members.
              </p>
            </CardContent>
          </Card>
          
          {/* Feature 2 */}
          <Card className="border-t-4 border-t-bef-gold transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-bef-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-bef-gold" />
              </div>
              <CardTitle>DeFi Yield Strategies</CardTitle>
              <CardDescription>
                Grow collective wealth through carefully vetted high-yield decentralized finance opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                We leverage secure DeFi protocols to generate additional returns on pooled funds, accelerating wealth building for all members.
              </p>
            </CardContent>
          </Card>
          
          {/* Feature 3 */}
          <Card className="border-t-4 border-t-bef-purple transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-bef-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-bef-purple" />
              </div>
              <CardTitle>Community Governance</CardTitle>
              <CardDescription>
                Members have a voice in decision-making through our decentralized governance model.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Participate in key decisions about investment strategies, fund allocation, and future development of the platform.
              </p>
            </CardContent>
          </Card>
          
          {/* Feature 4 */}
          <Card className="border-t-4 border-t-bef-gold transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-bef-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-bef-gold" />
              </div>
              <CardTitle>Blockchain Security</CardTitle>
              <CardDescription>
                All transactions and agreements are secured by blockchain technology for maximum transparency and security.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Smart contracts automate commitments, ensuring all parties fulfill their obligations without requiring trust in a central authority.
              </p>
            </CardContent>
          </Card>
          
          {/* Feature 5 */}
          <Card className="border-t-4 border-t-bef-purple transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-bef-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-bef-purple" />
              </div>
              <CardTitle>Financial Analytics</CardTitle>
              <CardDescription>
                Track your contributions, expected returns, and overall fund performance with real-time analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our dashboard provides complete visibility into your investment growth and projected future returns.
              </p>
            </CardContent>
          </Card>
          
          {/* Feature 6 */}
          <Card className="border-t-4 border-t-bef-gold transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-bef-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-bef-gold" />
              </div>
              <CardTitle>Flexible Contribution</CardTitle>
              <CardDescription>
                Join with contribution levels that work for your budget while still benefiting from collective growth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our tiered membership system allows for different contribution levels, making the stokvel accessible to more community members.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;