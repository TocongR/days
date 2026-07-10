import { useMemo, useState } from 'react'
import EntryCard from '../components/EntryCard'
import { useEntries } from '../hooks/useEntries'
import { toDate, formatShortDate, formatFullDate } from '../utils/formatDate'
import { getDayNumber } from '../utils/dayNumber'

// Matches queries like "day 350", "Day350", or a bare "350" so a person
// can jump straight to the entries written on a given day number.
function parseDayQuery(trimmed) {
  const match = trimmed.match(/^day\s*(\d+)$/i) || trimmed.match(/^(\d+)$/)
  return match ? parseInt(match[1], 10) : null
}

export default function Search() {
  const { entries, loading } = useEntries()
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return []

    const dayQuery = parseDayQuery(trimmed)

    return entries.filter((entry) => {
      const content = (entry.content || '').toLowerCase()
      if (content.includes(trimmed)) return true

      const date = toDate(entry.createdAt)
      if (date) {
        if (formatShortDate(date).toLowerCase().includes(trimmed)) return true
        if (formatFullDate(date).toLowerCase().includes(trimmed)) return true
        if (dayQuery !== null && getDayNumber(date) === dayQuery) return true
      }

      return false
    })
  }, [entries, query])

  return (
    <div>
      <h1 className="font-serif text-xl text-white mb-8">Search</h1>

      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your entries..."
        className="w-full bg-transparent border-b border-border pb-3 text-white placeholder-secondary text-sm focus:border-white transition-colors"
      />

      <div className="mt-6">
        {loading ? (
          <p className="text-secondary text-sm py-6">Loading...</p>
        ) : query.trim() === '' ? (
          <p className="text-secondary text-sm py-6">
            Start typing to search what you've written.
          </p>
        ) : results.length === 0 ? (
          <p className="text-secondary text-sm py-6">No entries found.</p>
        ) : (
          <div>
            {results.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}