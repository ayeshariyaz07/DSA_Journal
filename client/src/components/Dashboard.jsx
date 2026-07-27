import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProblemCard from '../components/ProblemCard'
import { dummyProblems } from '../data/dummyProblems'

const ratingRank = { Optimal: 1, Suboptimal: 2, 'Needs improvement': 3 }

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'ratingBest', label: 'Rating: Best first' },
  { value: 'ratingWorst', label: 'Rating: Worst first' },
  { value: 'titleAZ', label: 'Title: A–Z' },
]

const ratingStats = [
  { key: 'Optimal', label: 'Optimal', dot: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', bar: 'bg-emerald-500' },
  { key: 'Suboptimal', label: 'Suboptimal', dot: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', bar: 'bg-amber-500' },
  { key: 'Needs improvement', label: 'Needs improvement', dot: 'bg-rose-500', text: 'text-rose-600', bg: 'bg-rose-50 border-rose-100', bar: 'bg-rose-500' },
]

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [search, setSearch] = useState('')

  const patterns = [...new Set(dummyProblems.map((p) => p.pattern).filter(Boolean))]
  const patternCounts = patterns.reduce((acc, p) => {
    acc[p] = dummyProblems.filter((prob) => prob.pattern === p).length
    return acc
  }, {})

  const ratedTotal = dummyProblems.filter((p) => p.rating).length

  let problems = [...dummyProblems]
  if (activeFilter !== 'All') {
    problems = problems.filter((p) => p.pattern === activeFilter)
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase()
    problems = problems.filter((p) => p.title.toLowerCase().includes(q))
  }

  problems.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'ratingBest':
        return (ratingRank[a.rating] || 99) - (ratingRank[b.rating] || 99)
      case 'ratingWorst':
        return (ratingRank[b.rating] || 0) - (ratingRank[a.rating] || 0)
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
        <div className="font-mono text-xs sm:text-sm tracking-widest text-slate-400">
          <span className="text-[#14171C] font-semibold">{dummyProblems.length}</span>
          {' '}problems logged
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

        {/* rating stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {ratingStats.map((stat) => {
            const count = dummyProblems.filter((p) => p.rating === stat.key).length
            const pct = ratedTotal ? Math.round((count / ratedTotal) * 100) : 0
            return (
              <div key={stat.key} className={`border rounded-xl p-4 ${stat.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stat.dot}`} />
                  <span className={`text-2xl font-bold ${stat.text}`}>{count}</span>
                </div>
                <p className="text-sm font-medium text-slate-500 mb-2">{stat.label}</p>
                <div className="h-1 w-full bg-white/70 rounded-full overflow-hidden">
                  <div className={`h-full ${stat.bar}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>

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
              {dummyProblems.length}
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
        {problems.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="mb-4">No problems match your search/filter.</p>
            <Link to="/add" className="text-emerald-600 font-medium">
              + Add a new problem
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard