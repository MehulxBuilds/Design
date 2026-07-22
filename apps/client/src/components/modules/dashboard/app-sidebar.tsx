"use client"

import * as React from "react"

import { NavMain } from "@/components/modules/dashboard/nav-main"
import { NavSecondary } from "@/components/modules/dashboard/nav-secondary"
import { NavUser } from "@/components/modules/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { DashboardSquare01Icon, Menu01Icon, ChartHistogramIcon, Folder01Icon, UserGroupIcon, Camera01Icon, File01Icon, Settings05Icon, HelpCircleIcon, SearchIcon, Database01Icon, Analytics01Icon, CommandIcon, Fire02FreeIcons } from "@hugeicons/core-free-icons"
import { useAuthStore } from "@/store/key-store"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Ranking",
      url: "/ranking",
      icon: (
        <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Analyse",
      url: "/analyse",
      icon: (
        <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2} />
      ),
    },
    {
      title: "History",
      url: "/history",
      icon: (
        <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Profile",
      url: "/profile",
      icon: (
        <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
      ),
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      icon: (
        <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />
      ),
    },
    {
      title: "Search",
      url: "#",
      icon: (
        <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const accessKey = useAuthStore((v) => v.accessKey);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <HugeiconsIcon icon={Fire02FreeIcons} strokeWidth={2} className="size-5!" />
                <span className="text-base font-semibold">Nitro.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {accessKey && <NavUser user={accessKey} />}
      </SidebarFooter>
    </Sidebar>
  )
}
