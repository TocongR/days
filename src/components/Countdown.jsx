import { useCountdown } from '../hooks/useCountdown'
import { formatFullDate } from '../utils/formatDate'

/**
 * The fixed countdown toward August 16, 2027. Renders larger on the
 * home page ("hero") and as a smaller persistent line elsewhere.
 */
export default function Countdown({ variant = 'hero' }) {
  const { daysRemaining, today } = useCountdown()

  if (variant === 'compact') {
    return (
      <div className="flex items-baseline gap-2 text-xs tracking-widest2 uppercase text-secondary">
        <span>Day {daysRemaining}</span>
      </div>
    )
  }

  return (
    <div className="text-center select-none">
      <p className="text-xs tracking-widest2 uppercase text-secondary mb-4">
        Day {daysRemaining}
      </p>
      <p className="text-sm text-secondary">{formatFullDate(today)}</p>
    </div>
  )
}