export function TabHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-zinc-400" />
        {title}
      </p>
      <p className="text-[11px] text-zinc-500 leading-relaxed">
        {description}
      </p>
    </div>
  )
}