import { Button } from "@/components/ui/button"

export function LoginSocial() {
  const providers = [
    { src: "https://www.svgrepo.com/show/475656/google-color.svg", label: "Google" },
    { src: "https://cdn.simpleicons.org/apple/000000", label: "Apple" },
    { src: "https://www.svgrepo.com/show/475647/facebook-color.svg", label: "Facebook" },
  ]

  return (
    <div className="grid grid-cols-3 gap-2">
      {providers.map(({ src, label }) => (
        <Button key={label} variant="outline" className="h-9 text-xs flex gap-1.5">
          <img src={src} className="w-3.5 h-3.5" />
          {label}
        </Button>
      ))}
    </div>
  )
}