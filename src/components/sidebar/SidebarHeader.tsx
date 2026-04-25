import Icon from "#/icons/icon-512.png"

export function SidebarHeader() {
  return (
    <div className="px-4 py-4 border-b flex items-center gap-3">
      <img
        src={Icon}
        alt="RideShare"
        className="w-8 h-8 rounded-lg object-cover shrink-0"
      />

      <div className="min-w-0">
        <p className="text-sm font-semibold leading-none">
          RideShare
        </p>
        <p className="text-xs text-muted-foreground truncate">
          Réservez ou proposez vos trajets facilement
        </p>
      </div>
    </div>
  )
}