import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEntry, updateEntry, deleteEntry } from '../services/entriesService'
import { formatDateTime } from '../utils/formatDate'

const SAVE_DELAY = 600

export default function Editor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const textareaRef = useRef(null)
  const saveTimeout = useRef(null)

  const [content, setContent] = useState('')
  const [updatedAt, setUpdatedAt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    getEntry(id).then((entry) => {
      if (!active) return
      if (!entry) {
        setNotFound(true)
      } else {
        setContent(entry.content || '')
        setUpdatedAt(entry.updatedAt)
      }
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [id])

  useEffect(() => {
    if (!loading && !notFound) {
      textareaRef.current?.focus()
    }
  }, [loading, notFound])

  function handleChange(e) {
    const value = e.target.value
    setContent(value)
    setSaveState('saving')

    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      await updateEntry(id, value)
      setUpdatedAt(new Date())
      setSaveState('saved')
    }, SAVE_DELAY)
  }

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current)
    }
  }, [])

  async function handleDelete() {
    const confirmed = window.confirm('Delete this entry? This cannot be undone.')
    if (!confirmed) return
    await deleteEntry(id)
    navigate('/entries')
  }

  if (loading) {
    return <p className="text-secondary text-sm">Opening...</p>
  }

  if (notFound) {
    return <p className="text-secondary text-sm">This entry no longer exists.</p>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 h-4">
        <p className="text-xs text-secondary">
          {saveState === 'saving'
            ? 'Saving...'
            : updatedAt
            ? `Updated ${formatDateTime(updatedAt)}`
            : ''}
        </p>
        <button
          onClick={handleDelete}
          className="text-xs text-secondary hover:text-white transition-colors"
        >
          Delete
        </button>
      </div>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        placeholder="Write."
        rows={20}
        className="w-full bg-transparent text-white placeholder-secondary resize-none leading-relaxed text-[1.05rem] focus:outline-none"
      />
    </div>
  )
}
