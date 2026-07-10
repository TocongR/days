import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Countdown from '../components/Countdown'
import EntryCard from '../components/EntryCard'
import { useEntries } from '../hooks/useEntries'
import { createEntry } from '../services/entriesService'

export default function Home() {
  const navigate = useNavigate()
  const { entries, loading } = useEntries()
  const [creating, setCreating] = useState(false)

  async function handleNewEntry() {
    if (creating) return
    setCreating(true)
    try {
      const id = await createEntry()
      navigate(`/entry/${id}`)
    } finally {
      setCreating(false)
    }
  }

  const recent = entries.slice(0, 3)

  return (
    <div className="flex flex-col items-center">
      <div className="py-8">
        <Countdown variant="hero" />
      </div>

      <button
        onClick={handleNewEntry}
        disabled={creating}
        className="mt-10 px-5 py-2.5 rounded-md border border-border text-sm text-white hover:bg-card transition-colors disabled:opacity-50"
      >
        {creating ? 'Opening a page...' : 'Continue Writing'}
      </button>

      <div className="w-full mt-16">
        <h2 className="text-xs tracking-widest2 uppercase text-secondary mb-2">
          Recent Entries
        </h2>
        {loading ? (
          <p className="text-secondary text-sm py-6">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="text-secondary text-sm py-6">
            Nothing written yet. Whenever you're ready.
          </p>
        ) : (
          <div>
            {recent.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
