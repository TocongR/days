import Navigation from './Navigation'

/**
 * Wraps every page with the persistent navigation bar and consistent
 * page padding. Deliberately has no footer, sidebar, or extra chrome.
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-bg text-white flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-12">{children}</div>
      </main>
    </div>
  )
}
