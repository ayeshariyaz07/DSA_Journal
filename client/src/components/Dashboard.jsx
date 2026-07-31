import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, User, LogOut, UserCircle } from 'lucide-react'
import ProblemCard from '../components/ProblemCard'
import { fetchProblems } from '../api'

const ratingRank = { Optimal: 1, Suboptimal: 2, 'Needs improvement': 3 }

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'titleAZ', label: 'Title: A–Z' },
  { value: 'ratingBest', label: 'Rating: Best first' },
  { value: 'ratingWorst', label: 'Rating: Worst first' },
]

const ratingStats = [
  { key: 'Optimal', label: 'Optimal', dot: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', bar: 'bg-emerald-500' },
  { key: 'Suboptimal', label: 'Suboptimal', dot: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', bar: 'bg-amber-500' },
  { key: 'Needs improvement', label: 'Needs improvement', dot: 'bg-rose-500', text: 'text-rose-600', bg: 'bg-rose-50 border-rose-100', bar: 'bg-rose-500' },
]

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false)
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [activeFilter, setActiveFilter] = useState('All')
  const [ratingFilter, setRatingFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [search, setSearch] = useState('')

  const navigate = useNavigate()
  const menuRef = useRef(null)
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const ratedTotal = problems.filter((p) => p.rating).length

  let visibleProblems = [...problems]
  if (activeFilter !== 'All') {
    visibleProblems = visibleProblems.filter((p) => p.pattern === activeFilter)
  }
  if (ratingFilter !== 'All') {
    visibleProblems = visibleProblems.filter((p) => p.rating === ratingFilter)
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
      case 'ratingBest':
        return (ratingRank[a.rating] || 99) - (ratingRank[b.rating] || 99)
      case 'ratingWorst':
        return (ratingRank[b.rating] || 0) - (ratingRank[a.rating] || 0)
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return (
    <div className="min-h-screen w-full bg-[#FAFBFA] text-[#14171C] font-sans selection:bg-emerald-200">
      {/* top bar */}
      <div className="w-full border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#14171C] text-white flex items-center justify-center font-bold italic">
              DS
            </div>
            <div>
              <h2 className="font-bold italic text-lg leading-tight">DSA Journal</h2>
              <p className="text-xs text-slate-400 font-mono">
                {problems.length} problem{problems.length !== 1 ? 's' : ''} logged
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/add"
              className="group flex items-center gap-2 bg-[#14171C] hover:bg-emerald-600 text-white font-medium text-sm px-5 py-3 rounded-lg transition-colors duration-300"
            >
              + Add Problem
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu((s) => !s)}
                className="w-11 h-11 rounded-full border-2 border-[#14171C] hover:border-emerald-500 flex items-center justify-center transition-colors"
              >
                <User className="w-5 h-5 text-slate-500" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-5 py-4 border-b border-slate-100">
                    <p className="font-semibold text-slate-800 truncate">
                      {storedUser?.name || 'Account'}
                    </p>
                    <p className="text-sm text-slate-400 truncate">
                      {storedUser?.email || ''}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-2 px-5 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <UserCircle className="w-4 h-4" />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-left px-5 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-16 pt-10">
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
            {/* rating stat cards */}
            {ratedTotal > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {ratingStats.map((stat) => {
                  const count = problems.filter((p) => p.rating === stat.key).length
                  const pct = ratedTotal ? Math.round((count / ratedTotal) * 100) : 0
                  return (
                    <button
                      key={stat.key}
                      onClick={() => setRatingFilter(ratingFilter === stat.key ? 'All' : stat.key)}
                      className={`text-left border rounded-xl p-4 transition-shadow hover:shadow-sm ${stat.bg} ${
                        ratingFilter === stat.key ? 'ring-2 ring-offset-1 ring-[#14171C]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${stat.dot}`} />
                        <span className={`text-2xl font-bold ${stat.text}`}>{count}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-500 mb-2">{stat.label}</p>
                      <div className="h-1 w-full bg-white/70 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

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
            <div className="flex flex-wrap gap-2 mb-3">
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

            {/* rating filter, only shown once ratings exist */}
            {ratedTotal > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-10">
                <span className="text-xs font-mono uppercase tracking-wide text-slate-400 mr-1">
                  Rating:
                </span>
                {['All', 'Optimal', 'Suboptimal', 'Needs improvement'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatingFilter(r)}
                    className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                      ratingFilter === r
                        ? 'bg-[#14171C] text-white border-[#14171C]'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

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