// /utils/ridePricing.ts

export function calculateRidePrice(distance: number, seats: number) {
  const FUEL_PRICE = 4900
  const CONSUMPTION = 8
  const DRIVER_MARGIN = 1.1

  if (distance <= 0) return null

  return Math.round(
    ((distance * CONSUMPTION / 100) * FUEL_PRICE * DRIVER_MARGIN) /
    Math.max(seats, 1)
  )
}