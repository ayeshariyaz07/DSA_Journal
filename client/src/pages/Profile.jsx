import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { fetchUser, updateUser } from '../api'

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const userId = storedUser?.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) {
      setError('No user found. Please log in again.')
      setLoading(false)
      return
    }

    const loadUser = async () => {
      try {
        const data = await fetchUser()

        setName(data.name || '')
        setEmail(data.email || '')
        setBio(data.bio || '')
      } catch (err) {
        console.error(err)
        setError('Could not load your profile.')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [userId])

  const handleSave = async (e) => {
    e.preventDefault()

    setSaving(true)
    setSaved(false)
    setError('')

    try {
      await updateUser({
        name,
        email,
        bio,
      });

      const updatedUser = {
        ...storedUser,
        name,
        email,
      }

      localStorage.setItem('user', JSON.stringify(updatedUser))

      setSaved(true)

      setTimeout(() => {
        setSaved(false)
      }, 2000)
    } catch (err) {
      console.error(err)
      setError('Could not save changes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-12 py-6 border-b border-slate-100">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>

        <h2 className="font-bold text-lg">Profile</h2>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">

          <div className="mb-8">
            <p className="font-mono text-sm text-emerald-600">
              Your Account
            </p>

            <h1 className="text-5xl font-bold italic mt-2">
              Profile.
            </h1>
          </div>

          {loading ? (
            <p>Loading profile...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <form onSubmit={handleSave} className="space-y-8">

              <div>
                <label className="block text-sm uppercase tracking-widest text-slate-500 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b-2 border-slate-300 focus:border-emerald-500 outline-none text-2xl py-2"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-slate-500 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b-2 border-slate-300 focus:border-emerald-500 outline-none text-2xl py-2"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-slate-500 mb-2">
                  Bio
                </label>

                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us something about yourself..."
                  className="w-full border-b-2 border-slate-300 focus:border-emerald-500 outline-none text-lg py-2 resize-none"
                />
              </div>

              {saved && (
                <p className="text-green-600 font-medium">
                  ✓ Profile updated successfully
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg transition"
              >
                {saving ? 'Saving...' : 'Save Changes'}

                {!saving && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile