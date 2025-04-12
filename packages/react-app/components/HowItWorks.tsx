import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Join the Stokvel",
      description: "Complete the application and KYC process to become a member of the Black Empowerment Fund Stokvel.",
    },
    {
      number: 2,
      title: "Make Monthly Contributions",
      description: "Contribute your agreed amount each month to the collective fund using cryptocurrency or fiat.",
    },
    {
      number: 3,
      title: "Participate in Governance",
      description: "Vote on key decisions and help shape the fund's investment strategies and future development.",
    },
    {
      number: 4,
      title: "Receive Your Payout",
      description: "Based on the rotation schedule, receive the collective pool when it's your turn.",
    },
    {
      number: 5,
      title: "Earn DeFi Yields",
      description: "Benefit from additional returns generated through carefully selected DeFi investment strategies.",
    },
    {
      number: 6,
      title: "Build Lasting Wealth",
      description: "Continue the cycle to create ongoing financial empowerment for yourself and the community.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-bef-purple/10 text-bef-purple hover:bg-bef-purple/20 mb-4">6-Month Pilot Program</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">How the Black Empowerment Fund</span> Works
          </h2>
          <p className="text-lg text-gray-700">
            Our 6-month pilot program combines the best of traditional stokvels with innovative blockchain technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative hover:shadow-lg transition-all">
              <div className="absolute -top-4 -left-4 bg-bef-purple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3 pt-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-bef-purple to-bef-lightPurple rounded-2xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to join our 6-month pilot?</h3>
              <p className="text-white/90">
                Limited slots available for our initial blockchain-powered stokvel community.
              </p>
            </div>
            <Button 
              className="bg-white text-bef-purple hover:bg-gray-100 whitespace-nowrap" 
              title="Apply Now" 
              onClick={() => alert('Application process initiated!')}
            >
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;