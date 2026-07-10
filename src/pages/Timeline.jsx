import { useEffect, useMemo, useState } from 'react'
import EntryCard from '../components/EntryCard'
import { getEntriesChronological } from '../services/entriesService'
import { toDate } from '../utils/formatDate'
import { getDayNumber } from '../utils/dayNumber'

export default function Timeline() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getEntriesChronological()
      .then((data) => {
        if (active) setEntries(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  // Groups entries into "Day N" sections based on each entry's createdAt.
  // Entries are already ordered newest-first, so this walks through once
  // and starts a new section whenever the day number changes.
  const sections = useMemo(() => {
    const groups = []
    for (const entry of entries) {
      const date = toDate(entry.createdAt)
      const dayNumber = date ? getDayNumber(date) : null
      const last = groups[groups.length - 1]
      if (last && last.dayNumber === dayNumber) {
        last.entries.push(entry)
      } else {
        groups.push({ dayNumber, entries: [entry] })
      }
    }
    return groups
  }, [entries])

  return (
    <div>
      <h1 className="font-serif text-xl text-white mb-8">Timeline</h1>

      {loading ? (
        <p className="text-secondary text-sm py-6">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-secondary text-sm py-6">
          Your timeline will take shape as you write.
        </p>
      ) : (
        <div>
          {sections.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="text-xs tracking-widest2 uppercase text-secondary mb-2">
                {section.dayNumber !== null ? `Day ${section.dayNumber}` : 'Undated'}
              </h2>
              <div>
                {section.entries.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}