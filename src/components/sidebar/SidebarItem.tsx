import { cn } from "@/lib/utils"

export function SidebarItem({
  label,
  icon: Icon,
  active = false,
  onClick,
}: {
  label: string
  icon: any
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition",
        active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  )
}