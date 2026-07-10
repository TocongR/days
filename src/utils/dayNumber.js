export const TARGET_DATE = new Date(2027, 7, 16) // August 16, 2027
const MS_PER_DAY = 1000 * 60 * 60 * 24

//
export function getDayNumber(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const startOfTarget = new Date(
    TARGET_DATE.getFullYear(), TARGET_DATE.getMonth(), TARGET_DATE.getDate()
  )
  const diff = startOfTarget.getTime() - start.getTime()
  return Math.max(0, Math.round(diff / MS_PER_DAY))
}