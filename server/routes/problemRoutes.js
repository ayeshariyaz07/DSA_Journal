const express = require("express");

const {
  createProblem,
  getProblems,
  updateProblem,
  deleteProblem,
} = require("../controllers/problemController");

const router = express.Router();

router.post("/", createProblem);
router.get("/", getProblems);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

module.exports = router;