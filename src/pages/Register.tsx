"use client"

import { useState } from "react"
import { useTheme } from "@/provider/ThemeProvider"

import { RegisterHeader } from "@/components/auth/register/RegisterHeader"
import { RegisterBadge } from "@/components/auth/register/RegisterBadge"
import { RegisterForm } from "@/components/auth/register/RegisterForm"

export default function RegisterPage() {
  const { theme, toggle } = useTheme()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
  })

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">

      <RegisterHeader theme={theme} toggle={toggle} />

      <RegisterBadge />

      <RegisterForm
        form={form}
        onChange={handleChange}
      />

    </div>
  )
}