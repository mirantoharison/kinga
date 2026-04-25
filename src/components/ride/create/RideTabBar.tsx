// /components/ride/create/TabBar.tsx

export type TabKey = "route" | "details" | "description" | "files"

export type Tab = {
  key: TabKey
  label: string
  icon: any
  count?: number
}

export function TabBar({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: Tab[]
  activeTab: TabKey
  setActiveTab: (tab: TabKey) => void
}) {
  return (
    <div className="flex items-center border-b border-border pt-1 gap-6">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.key

        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              relative flex items-center gap-1.5 py-3 text-xs font-medium
              transition-colors
              ${isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"}
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            {tab.label}

            {"count" in tab && tab.count !== undefined && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted border border-border">
                {tab.count}
              </span>
            )}

            <span
              className={`
                absolute left-0 right-0 -bottom-px h-[2px]
                ${isActive ? "bg-emerald-500" : "bg-transparent"}
              `}
            />
          </button>
        )
      })}
    </div>
  )
}