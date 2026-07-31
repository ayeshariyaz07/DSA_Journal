const BASE_URL = import.meta.env.VITE_API_URL;

const USER_URL = BASE_URL.replace("/problems", "/users");

// ================= Problems =================

export async function fetchProblems() {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch problems");
  }

  return res.json();
}

export async function fetchProblemById(id) {
  const problems = await fetchProblems();
  return problems.find((p) => p._id === id);
}

export async function createProblem(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create problem");
  }

  return res.json();
}

export async function updateProblem(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update problem");
  }

  return res.json();
}

export async function deleteProblem(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete problem");
  }

  return res.json();
}

// ================= User =================
export async function fetchUser() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${USER_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
}
export async function updateUser(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${USER_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update user");

  return res.json();
}

// ================= Signup =================

export async function signupUser(userData) {
  const res = await fetch(`${USER_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

// ==============Verify Otp==============

export const verifyOtp = async (email, otp) => {
  const response = await fetch("http://localhost:5000/api/users/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// ================= Login =================

export async function loginUser(userData) {
  const res = await fetch(`${USER_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

// ======================API GEMINI========================
export async function analyzeProblem(problem) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/ai/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(problem),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  return res.json();
}