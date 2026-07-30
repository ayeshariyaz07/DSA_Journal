const BASE_URL = import.meta.env.VITE_API_URL
const USER_URL = BASE_URL.replace('/problems', '/users')

export async function fetchProblems() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Failed to fetch problems')
  return res.json()
}

export async function fetchProblemById(id) {
  // Workaround: no GET /:id yet, so fetch all and find locally
  const problems = await fetchProblems()
  return problems.find((p) => p._id === id)
}

export async function createProblem(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create problem')
  return res.json()
}

export async function updateProblem(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update problem')
  return res.json()
}

export async function deleteProblem(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete problem')
  return res.json()
}

export async function fetchUser(id) {
  const res = await fetch(`${USER_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export async function updateUser(id, data) {
  const res = await fetch(`${USER_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update user')
  return res.json()
}