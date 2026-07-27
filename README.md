# DSA_Journal
An AI-powered platform to learn, visualize, and journal Data Structures &amp; Algorithms.



# Data Model
Problem {
  title: string

  source: string        // "LeetCode" | "Codeforces" | "Striver A2Z"

  problemLink: string    // optional

  content: string        // pasted problem/solution

  pattern: string        // AI-generated

  reasoning: string       // AI-generated

  myNotes: string
  
  createdAt: date
}

# routes
POST /problems

GET/problems

GET /problems/:id

PUT /problems/:id

DELETE /problems/:id