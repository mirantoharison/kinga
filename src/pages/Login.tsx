"use client"

import { useState } from "react"
import { useTheme } from "@/provider/ThemeProvider"

import { LoginHeader } from "@/components/auth/login/LoginHeader"
import { LoginBadge } from "@/components/auth/login/LoginBadge"
import { LoginForm } from "@/components/auth/login/LoginForm"
import { LoginFeatures } from "@/components/auth/login/LoginFeatures"
import { LoginInfo } from "@/components/auth/login/LoginInfo"

export default function LoginPage() {
  const { theme, toggle } = useTheme()

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false
  })

  const handleChange = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">

      <LoginHeader theme={theme} toggle={toggle} />

      <LoginBadge />

      <LoginForm form={form} onChange={handleChange} />

      <LoginFeatures />

      <LoginInfo />

    </div>
  )
}