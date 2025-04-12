import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronsUp, ChevronsDown } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-16 md:py-20 bg-bef-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4 animate-bounce-subtle">
            <ChevronsUp className="h-6 w-6 text-bef-gold" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the <span className="text-bef-gold">Financial Revolution</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Be part of our 6-month pilot program and experience the power of community finance enhanced with blockchain technology.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8 animate-float-slow">
            <p className="text-lg mb-6">
              Limited spots available for our inaugural group of members. Secure your position today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-bef-purple hover:bg-bef-darkPurple text-white px-8 py-6"
                title="Apply For Membership"
                onClick={() => console.log('Apply for Membership clicked')}>
                  Apply for Membership
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>


              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10 text-white px-8 py-6"
                title="Apply For Membership"
                onClick={() => console.log('Apply for Membership clicked')}>
                  Member Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 animate-bounce-subtle">
            <ChevronsDown className="h-6 w-6 text-bef-gold" />
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            By joining, you&apos;ll be at the forefront of financial innovation that combines tradition with technology for community empowerment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
