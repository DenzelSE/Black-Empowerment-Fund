"use client"

import { Home, Wallet, PiggyBank, TrendingUp, FileText, Users, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "My Payouts",
    icon: Wallet,
    href: "/payouts",
  },
  {
    title: "Treasury",
    icon: PiggyBank,
    href: "/treasury",
  },
  {
    title: "Investments",
    icon: TrendingUp,
    href: "/investments",
  },
  {
    title: "Proposals",
    icon: FileText,
    href: "/proposals",
  },
  {
    title: "Members",
    icon: Users,
    href: "/members",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0" variant="sidebar">
      <SidebarHeader className="bg-black text-white p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold">
            B
          </div>
          <h1 className="text-xl font-bold">Black Empowerment Fund</h1>
        </div>
        <div className="text-yellow-400 font-bold text-lg ml-10">BEF Stokvel</div>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900 text-white">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} className="hover:bg-zinc-800">
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-zinc-900 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-zinc-800">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
