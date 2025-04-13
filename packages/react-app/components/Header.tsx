import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown, Wallet, ArrowLeft } from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { toast } from "sonner";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useRouter();
  const location = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const checkRegistration = async (address: string) => {
    const registeredAddress = localStorage.getItem("walletAddress");
    if (registeredAddress) {
      toast(`Welcome back ${registeredAddress}`);
      navigate.push("/dashboard");

    } else {
      toast.info("Please register your wallet address");
      navigate.push("/signup");
    }
  }

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setWalletConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {

      if (window.ethereum) {
        toast.info("Connecting to wallet...");

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        setWalletAddress(address);
        setWalletConnected(true);
        localStorage.setItem("walletAddress", address);
        toast.success("Wallet connected successfully");
        checkRegistration(address);
      } else {
        toast.error("Please install a web3 wallet like MetaMask");
      }

    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Error connecting wallet");
    }
    setIsConnecting(false);
  }

  // Auto-connect if MiniPay + Mobile
  useEffect(() => {
    const isMiniPay = window?.ethereum?.isMiniPay;
    const isMobile = window?.innerWidth <= 768;

    if (isMiniPay && isMobile) {
      setHideConnectBtn(true); // Only hide on mobile + MiniPay

      // Use wagmi connector if needed
      setTimeout(() => {
        connect({ connector: injected({ target: 'metaMask' }) });
        connectWallet(); // Manually trigger wallet logic
      }, 0);
    } else {
      setHideConnectBtn(false);
    }
  }, [connect, connectWallet]);

  const handleConnectWallet = async () => {
    connectWallet();
  }

  const isHomePage = location === "/";
  const isProtectedPage = location === "/dashboard"
  const isAuthPage = location === "/signup";



  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo section - always visible */}
          <div className="flex items-center space-x-2">
            <div
              className="h-10 w-10 bg-bef-purple rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => navigate.push('/')}
            >
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span
              className="text-xl font-bold text-bef-black cursor-pointer"
              onClick={() => navigate.push('/')}
            >
              Black Empowerment Fund
            </span>
          </div>

          {/* Dynamic navigation section - desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {isHomePage && (
              <>
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

                {!hideConnectBtn && (
              <ConnectButton
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
                accountStatus="address"
                chainStatus="icon"
                label="Connect Wallet"
              />
            )}
              </>
            )}

            {isProtectedPage && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/dashboard" className={`text-bef-black hover:text-bef-purple transition-colors ${location === '/dashboard' ? 'font-bold text-bef-purple' : ''}`}>
                      Dashboard
                    </Link>
                  </NavigationMenuItem>
                  {/* <NavigationMenuItem className="ml-6">
                    <Link href="/signup" className={`text-bef-black hover:text-bef-purple transition-colors ${location === '/signup' ? 'font-bold text-bef-purple' : ''}`}>
                      Membership
                    </Link>
                  </NavigationMenuItem> */}
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {isAuthPage && (
              <Button
                variant="ghost"
                className="text-bef-black hover:text-bef-purple"
                onClick={() => navigate.push('/')}
                title="Back to Home"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
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
              {isHomePage && (
                <>
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

                  {!hideConnectBtn && (
                <ConnectButton
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                  accountStatus="address"
                  chainStatus="icon"
                  label="Connect Wallet"
                />
              )}

                </>
              )}

              {isProtectedPage && (
                <>
                  <Link
                    href="/dashboard"
                    className={`px-3 py-2 ${location === '/dashboard' ? 'text-bef-purple font-bold' : 'text-bef-black'}`}
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  {!hideConnectBtn && (
                    <ConnectButton
                      showBalance={{
                        smallScreen: false,
                        largeScreen: true,
                      }}
                      accountStatus="address"
                      chainStatus="icon"
                      label="Connect Wallet"
                    />
                  )}
                </>
              )}

              {isAuthPage && (
                <Button
                  variant="ghost"
                  className="text-bef-black hover:text-bef-purple justify-start px-3"
                  onClick={() => {
                    navigate.push('/');
                    toggleMenu();
                  }}
                  title="Back to Home"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>

              )}

              


            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
