import { Link } from 'react-router-dom'

const patternColors = {
  'Two Pointers': 'bg-violet-50 text-violet-600',
  'Sliding Window': 'bg-cyan-50 text-cyan-600',
  'DP': 'bg-rose-50 text-rose-600',
  'Greedy': 'bg-rose-50 text-rose-600',
  'Binary Search': 'bg-indigo-50 text-indigo-600',
  'Backtracking': 'bg-orange-50 text-orange-600',
  'Graph Traversal': 'bg-emerald-50 text-emerald-600',
  'Prefix Sum': 'bg-lime-50 text-lime-600',
  'Hash Map': 'bg-amber-50 text-amber-600',
  'Stack': 'bg-slate-100 text-slate-600',
}

const sourceAbbrev = {
  LeetCode: 'LC',
  Codeforces: 'CF',
  'Striver A2Z': 'A2Z',
}

const ratingBorder = {
  Optimal: 'border-l-emerald-500',
  Suboptimal: 'border-l-amber-500',
  'Needs improvement': 'border-l-rose-500',
}

const ratingText = {
  Optimal: 'text-emerald-600',
  Suboptimal: 'text-amber-600',
  'Needs improvement': 'text-rose-600',
}

function ProblemCard({ problem }) {
  const { _id, title, source, pattern, rating } = problem
  const patternStyle = patternColors[pattern] || 'bg-slate-100 text-slate-600'
  const borderStyle = ratingBorder[rating] || 'border-l-slate-200'

  return (
    <Link
      to={`/problem/${_id}`}
      className={`block bg-white border border-slate-200 border-l-4 ${borderStyle} rounded-xl p-5 hover:shadow-sm transition-shadow`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold italic text-lg text-[#14171C] leading-snug">{title}</h3>
        {rating && (
          <span className={`shrink-0 flex items-center gap-1 text-xs font-medium ${ratingText[rating]}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            {rating}
          </span>
        )}
      </div>

      <p className="font-mono text-xs text-slate-400 mb-3 tracking-wide">
        <span className="uppercase">{sourceAbbrev[source] || source}</span>
        {' · '}
        {source}
      </p>

      {pattern && (
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${patternStyle}`}>
          {pattern}
        </span>
      )}
    </Link>
  )
}

export default ProblemCard