/**
 * Reduces an entry's content to a short preview line, the way the entry
 * list and timeline display it in place of a title.
 */
export function getPreview(content, maxLength = 60) {
  if (!content) return 'Empty entry'
  const trimmed = content.trim().replace(/\s+/g, ' ')
  if (trimmed.length === 0) return 'Empty entry'
  if (trimmed.length <= maxLength) return trimmed
  return trimmed.slice(0, maxLength).trim() + '...'
}
