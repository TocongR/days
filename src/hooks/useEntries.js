import { useEffect, useState, useCallback } from 'react'
import { getAllEntries } from '../services/entriesService'

/**
 * Loads all entries, sorted newest-updated first, and exposes a refresh
 * function so pages can re-fetch after creating or editing an entry.
 */
export function useEntries() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllEntries()
      setEntries(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { entries, loading, error, refresh }
}
