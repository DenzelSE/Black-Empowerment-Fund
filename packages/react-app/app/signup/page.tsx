'use client'

import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check, AlertCircle, Wallet, ChevronsUp, Crown, Zap, Clock, Shield, FolderCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useWeb3 } from "@/contexts/useWeb3";
import { useReadContract } from "wagmi";
import StableTokenABI from "@/contexts/cusd-abi.json";
import StokvelNFT from "@/contexts/StockvelNFT.json"
import { BEFTokenAddress, StockvelNFTAddress } from "@/constants";

// import { redirect } from "next/dist/server/api-utils";

const SignupPage = () => {
    const [isMinting, setIsMinting] = useState(false);
    const [step, setStep] = useState<"info" | "minting" | "success">("info");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const router = useRouter();
    const {u_address, account, joinStokvel, getStableAllowance} = useWeb3();
    const [allowance, setAllowance] = useState(0);

    

    const handleMint = async () => {
      if (!agreeToTerms) {
          toast.error("You must agree to the membership rules before minting");
          return;
      }

      if (!u_address) {
          alert("Please connect your wallet first");
          return;
      }
      setStep("minting");
      setIsMinting(true);
      // setIsMember(true);

      try {
          // Simulate minting process with a timeout
          toast.info("Minting your membership NFT...");
          const allowance = await getStableAllowance();
          if( allowance < 1000) {
            toast.error("You need to approve at least R1000 to mint the NFT");
            setStep("info");
            return;
          }
          // const {data, isError, isPending, isSuccess} = useReadContract({
          //   abi: StableTokenABI.abi,
          //   address: BEFTokenAddress,
          //   functionName: 'allowance',
          //   args: [u_address, StockvelNFTAddress],
          //   account: u_address,
          // })

          // console.log("data", data);

          // await new Promise((resolve) => setTimeout(resolve, 3000));
          // handleJoinStokvel();

          // // Mock success
          // // setStep("success");
          // // toast.success("NFT minted successfully! Welcome to the stokvel.");

          // // Store that the user is registered 
          // localStorage.setItem("isRegistered", "true");

          // After a delay, redirect to dashboard
          setTimeout(() => {
            setIsMinting(false);
          }, 200);

      } catch (error) {
          console.error("Error minting NFT:", error);
          toast.error("Failed to mint NFT. Please try again.");
          setStep("info");
      } finally {
          setIsMinting(false);
      }
  };

    // function to mint the nft
    const handleJoinStokvel = async () => {
      
      const minted = await joinStokvel();
      console.log("Minted: ", minted);
      // if (minted) {
      //   setStep("minting");
      //   toast.success("Minting your NFT...");
      //   setTimeout(() => {
      //     setStep("success");
      //     toast.success("NFT minted successfully!");
      //     router.push("/dashboard");
      //   }, 2000);
      // }
      // else {
      //   toast.error("Minting failed. Please try again.");
      // }
    
    }




    return (
        <main className="flex-grow py-12 md:py-20 bg-white relative">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-gold rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-purple rounded-full opacity-10 animate-float-slow"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <div className="inline-block animate-bounce-subtle mb-4">
              <Badge variant="outline" className="text-bef-purple border-bef-purple px-3 py-1.5 text-sm">
                Limited Spots Available
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse-slow">
              Join the <span className="gradient-text">Financial Revolution</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Become part of our exclusive 6-member pilot program combining traditional 
              stokvel principles with blockchain innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="order-2 md:order-1 space-y-8">
              <Tabs defaultValue="structure" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="structure" className="text-sm">Structure</TabsTrigger>
                  <TabsTrigger value="contributions" className="text-sm">Contributions</TabsTrigger>
                  <TabsTrigger value="benefits" className="text-sm">Benefits</TabsTrigger>
                </TabsList>
                
                <TabsContent value="structure" className="space-y-4 animate-slide-up">
                  <div className="bg-bef-gray rounded-lg p-4 animate-float-delay-100">
                    <div className="flex items-center mb-2">
                      <Crown className="h-5 w-5 mr-2 text-bef-gold" />
                      <h3 className="font-bold">Exclusive Membership</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Strictly limited to 6 members for the entire pilot program.
                      No new members will be added after launch.
                    </p>
                  </div>
                  
                  <div className="bg-bef-gray rounded-lg p-4 animate-float-delay-200">
                    <div className="flex items-center mb-2">
                      <Zap className="h-5 w-5 mr-2 text-bef-purple" />
                      <h3 className="font-bold">NFT Membership</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Members mint an NFT to join, which tracks contributions, 
                      grants voting rights, and confirms payout eligibility.
                    </p>
                  </div>
                  
                  <div className="bg-bef-gray rounded-lg p-4 animate-float-delay-300">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 mr-2 text-bef-gold" />
                      <h3 className="font-bold">Exit Policy</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Members may leave only after completing the 6-month cycle. Exiting members
                      sell their NFT to the group (70% to members, 30% to treasury).
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="contributions" className="space-y-4 animate-slide-up">
                  <div className="bg-bef-gray rounded-lg p-4 animate-float-delay-100">
                    <div className="flex items-center mb-2">
                      <Wallet className="h-5 w-5 mr-2 text-bef-purple" />
                      <h3 className="font-bold">Monthly Contribution</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      R1,000/month (automatically converted to USDC)
                      <br />
                      • R500 → Rotating Payout Pool
                      <br />
                      • R500 → Treasury Pool (R250 savings, R250 DeFi)
                    </p>
                  </div>
                  
                  <div className="bg-bef-gray rounded-lg p-4 animate-float-delay-200">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 mr-2 text-bef-gold" />
                      <h3 className="font-bold">Deadline & Penalties</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Due by the 1st of each month.
                      <br />
                      1st default: 10% penalty (R100)
                      <br />
                      2nd default: 40% penalty (R400)
                      <br />
                      3rd default: Membership revoked; collateral forfeited
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="benefits" className="space-y-4 animate-slide-up">
                  <div className="bg-bef-gray rounded-lg p-4 animate-float-delay-100">
                    <div className="flex items-center mb-2">
                      <Wallet className="h-5 w-5 mr-2 text-bef-purple" />
                      <h3 className="font-bold">Rotating Payouts</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Monthly payout of R3,000 (R500 × 6 members) to one member.
                      Rotation order decided by random draw at inception.
                    </p>
                  </div>
                  
                  <div className="bg-bef-gray rounded-lg p-4 animate-float-delay-200">
                    <div className="flex items-center mb-2">
                      <Zap className="h-5 w-5 mr-2 text-bef-gold" />
                      <h3 className="font-bold">Treasury Growth</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      • R1,500/month in secure stablecoin savings
                      <br />
                      • R1,500/month in DeFi strategies
                      <br />
                      Members propose and vote on DeFi investment strategies
                    </p>
                  </div>
                  
                  <div className="bg-bef-gray rounded-lg p-4 animate-float-delay-300">
                    <div className="flex items-center mb-2">
                      <FolderCheck className="h-5 w-5 mr-2 text-bef-purple" />
                      <h3 className="font-bold">DAO Governance</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Members propose DeFi strategies and investment opportunities.
                      Proposals are approved by majority vote (4/6 members) and
                      executed automatically via smart contracts.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="order-1 md:order-2">
              <Card className="shadow-xl border-bef-purple/20 animate-fade-in">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold">Stokvel Membership NFT</CardTitle>
                  <p className="text-gray-500">
                    {step === "info" && "Mint your membership NFT to join the stokvel group"}
                    {step === "minting" && "Minting in progress..."}
                    {step === "success" && "Congratulations! You're now a member"}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {step === "info" && (
                    <>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                          <div>
                            <h3 className="font-semibold text-amber-700">Important Information</h3>
                            <p className="text-amber-700 text-sm mt-1">
                              By minting this NFT, you agree to:
                            </p>
                            <ul className="list-disc text-amber-700 text-sm mt-2 ml-5 space-y-1">
                              <li>Contribute R1,000 monthly for 6 months</li>
                              <li>Abide by the stokvel&apos;s governance rules</li>
                              <li>Participate in DAO voting</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-bef-black">Membership Benefits</h3>
                          <ul className="mt-2 space-y-1">
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-500 mr-2" /> Rotating payouts
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-500 mr-2" /> Treasury growth
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-500 mr-2" /> DeFi investment access
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-500 mr-2" /> DAO governance rights
                            </li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-bef-black">NFT Details</h3>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li className="flex justify-between">
                              <span className="text-gray-500">Blockchain:</span>
                              <span>{account.chain?.toString() || "Unknown"}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-500">Mint Price:</span>
                              <span>Free (Gas only)</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-500">Supply:</span>
                              <span>Limited to 6</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-500">Transferable:</span>
                              <span>No</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox 
                          id="terms" 
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                        />
                        <Label htmlFor="terms" className="text-sm text-gray-500">
                          I agree to the membership rules and understand the 6-month commitment
                        </Label>
                      </div>
                    </>
                  )}
                  
                  {step === "minting" && (
                    <div className="flex flex-col items-center py-8">
                      <div className="h-16 w-16 mb-6 rounded-full border-4 border-t-bef-purple border-bef-purple/30 animate-spin"></div>
                      <p className="text-gray-500">Please wait while your NFT is being minted...</p>
                      <p className="text-sm text-gray-400 mt-4">Do not close this window</p>
                    </div>
                  )}
                  
                  {step === "success" && (
                    <div className="flex flex-col items-center py-8">
                      <div className="h-16 w-16 mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-8 w-8 text-green-500" />
                      </div>
                      <p className="text-gray-800 font-medium">NFT minted successfully!</p>
                      <p className="text-sm text-gray-500 mt-1">Redirecting to dashboard...</p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  {step === "info" && (
                    <Button
                      className="w-full bg-bef-purple hover:bg-bef-darkPurple text-white"
                      onClick={handleMint}
                      disabled={isMinting || !agreeToTerms }
                      title="Mint Membership NFT"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Mint Membership NFT
                    </Button>
                  )}
                  
                  {/* <div className="text-xs text-center text-gray-400">
                    <p>For demo purposes: The NFT minting is simulated</p>
                  </div> */}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

    )
}

export default SignupPage
