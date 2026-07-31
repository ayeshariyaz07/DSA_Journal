import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { fetchProblemById, updateProblem, deleteProblem } from '../api'

const ratingStyle = {
  Optimal: 'bg-green-100 text-green-700',
  Suboptimal: 'bg-amber-100 text-amber-700',
  'Needs improvement': 'bg-red-100 text-red-700',
}

function ProblemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [problem, setProblem] = useState(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchProblemById(id)
      .then((data) => {
        if (!data) {
          setError('Problem not found.')
        } else {
          setProblem(data)
          setNotes(data.myNotes || '')
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch problem:', err)
        setError('Could not load this problem.')
        setLoading(false)
      })
  }, [id])

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updateProblem(id, { myNotes: notes })
      setProblem(updated)
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save notes:', err)
      setSaving(false)
      setError('Could not save your notes — try again.')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteProblem(id)
      navigate('/')
    } catch (err) {
      console.error('Failed to delete problem:', err)
      setDeleting(false)
      setError('Could not delete this problem — try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-10 px-4 text-center">
        <p className="text-slate-400 font-mono text-sm">Loading problem…</p>
      </div>
    )
  }

  if (error && !problem) {
    return (
      <div className="min-h-screen bg-neutral-50 py-10 px-4 text-center">
        <p className="text-rose-500 mb-4">{error}</p>
        <Link to="/" className="text-emerald-600 font-medium">
          ← Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 font-medium w-fit transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>

        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-8 mt-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-1">
            <h1 className="text-2xl font-bold text-neutral-900 leading-snug">{problem.title}</h1>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
            {problem.source}
          </p>

          {/* Badges */}
          {(problem.pattern || problem.rating) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {problem.pattern && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">
                  {problem.pattern}
                </span>
              )}
              {problem.rating && (
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${ratingStyle[problem.rating] || 'bg-neutral-100 text-neutral-700'}`}
                >
                  {problem.rating}
                </span>
              )}
            </div>
          )}

          {problem.problemLink && (
            <a
              href={problem.problemLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-6"
            >
              View original problem <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <hr className="border-neutral-100 mb-6" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column — problem + AI output */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wide text-neutral-400 mb-2">
                  Content
                </h2>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {problem.content}
                </p>
              </div>

              {problem.reasoning && (
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-4">
                  <h2 className="text-xs font-mono uppercase tracking-wide text-emerald-700 mb-2">
                    AI Reasoning
                  </h2>
                  <p className="text-neutral-700 leading-relaxed text-sm">{problem.reasoning}</p>
                </div>
              )}

              {problem.ratingFeedback && (
                <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-4">
                  <h2 className="text-xs font-mono uppercase tracking-wide text-amber-700 mb-2">
                    Rating Feedback
                  </h2>
                  <p className="text-neutral-700 leading-relaxed text-sm">{problem.ratingFeedback}</p>
                </div>
              )}
            </div>

            {/* Right column — notes */}
            <div className="flex flex-col">
              <h2 className="text-xs font-mono uppercase tracking-wide text-neutral-400 mb-2">
                My Notes
              </h2>
              
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="10"
                placeholder="Add your approach, what confused you, or anything worth remembering..."
                className="w-full flex-1 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-neutral-300"
              />

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[#14171C] hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
                >
                  {saving ? 'Saving…' : 'Save Notes'}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="text-red-500 hover:text-red-600 disabled:opacity-50 text-sm font-medium"
                >
                  {deleting ? 'Deleting…' : 'Delete Problem'}
                </button>
                {saved && <span className="text-sm text-emerald-600 font-medium">✓ Saved</span>}
              </div>

              {error && <p className="text-rose-500 text-sm mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemDetail