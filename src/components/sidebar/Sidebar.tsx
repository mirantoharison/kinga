
"use client"

import { Sidebar, SidebarFooter } from "@/components/ui/sidebar"
import { SidebarHeader } from "./SidebarHeader"
import { SidebarContentBlock } from "./SidebarContent"

export function SideBar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContentBlock />
    </Sidebar>
  )
}