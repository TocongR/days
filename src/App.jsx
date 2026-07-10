import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Entries from './pages/Entries'
import Timeline from './pages/Timeline'
import Search from './pages/Search'
import Editor from './pages/Editor'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/search" element={<Search />} />
        <Route path="/entry/:id" element={<Editor />} />
      </Routes>
    </Layout>
  )
}
