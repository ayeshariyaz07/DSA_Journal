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
    let pattern = "";
    let reasoning = "";
    let rating = "";
    let ratingFeedback = "";

    try {
      const analysis = await analyzeWithGemini(
        req.body.title,
        req.body.content,
        req.body.myNotes
      );
      pattern = analysis.pattern;
      reasoning = analysis.reasoning;
      rating = analysis.rating;
      ratingFeedback = analysis.ratingFeedback;
    } catch (aiError) {
      console.error("Gemini analysis failed, saving without it:", aiError.message);
    }

    const problem = await Problem.create({
      ...req.body,
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
    const problems = await Problem.find();
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
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Problem
const deleteProblem = async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
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