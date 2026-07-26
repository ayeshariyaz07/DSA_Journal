const Problem = require("../models/Problem");
const { analyzeProblem } = require("../services/geminiService");

/// Create Problem
const createProblem = async (req, res) => {
  try {
    const {
      title,
      source,
      problemLink,
      content,
      myNotes,
    } = req.body;

    // Ask Gemini to analyze the problem
    const aiResponse = await analyzeProblem(content);

    // Save everything to MongoDB
    const problem = await Problem.create({
      title,
      source,
      problemLink,
      content,
      myNotes,
      pattern: aiResponse.pattern,
      reasoning: aiResponse.reasoning,
    });

    res.status(201).json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
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
    const updated = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Problem
const deleteProblem = async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Problem deleted successfully",
    });
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