"use client"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-dvh flex items-center justify-center bg-muted/30 px-4 py-10">
      {children}
    </div>
  )
}