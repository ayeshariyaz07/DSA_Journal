import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { fetchUser, updateUser } from '../api'

function Profile() {
  const userId = localStorage.getItem('userId')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) {
      setError('No user found — please log in again.')
      setLoading(false)
      return
    }
    fetchUser(userId)
      .then((data) => {
        setName(data.name || '')
        setEmail(data.email || '')
        setBio(data.bio || '')
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Could not load your profile.')
        setLoading(false)
      })
  }, [userId])

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await updateUser(userId, { name, email, bio })
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
      setSaving(false)
      setError('Could not save changes — try again.')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFBFA] text-[#14171C] flex flex-col font-sans selection:bg-emerald-200">
      <div className="px-6 sm:px-12 py-6 sm:py-8">
        <Link
          to="/"
          className="flex items-center gap-1.5 font-mono text-xs sm:text-sm tracking-widest text-slate-400 hover:text-emerald-600 transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> dashboard
        </Link>
      </div>

      <div className="flex-1 flex items-center px-6 sm:px-16">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-mono text-emerald-600 text-sm sm:text-base font-semibold">
              01
            </span>
            <span className="text-slate-400 text-sm sm:text-base">Your account</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold italic leading-tight mb-10">
            Profile.
          </h1>

          {loading ? (
            <p className="text-slate-400 font-mono text-sm">Loading profile…</p>
          ) : error ? (
            <p className="text-rose-500 font-mono text-sm">{error}</p>
          ) : (
            <form onSubmit={handleSave} className="flex flex-col gap-7">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-xl sm:text-2xl font-light pb-3 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-xl sm:text-2xl font-light pb-3 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="A short line about yourself..."
                  className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-lg font-light pb-3 resize-none focus:outline-none placeholder:text-slate-300 transition-colors"
                />
              </div>

              <div className="flex items-center gap-4 mt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="group flex items-center gap-2 bg-[#14171C] hover:bg-emerald-600 disabled:opacity-50 text-white font-medium text-base px-7 py-3.5 rounded-lg transition-colors duration-300"
                >
                  {saving ? (
                    <span className="font-mono text-sm tracking-wide">saving…</span>
                  ) : (
                    <>
                      Save changes
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                {saved && <span className="text-emerald-600 text-sm font-medium">✓ Saved</span>}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile