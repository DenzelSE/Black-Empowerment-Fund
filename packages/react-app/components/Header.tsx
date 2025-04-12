// import { Disclosure } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

// export default function Header() {
//   const [hideConnectBtn, setHideConnectBtn] = useState(false);
//   const { connect } = useConnect();

//   useEffect(() => {
//     if (window.ethereum && window.ethereum.isMiniPay) {
//       setHideConnectBtn(true);
//       connect({ connector: injected({ target: "metaMask" }) });
//     }
//   }, []);

//   return (
//     <Disclosure as="nav" className="bg-colors-primary border-b border-black">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button */}
//                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 <div className="flex flex-shrink-0 items-center">
//                   <Image
//                     className="block h-8 w-auto sm:block lg:block"
//                     src="/logo.svg"
//                     width="24"
//                     height="24"
//                     alt="Celo Logo"
//                   />
//                 </div>
//                 <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                   <a
//                     href="#"
//                     className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-gray-900"
//                   >
//                     Home
//                   </a>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {!hideConnectBtn && (
//                   <ConnectButton
//                     showBalance={{
//                       smallScreen: true,
//                       largeScreen: false,
//                     }}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 pt-2 pb-4">
//               <Disclosure.Button
//                 as="a"
//                 href="#"
//                 className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
//               >
//                 Home
//               </Disclosure.Button>
//               {/* Add here your custom menu elements */}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }

import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();

  useEffect(() => {
    const isMiniPay = window?.ethereum?.isMiniPay;
    const isMobile = window?.innerWidth <= 768; // Adjust this based on your mobile breakpoint

    if (isMiniPay && isMobile) {
      setHideConnectBtn(true); // Only hide on mobile + MiniPay
      setTimeout(() => {
        connect({ connector: injected({ target: 'metaMask' }) });
      }, 0);
    } else {
      setHideConnectBtn(false);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-12 bg-bef-purple rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">BEF</span>
            </div>
            <span className="text-xl font-bold text-bef-black">
              Black Empowerment Fund
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-bef-black hover:text-bef-purple transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-bef-black hover:text-bef-purple transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="text-bef-black hover:text-bef-purple transition-colors">
              Benefits
            </a>
            <a href="#faq" className="text-bef-black hover:text-bef-purple transition-colors">
              FAQ
            </a>
            <Button
              className="bg-bef-purple hover:bg-bef-darkPurple"
              title="Join Now"
              onClick={() => console.log('Join Now clicked')}
            >
              Join Now
            </Button>

            {!hideConnectBtn && (
              <ConnectButton
              showBalance={{
                smallScreen: true,
                largeScreen: false,
              }}
            />
            )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-bef-black hover:text-bef-purple"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-3 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <ConnectButton
                showBalance={{
                  smallScreen: true,
                  largeScreen: false,
                }}
              />
              <a
                href="#features"
                className="text-bef-black hover:text-bef-purple px-3 py-2"
                onClick={toggleMenu}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-bef-black hover:text-bef-purple px-3 py-2"
                onClick={toggleMenu}
              >
                How It Works
              </a>
              <a
                href="#benefits"
                className="text-bef-black hover:text-bef-purple px-3 py-2"
                onClick={toggleMenu}
              >
                Benefits
              </a>
              <a
                href="#faq"
                className="text-bef-black hover:text-bef-purple px-3 py-2"
                onClick={toggleMenu}
              >
                FAQ
              </a>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
