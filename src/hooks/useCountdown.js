import { useMemo } from 'react'

// The target date is fixed. It is not configurable anywhere in the app.
const TARGET_DATE = new Date(2027, 7, 16) // August 16, 2027

const MS_PER_DAY = 1000 * 60 * 60 * 24

/**
 * Calculates the number of whole days remaining until the fixed target
 * date, recomputed from the current moment whenever the app loads.
 */
export function useCountdown() {
  return useMemo(() => {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfTarget = new Date(
      TARGET_DATE.getFullYear(),
      TARGET_DATE.getMonth(),
      TARGET_DATE.getDate()
    )
    const diff = startOfTarget.getTime() - startOfToday.getTime()
    const daysRemaining = Math.max(0, Math.round(diff / MS_PER_DAY))

    return {
      daysRemaining,
      today: now,
      targetDate: TARGET_DATE,
    }
  }, [])
}
