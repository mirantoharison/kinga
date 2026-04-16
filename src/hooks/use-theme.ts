import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark"
    if (saved) {
      setTheme(saved)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  return {
    theme,
    toggle: () => setTheme(t => (t === "light" ? "dark" : "light")),
  }
}