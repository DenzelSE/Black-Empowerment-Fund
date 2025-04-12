import { CheckCircle2 } from "lucide-react";

const Benefits = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-bef-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Benefits of Our</span> Blockchain Stokvel
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              The Black Empowerment Fund Stokvel combines traditional community saving principles with the power of decentralized finance to create unique advantages.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-bef-purple mr-3 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Financial Empowerment</h3>
                  <p className="text-gray-600">
                    Receive lump-sum payments when you need them most, while simultaneously building long-term wealth through DeFi yields.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-bef-purple mr-3 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Transparent & Secure</h3>
                  <p className="text-gray-600">
                    All transactions, contributions, and distributions are recorded on the blockchain, ensuring complete transparency and security.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-bef-purple mr-3 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Community Ownership</h3>
                  <p className="text-gray-600">
                    Members have a voice in governance decisions and directly benefit from the growth and success of the fund.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-bef-purple mr-3 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Financial Education</h3>
                  <p className="text-gray-600">
                    Gain valuable knowledge about blockchain, DeFi, and investment strategies through our educational resources.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-bef-purple mr-3 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Economic Resilience</h3>
                  <p className="text-gray-600">
                    Build collective wealth that can withstand economic fluctuations and provide support during challenging times.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-center">Member Testimonials</h3>
            
            <div className="space-y-6">
              <div className="bg-bef-gray rounded-xl p-6 relative">
                <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-bef-purple text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                  "
                </div>
                <p className="text-gray-700 mb-4">
                  The Black Empowerment Fund has transformed how I think about saving and investing. The combination of monthly payouts and DeFi yields has given my family financial flexibility we never had before.
                </p>
                <div className="flex items-center">
                  <div className="bg-bef-purple/20 w-10 h-10 rounded-full flex items-center justify-center text-bef-purple font-bold mr-3">
                    NT
                  </div>
                  <div>
                    <h4 className="font-bold">Nathi T.</h4>
                    <p className="text-sm text-gray-500">Member since 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-bef-gray rounded-xl p-6 relative">
                <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-bef-gold text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                  "
                </div>
                <p className="text-gray-700 mb-4">
                  I joined the stokvel to save, but I've gained so much more. The community governance aspect means we all have a say in how our funds are used, and the blockchain technology gives me peace of mind.
                </p>
                <div className="flex items-center">
                  <div className="bg-bef-gold/20 w-10 h-10 rounded-full flex items-center justify-center text-bef-gold font-bold mr-3">
                    ZM
                  </div>
                  <div>
                    <h4 className="font-bold">Ziyanda M.</h4>
                    <p className="text-sm text-gray-500">Member since 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-bef-gray rounded-xl p-6 relative">
                <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-bef-purple text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                  "
                </div>
                <p className="text-gray-700 mb-4">
                  The educational resources provided have been incredible. I've learned so much about DeFi and blockchain, while simultaneously building wealth. It's a win-win for our community.
                </p>
                <div className="flex items-center">
                  <div className="bg-bef-purple/20 w-10 h-10 rounded-full flex items-center justify-center text-bef-purple font-bold mr-3">
                    KN
                  </div>
                  <div>
                    <h4 className="font-bold">Kwame N.</h4>
                    <p className="text-sm text-gray-500">Member since 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
