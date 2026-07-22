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
import { Menu01Icon, Settings05Icon, HelpCircleIcon, SearchIcon, Fire02FreeIcons } from "@hugeicons/core-free-icons"
import { useAuthStore } from "@/store/key-store"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Publish",
      url: "publish",
      icon: (
        <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
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
