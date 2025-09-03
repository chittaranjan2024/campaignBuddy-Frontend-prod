import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL+"/templates";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Set headers with Authorization
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Fetch all templates
export const getAllTemplates = async () => {
  const response = await axios.get(API_BASE_URL, authHeader());
  return response.data;
};

// Get template by ID
export const getTemplateById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`, authHeader());
  return response.data;
};

// Get templates by userId (owner)
export const getTemplatesByUser = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`, authHeader());
  return response.data;
};

// Create a new template
export const createTemplate = async (templateData) => {
  const response = await axios.post(API_BASE_URL, templateData, authHeader());
  console.log(templateData)
  return response.data;
};

// Update an existing template
export const updateTemplate = async (id, updatedTemplateData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTemplateData, authHeader());
  return response.data;
};

// Delete a template
export const deleteTemplate = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, authHeader());
  return response.data;
};
