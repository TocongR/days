import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import EntryCard from '../components/EntryCard'
import { useEntries } from '../hooks/useEntries'
import { createEntry } from '../services/entriesService'

export default function Entries() {
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-xl text-white">Entries</h1>
        <button
          onClick={handleNewEntry}
          disabled={creating}
          className="flex items-center gap-2 text-sm text-secondary hover:text-white transition-colors disabled:opacity-50"
        >
          <FiPlus size={14} />
          New Entry
        </button>
      </div>

      {loading ? (
        <p className="text-secondary text-sm py-6">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-secondary text-sm py-6">
          Nothing written yet. Whenever you're ready.
        </p>
      ) : (
        <div>
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
