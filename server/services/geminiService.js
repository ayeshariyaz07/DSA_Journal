const { GoogleGenAI } = require("@google/genai");

const analyzeProblem = async (content) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are a DSA expert.

Given the following DSA problem or solution, identify:

1. The primary algorithmic pattern.
2. A short reasoning (1-2 lines).

Choose ONLY ONE pattern from this list:
- Two Pointers
- Sliding Window
- Dynamic Programming
- Greedy
- Binary Search
- Backtracking
- Graph Traversal
- Prefix Sum
- Hashing
- Stack
- Queue
- Tree
- Heap
- Trie
- Union Find

Respond ONLY with valid JSON:

{
  "pattern": "...",
  "reasoning": "..."
}

Problem:
${content}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text.trim();

  return JSON.parse(text);
};

module.exports = { analyzeProblem };