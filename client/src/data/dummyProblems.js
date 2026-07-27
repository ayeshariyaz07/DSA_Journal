export const dummyProblems = [
  {
    id: '1',
    title: 'Two Sum',
    source: 'LeetCode',
    problemLink: 'https://leetcode.com/problems/two-sum/',
    content:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to the target.',
    pattern: 'Hash Map',
    reasoning:
      'A hash map allows checking whether the complement of the current number exists in O(1), reducing the overall complexity to O(n).',
    rating: 'Optimal',
    ratingFeedback:
      'Excellent solution. Uses the optimal Hash Map approach with linear time complexity.',
    myNotes:
      'Initially thought of brute force (O(n^2)), then learned how Hash Maps optimize the search.',
    createdAt: '2026-07-28T09:30:00.000Z',
  },
  {
    id: '2',
    title: 'Container With Most Water',
    source: 'LeetCode',
    problemLink: 'https://leetcode.com/problems/container-with-most-water/',
    content:
      'Given n non-negative integers representing heights of vertical lines, find two lines that together with the x-axis form a container holding the most water.',
    pattern: 'Two Pointers',
    reasoning:
      'Two pointers starting from both ends let you shrink the search space by always moving the shorter line inward.',
    rating: 'Suboptimal',
    ratingFeedback:
      'Works correctly but currently checks all pairs — O(n^2). Moving to two pointers brings it down to O(n).',
    myNotes: 'Need to revisit why moving the shorter pointer is always safe.',
    createdAt: '2026-07-27T14:10:00.000Z',
  },
  {
    id: '3',
    title: 'Climbing Stairs',
    source: 'Striver A2Z',
    problemLink: '',
    content:
      'You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    pattern: 'DP',
    reasoning:
      'Each step count depends on the sum of the two previous step counts, a classic 1D dynamic programming recurrence.',
    rating: 'Needs improvement',
    ratingFeedback:
      'Uses plain recursion without memoization, causing exponential time. Add a DP array or memoization.',
    myNotes: 'Confused this with a greedy problem at first.',
    createdAt: '2026-07-26T18:45:00.000Z',
  },
  {
    id: '4',
    title: 'Number of Islands',
    source: 'LeetCode',
    problemLink: 'https://leetcode.com/problems/number-of-islands/',
    content:
      'Given an m x n 2D binary grid representing land and water, return the number of islands.',
    pattern: 'Graph Traversal',
    reasoning:
      'Each unvisited land cell triggers a DFS/BFS to mark the whole connected island as visited.',
    rating: 'Optimal',
    ratingFeedback: 'Clean DFS solution with proper visited tracking. O(m*n) time as expected.',
    myNotes: 'Good practice for grid-based graph problems.',
    createdAt: '2026-07-25T11:05:00.000Z',
  },
  {
    id: '5',
    title: 'Valid Parentheses',
    source: 'Codeforces',
    problemLink: '',
    content:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    pattern: 'Stack',
    reasoning: 'A stack naturally tracks the most recent unmatched opening bracket.',
    rating: null,
    ratingFeedback: null,
    myNotes: 'Just pasted the problem statement, haven\'t solved it yet.',
    createdAt: '2026-07-24T08:20:00.000Z',
  },
]