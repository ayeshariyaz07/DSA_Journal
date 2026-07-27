import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { dummyProblems } from '../data/dummyProblems.js'

const ratingStyle = {
  Optimal: 'bg-green-100 text-green-700',
  Suboptimal: 'bg-amber-100 text-amber-700',
  'Needs improvement': 'bg-red-100 text-red-700',
}

function ProblemDetail() {
  const { id } = useParams()
  const problem = dummyProblems.find((p) => p.id === id)

  const [notes, setNotes] = useState(problem ? problem.myNotes : '')
  const [saved, setSaved] = useState(false)

  if (!problem) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-4">Problem not found.</h1>

          <Link
            to="/"
            className="text-amber-600 hover:text-amber-700 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    // Local-only for now — Day 5 replaces this with a real PUT /problems/:id call
    console.log('Saving notes for', problem.id, ':', notes)
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  const handleDelete = () => {
    // Local-only for now — Day 5 replaces this with a real DELETE /problems/:id call
    console.log('Deleting problem', problem.id)
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <Link
          to="/"
          className="inline-block text-amber-600 hover:text-amber-700 hover:underline mb-6"
        >
          ← Back to Dashboard
        </Link>

        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-8">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
            {problem.source}
          </p>

          <h1 className="text-2xl font-bold text-neutral-900 mb-3">
            {problem.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {problem.pattern && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">
                {problem.pattern}
              </span>
            )}

            {problem.rating && (
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  ratingStyle[problem.rating] ||
                  'bg-neutral-100 text-neutral-700'
                }`}
              >
                {problem.rating}
              </span>
            )}
          </div>

          {problem.problemLink && (
            <a
              href={problem.problemLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-amber-600 underline block mb-6"
            >
              View Original Problem
            </a>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wide text-neutral-500 mb-2">
                Content
              </h2>

              <p className="text-neutral-700 whitespace-pre-wrap mb-6">
                {problem.content}
              </p>

              <h2 className="text-xs font-mono uppercase tracking-wide text-neutral-500 mb-2">
                AI Reasoning
              </h2>

              <p className="text-neutral-700 mb-6">
                {problem.reasoning}
              </p>

              {problem.ratingFeedback && (
                <>
                  <h2 className="text-xs font-mono uppercase tracking-wide text-neutral-500 mb-2">
                    Rating Feedback
                  </h2>

                  <p className="text-neutral-700">
                    {problem.ratingFeedback}
                  </p>
                </>
              )}
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-wide text-neutral-500 mb-2">
                My Notes
              </h2>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={10}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
                >
                  Save Notes
                </button>

                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete Problem
                </button>

                {saved && (
                  <span className="text-sm text-green-600">
                    ✓ Saved
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemDetail