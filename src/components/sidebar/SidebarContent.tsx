import { SidebarContent } from "@/components/ui/sidebar"
import { SidebarMenus } from "./SidebarMenu"
import { SidebarFooter } from "./SidebarFooter"

export function SidebarContentBlock() {
  return (
    <SidebarContent>
      <SidebarMenus />
      <SidebarFooter />
    </SidebarContent>
  )
}