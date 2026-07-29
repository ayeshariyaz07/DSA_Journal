const Problem = require("../models/Problem");
const { analyzeProblem } = require("../services/geminiService");

/// Create Problem
const createProblem = async (req, res) => {
  try {

    const {
      title,
      source,
      content,
      problemLink,
      myNotes
    } = req.body;

    if (!title || !source || !content) {
      return res.status(400).json({
        message: "Title, source and content are required."
      });
    }

    const { pattern, reasoning } =
      await analyzeProblem(content);

    const problem = await Problem.create({
      title,
      source,
      problemLink,
      content,
      myNotes,
      pattern,
      reasoning,
    });

    res.status(201).json(problem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

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
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Problem
const updateProblem = async (req, res) => {
  try {

    const updated = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.status(200).json(updated);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Problem
const deleteProblem = async (req, res) => {

  try {

    const deleted = await Problem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.status(200).json({
      message: "Problem deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createProblem,
  getProblems,
  updateProblem,
  deleteProblem,
};