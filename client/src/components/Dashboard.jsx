import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, User } from 'lucide-react'
import ProblemCard from '../components/ProblemCard'
import { fetchProblems } from '../api'

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'titleAZ', label: 'Title: A–Z' },
]

function Dashboard() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProblems()
      .then((data) => {
        setProblems(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch problems:', err)
        setError('Could not load problems — check your connection and try again.')
        setLoading(false)
      })
  }, [])

  const patterns = [...new Set(problems.map((p) => p.pattern).filter(Boolean))]
  const patternCounts = patterns.reduce((acc, p) => {
    acc[p] = problems.filter((prob) => prob.pattern === p).length
    return acc
  }, {})

  let visibleProblems = [...problems]
  if (activeFilter !== 'All') {
    visibleProblems = visibleProblems.filter((p) => p.pattern === activeFilter)
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase()
    visibleProblems = visibleProblems.filter((p) => p.title.toLowerCase().includes(q))
  }

  visibleProblems.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'titleAZ':
        return a.title.localeCompare(b.title)
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return (
    <div className="min-h-screen w-full bg-[#FAFBFA] text-[#14171C] font-sans selection:bg-emerald-200">
      {/* top bar */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-6 sm:py-8">
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#14171C] hover:border-emerald-400 transition-colors"
            title="Profile"
          >
            <User className="w-4 h-4 text-slate-500" />
          </Link>
          <div className="font-mono text-xs sm:text-sm tracking-widest text-slate-400">
            <span className="text-[#14171C] font-semibold">{problems.length}</span>
            {' '}problems logged
          </div>
        </div>

        <Link
          to="/add"
          className="group flex items-center gap-2 bg-[#14171C] hover:bg-emerald-600 text-white font-medium text-sm px-5 py-3 rounded-lg transition-colors duration-300"
        >
          + Add Problem
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-16">
        <h1 className="text-4xl sm:text-5xl font-bold italic leading-tight mb-8">
          Your problems.
        </h1>

        {loading && (
          <p className="text-slate-400 font-mono text-sm mb-8">Loading problems…</p>
        )}

        {error && !loading && (
          <p className="text-rose-500 font-mono text-sm mb-8">{error}</p>
        )}

        {!loading && !error && (
          <>
            {/* search + sort */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search problems..."
                className="flex-1 bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-lg font-light pb-3 focus:outline-none placeholder:text-slate-300 transition-colors"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-mono text-xs uppercase tracking-wide border-b-2 border-slate-200 focus:border-emerald-500 bg-transparent pb-3 text-slate-600 focus:outline-none transition-colors"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* pattern filter pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveFilter('All')}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  activeFilter === 'All'
                    ? 'bg-[#14171C] text-white border-[#14171C]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
                }`}
              >
                All
                <span className={`text-xs rounded-full px-1.5 ${activeFilter === 'All' ? 'bg-white/20' : 'bg-slate-100'}`}>
                  {problems.length}
                </span>
              </button>
              {patterns.map((pattern) => (
                <button
                  key={pattern}
                  onClick={() => setActiveFilter(pattern)}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    activeFilter === pattern
                      ? 'bg-[#14171C] text-white border-[#14171C]'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  {pattern}
                  <span className={`text-xs rounded-full px-1.5 ${activeFilter === pattern ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {patternCounts[pattern]}
                  </span>
                </button>
              ))}
            </div>

            {/* grid */}
            {visibleProblems.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="mb-4">
                  {problems.length === 0
                    ? 'No problems yet — add your first one.'
                    : 'No problems match your search/filter.'}
                </p>
                <Link to="/add" className="text-emerald-600 font-medium">
                  + Add a new problem
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visibleProblems.map((problem) => (
                  <ProblemCard key={problem._id} problem={problem} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard