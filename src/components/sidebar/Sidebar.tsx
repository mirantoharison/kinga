
"use client"

import { Sidebar } from "@/components/ui/sidebar"
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