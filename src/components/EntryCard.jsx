import { Link } from 'react-router-dom'
import { getPreview } from '../utils/preview'
import { formatDateTime } from '../utils/formatDate'

/**
 * A single row representing an entry, used by Entries, Timeline, and
 * Search. Shows the auto-generated preview in place of a title.
 */
export default function EntryCard({ entry }) {
  return (
    <Link
      to={`/entry/${entry.id}`}
      className="block py-5 border-b border-border last:border-b-0 group"
    >
      <p className="text-white leading-relaxed group-hover:text-white/90">
        {getPreview(entry.content)}
      </p>
      <p className="text-xs text-secondary mt-2">
        Updated {formatDateTime(entry.updatedAt)}
      </p>
    </Link>
  )
}
