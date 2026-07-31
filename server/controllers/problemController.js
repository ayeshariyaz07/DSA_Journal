const Problem = require("../models/Problem");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeWithGemini = async (title, content, myNotes) => {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `
Analyze this DSA problem and the user's solution/approach.

Title:
${title}

Problem statement:
${content}

User's solution / approach notes:
${myNotes || "(none provided)"}

Identify the primary algorithmic pattern the problem belongs to and explain why it applies.

If the user's solution/approach above contains actual code or a clear algorithmic approach (not just empty or a restatement of the problem), also rate that solution as exactly one of: "Optimal", "Suboptimal", or "Needs improvement", based on its time/space complexity and correctness, and give one short line of feedback on what could be improved. If no real code/approach was provided, set rating and ratingFeedback to null.

Return only JSON, no markdown formatting, no extra text:

{
 "pattern":"",
 "reasoning":"",
 "rating":"",
 "ratingFeedback":""
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace("```json", "").replace("```", "").trim();

  return JSON.parse(clean);
};

// Create Problem
const createProblem = async (req, res) => {
  try {
    const { title, source, content, problemLink, myNotes } = req.body;

    if (!title || !source || !content) {
      return res.status(400).json({
        message: "Title, source and content are required.",
      });
    }

    let pattern = "";
    let reasoning = "";
    let rating = "";
    let ratingFeedback = "";

    try {
      const analysis = await analyzeWithGemini(title, content, myNotes);
      pattern = analysis.pattern;
      reasoning = analysis.reasoning;
      rating = analysis.rating;
      ratingFeedback = analysis.ratingFeedback;
    } catch (aiError) {
      console.error("Gemini analysis failed, saving without it:", aiError.message);
    }

    const problem = await Problem.create({
      title,
      source,
      problemLink,
      content,
      myNotes,
      pattern,
      reasoning,
      rating,
      ratingFeedback,
    });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Problems
const getProblems = async (req, res) => {
  try {
    const { pattern } = req.query;

    let query = {};
    if (pattern) {
      query.pattern = pattern;
    }

    const problems = await Problem.find(query);

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Problem
const updateProblem = async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Problem
const deleteProblem = async (req, res) => {
  try {
    const deleted = await Problem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProblem,
  getProblems,
  updateProblem,
  deleteProblem,
};
