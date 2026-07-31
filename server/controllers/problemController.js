const Problem = require("../models/Problem");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeWithGemini = async (title, content) => {
 const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  const prompt = `
Analyze this DSA problem.

Title:
${title}

Problem:
${content}

Return only JSON:

{
 "pattern":"",
 "reasoning":""
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

    try {
      const analysis = await analyzeWithGemini(req.body.title, req.body.content);
      pattern = analysis.pattern;
      reasoning = analysis.reasoning;
    } catch (aiError) {
      console.error("Gemini analysis failed, saving without it:", aiError.message);
    }

    const problem = await Problem.create({
      ...req.body,
      pattern,
      reasoning,
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