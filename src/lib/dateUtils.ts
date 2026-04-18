export function getDefaultDateTime() {
  const now = new Date()

  const date = now.toISOString().split("T")[0]

  const minutes = now.getMinutes()
  const roundedMinutes = minutes < 30 ? 30 : 60

  if (roundedMinutes === 60) now.setHours(now.getHours() + 1)

  now.setMinutes(roundedMinutes % 60)
  now.setSeconds(0)

  const time = now.toTimeString().slice(0, 5)

  return { date, time }
}

export const TODAY = "Aujourd'hui"
export const YESTERDAY = "Hier"

export const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })