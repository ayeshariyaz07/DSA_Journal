import { useState } from 'react'

function AddProblem() {
  const [source, setSource] = useState('leetcode')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [notes, setNotes] = useState('')
  const [analyze, setAnalyze] = useState(false)

  const submitHandle = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !source || !notes.trim()) {
      alert('enter valid values')
      return
    }

    setAnalyze(true)
    setTimeout(() => {
      const newProblem = {
        title,
        source,
        problemLink: link,
        content: description,
        myNotes: notes,
        pattern: 'Two Pointers', // placeholder — Gemini wires this up on Day 5
        reasoning: 'Simulated reasoning — replace once Gemini is wired up.',
        createdAt: new Date().toISOString(),
      }

      console.log('New problem submitted:', newProblem)

      setTitle('')
      setSource('leetcode')
      setLink('')
      setDescription('')
      setNotes('')
      setAnalyze(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4">
      <form
        onSubmit={submitHandle}
        className="max-w-xl mx-auto bg-white border border-neutral-200 rounded-xl shadow-sm p-8 flex flex-col gap-6"
      >
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-1">
            New entry
          </p>
          <h1 className="text-2xl font-bold text-neutral-900">
            Add a Problem
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Paste a problem or solution — we'll tag the pattern for you.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-xs font-mono text-neutral-500 uppercase tracking-wide">
            Title
          </label>
          <input
            id="title"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Two Sum"
            className="border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="source" className="text-xs font-mono text-neutral-500 uppercase tracking-wide">
            Source
          </label>
          <select
            id="source"
            name="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="leetcode">LeetCode</option>
            <option value="codeforces">Codeforces</option>
            <option value="striver">Striver A2Z sheet</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="link" className="text-xs font-mono text-neutral-500 uppercase tracking-wide">
            Problem link <span className="normal-case text-neutral-400">(optional)</span>
          </label>
          <input
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="text"
            placeholder="https://..."
            className="border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-xs font-mono text-neutral-500 uppercase tracking-wide">
            Problem description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            placeholder="Paste the problem statement or your solution..."
            className="border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="notes" className="text-xs font-mono text-neutral-500 uppercase tracking-wide">
            My notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            placeholder="How you approached it, what confused you..."
            className="border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          disabled={analyze}
          className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-medium rounded-lg py-2.5 transition-colors"
        >
          {analyze ? 'Analyzing...' : 'Evaluate Problem'}
        </button>
      </form>
    </div>
  )
}

export default AddProblem