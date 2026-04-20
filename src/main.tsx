"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { createRoot } from 'react-dom/client'
//import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.tsx'

import { SideBar } from "./components/sidebar/Sidebar"
import { Header } from "./components/layout/Header"

//registerSW()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <SideBar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto">
              <App />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  </BrowserRouter>
)