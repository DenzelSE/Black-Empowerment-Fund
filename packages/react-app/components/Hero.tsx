import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Users, TrendingUp, ChevronsDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/contexts/useWeb3";
import { useEffect } from "react";

const Hero = () => {
  const {u_address} = useWeb3();
  const router = useRouter();


  return (
    <section className="py-8 md:py-24 hero-pattern">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6 inline-block">
              <span className="bg-bef-purple/10 text-bef-purple px-4 py-1.5 rounded-full text-sm font-medium">
                #BuildWealthTogether
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text animate-pulse-slow">Stokvel Innovation</span> Meets{" "}
              <span className="text-bef-gold animate-pulse-slow delay-300">Blockchain Power</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              The Black Empowerment Fund Stokvel combines traditional savings
              principles with DeFi technology to create wealth-building
              opportunities for our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">

                <Button className="bg-bef-purple hover:bg-bef-darkPurple text-lg px-6 py-6 sm:w-full "
                title="Join the Movement"
                onClick={() => {
                  if (u_address) {
                    router.push("/signup");
                  } else {
                    alert("Please connect your wallet to join the movement.");
                  }
                }
                }>
                  Join the Movement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

              <Button
                variant="outline"
                className="border-bef-purple text-bef-purple hover:bg-bef-purple/10 text-lg px-6 py-6 md:w-1/2"
                title="Learn More"
                onClick={() => console.log('Learn More clicked')}
              >
                Learn More
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center delay-300">
                <div className="bg-bef-purple/10 p-2 rounded-full mr-3">
                  <Users className="h-6 w-6 text-bef-purple" />
                </div>
                <p className="font-medium">Community Powered</p>
              </div>
              <div className="flex items-center delay-400">
                <div className="bg-bef-purple/10 p-2 rounded-full mr-3">
                  <Coins className="h-6 w-6 text-bef-purple" />
                </div>
                <p className="font-medium">Monthly Payouts</p>
              </div>
              <div className="flex items-center delay-500">
                <div className="bg-bef-purple/10 p-2 rounded-full mr-3">
                  <TrendingUp className="h-6 w-6 text-bef-purple" />
                </div>
                <p className="font-medium">DeFi Growth</p>
              </div>
            </div>
            
            <div className="mt-16 flex justify-center sm:justify-start">
              <div className="animate-bounce-slow flex flex-col items-center">
                <span className="text-sm text-gray-500 mb-1">Scroll to learn more</span>
                <ChevronsDown className="h-6 w-6 text-bef-purple" />
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-gold rounded-full filter blur-3xl opacity-20 animate-float-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-purple rounded-full filter blur-3xl opacity-20 animate-float-slow delay-700"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-float">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-2xl">6-Month Pilot</h3>
                    <p className="text-gray-500">Innovation Meets Tradition</p>
                  </div>
                  <div className="bg-bef-purple text-white rounded-full h-16 w-16 flex items-center justify-center font-bold text-xl animate-pulse-slow">
                    BEF
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-bef-gray rounded-lg p-4 flex items-center">
                    <div className="bg-white p-2 rounded mr-4">
                      <Users className="h-5 w-5 text-bef-purple" />
                    </div>
                    <div>
                      <p className="font-medium">Community Contribution</p>
                      <p className="text-sm text-gray-500">Monthly investment pool</p>
                    </div>
                  </div>
                  
                  <div className="bg-bef-gray rounded-lg p-4 flex items-center delay-200">
                    <div className="bg-white p-2 rounded mr-4">
                      <Coins className="h-5 w-5 text-bef-gold" />
                    </div>
                    <div>
                      <p className="font-medium">Monthly Payouts</p>
                      <p className="text-sm text-gray-500">Rotating member benefits</p>
                    </div>
                  </div>
                  
                  <div className="bg-bef-gray rounded-lg p-4 flex items-center delay-400">
                    <div className="bg-white p-2 rounded mr-4">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">DeFi Yield Generation</p>
                      <p className="text-sm text-gray-500">Collective wealth building</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/signup">
                  <Button className="w-full mt-6 bg-gradient-gold hover:opacity-90 text-black animate-pulse-slow"
                  title="Join the Pilot Program"
                  onClick={() => console.log('Join the Pilot Program clicked')}>
                    Join the Pilot Program
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;