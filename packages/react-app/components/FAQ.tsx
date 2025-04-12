import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the Black Empowerment Fund Stokvel?",
      answer: "The Black Empowerment Fund Stokvel is a blockchain-powered savings and investment group designed to empower members through financial collaboration and DeFi innovation. It combines traditional stokvel principles of collective saving with modern decentralized finance technology.",
    },
    {
      question: "How long is the pilot program?",
      answer: "The pilot program runs for 6 months, allowing members to experience the benefits of our blockchain stokvel model while we gather feedback and refine the platform for future expansion.",
    },
    {
      question: "How are monthly payouts determined?",
      answer: "Monthly payouts follow a pre-determined rotation schedule agreed upon by all members at the beginning of the program. Each month, one member receives the collective contribution according to this schedule.",
    },
    {
      question: "What DeFi strategies does the fund use?",
      answer: "We use carefully selected and vetted DeFi protocols that focus on stable yields while minimizing risk. Our strategies include staking, liquidity provision, and yield farming across established platforms with proven track records.",
    },
    {
      question: "How secure are the funds?",
      answer: "Security is our top priority. We use multi-signature wallets, smart contracts audited by top security firms, and diversified storage solutions to ensure maximum protection of all member funds.",
    },
    {
      question: "Can I withdraw my funds early?",
      answer: "The stokvel model is based on commitment for the full 6-month period. However, we understand emergencies happen, so we have established an emergency withdrawal process subject to community governance approval.",
    },
    {
      question: "What happens after the 6-month pilot ends?",
      answer: "After the pilot, members can vote on next steps, which may include continuing for another cycle, adjusting the model based on learnings, or expanding membership opportunities.",
    },
    {
      question: "How can I join the Black Empowerment Fund Stokvel?",
      answer: "To join, click on the 'Join Now' button and complete the application process. Space in the pilot program is limited, so early application is recommended.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked</span> Questions
          </h2>
          <p className="text-lg text-gray-700">
            Find answers to common questions about the Black Empowerment Fund Stokvel and how it works.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 py-2 bg-white shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-lg py-4 hover:text-bef-purple hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-2">Still have questions?</p>
          <a 
            href="mailto:contact@blackempowermentfund.com" 
            className="text-bef-purple hover:text-bef-darkPurple font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;