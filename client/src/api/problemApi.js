import axios from "axios";

const API_URL = "http://localhost:5000/api/problems";

export const createProblem = async (problemData) => {
  const response = await axios.post(API_URL, problemData);
  return response.data;
};

export const getProblems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateProblem = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteProblem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};