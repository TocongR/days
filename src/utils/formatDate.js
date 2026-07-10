/**
 * Converts a Firestore Timestamp, Date, or null into a JS Date.
 * Firestore timestamps arrive as { seconds, nanoseconds } before the
 * server round-trip resolves, so this guards against that transient shape.
 */
export function toDate(value) {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value.toDate === 'function') return value.toDate()
  if (typeof value.seconds === 'number') return new Date(value.seconds * 1000)
  return null
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/**
 * Formats a date as "Jul 10, 2026".
 */
export function formatShortDate(value) {
  const date = toDate(value)
  if (!date) return ''
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

/**
 * Formats a date as "Jul 10, 2026 • 10:42 PM".
 */
export function formatDateTime(value) {
  const date = toDate(value)
  if (!date) return ''
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${formatShortDate(date)} • ${hours}:${minutes} ${period}`
}

/**
 * Formats a date as "Wednesday, July 10, 2026" for the home page hero.
 */
export function formatFullDate(value) {
  const date = toDate(value) || new Date()
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
