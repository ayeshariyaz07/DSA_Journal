import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Enter both email and password.')
      return
    }

    setLoggingIn(true)

    // Fake auth delay — replace with a real login API call later
    setTimeout(() => {
      console.log('Fake login attempt:', { email, password })
      setLoggingIn(false)
      navigate('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFBFA] text-[#14171C] flex flex-col font-sans selection:bg-emerald-200">
      {/* top bar */}
      <div className="px-6 sm:px-12 py-6 sm:py-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#14171C] text-white font-bold flex items-center justify-center text-sm">
            P
          </div>
          <span className="font-mono text-xs sm:text-sm tracking-widest text-slate-400">
            problem-tracker
          </span>
        </div>
      </div>

      {/* main stage */}
      <div className="flex-1 flex items-center px-6 sm:px-16">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-mono text-emerald-600 text-sm sm:text-base font-semibold">
              01
            </span>
            <span className="text-slate-400 text-sm sm:text-base">Welcome back</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold italic leading-tight mb-10">
            Log in.
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-mono text-xs uppercase tracking-widest text-slate-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-xl sm:text-2xl font-light pb-3 focus:outline-none placeholder:text-slate-300 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="font-mono text-xs uppercase tracking-widest text-slate-400"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-xl sm:text-2xl font-light pb-3 focus:outline-none placeholder:text-slate-300 transition-colors"
              />
            </div>

            {error && (
              <p className="text-rose-500 text-sm font-medium -mt-4">{error}</p>
            )}

            <div className="flex items-center gap-4 mt-2">
              <button
                type="submit"
                disabled={loggingIn}
                className="group flex items-center gap-2 bg-[#14171C] hover:bg-emerald-600 disabled:opacity-50 text-white font-medium text-base px-7 py-3.5 rounded-lg transition-colors duration-300"
              >
                {loggingIn ? (
                  <span className="font-mono text-sm tracking-wide">logging in…</span>
                ) : (
                  <>
                    Log in
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-slate-400 text-sm mt-10">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* bottom status rail */}
      <div className="px-6 sm:px-12 py-6 flex items-center justify-between border-t border-slate-100">
        <span className="font-mono text-xs tracking-widest text-slate-400">
          STATUS: {loggingIn ? 'AUTHENTICATING…' : 'IDLE'}
        </span>
        <span className="font-mono text-xs text-slate-300 hidden sm:inline">login.tsx</span>
      </div>
    </div>
  )
}

export default Login