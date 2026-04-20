"use client"

import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider } from "@/components/ui/sidebar"

import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TooltipProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </TooltipProvider>
  </BrowserRouter>
)