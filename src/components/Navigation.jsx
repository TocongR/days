import { NavLink } from 'react-router-dom'
import { FiHome, FiBookOpen, FiClock, FiSearch } from 'react-icons/fi'
import Countdown from './Countdown'

const links = [
  { to: '/', label: 'Home', icon: FiHome, end: true },
  { to: '/entries', label: 'Entries', icon: FiBookOpen },
  { to: '/timeline', label: 'Timeline', icon: FiClock },
  { to: '/search', label: 'Search', icon: FiSearch },
]

/**
 * Persistent top bar. Keeps the countdown quietly visible everywhere
 * alongside the four navigation destinations.
 */
export default function Navigation() {
  return (
    <header className="border-b border-border">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Countdown variant="compact" />
        <nav className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'text-white bg-card'
                    : 'text-secondary hover:text-white'
                }`
              }
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
