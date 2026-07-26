const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  problemLink: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  pattern: {
    type: String,
  },
  reasoning: {
    type: String,
  },
  myNotes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Problem", problemSchema);