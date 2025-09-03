// src/services/campaignService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL+'/campaigns'; // ✅ change if your backend runs on another port

// ✅ Get JWT token from localStorage (or sessionStorage)
const getAuthHeader = () => {
  const token = localStorage.getItem("token"); // store token when user logs in
  const id=localStorage.getItem("userId");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Create a campaign
export const createCampaign = async (campaignData) => {
  const response = await axios.post(API_URL, campaignData, getAuthHeader());
  return response.data;
};

// Get all campaigns
export const getAllCampaigns = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

// Get campaign by ID
export const getCampaignById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};
// Get campaign by created-by ID
export const getCampaignByCreatedById = async (id) => {
  const response = await axios.get(`${API_URL}/created-by/${id}`, getAuthHeader());
  return response.data;
};
// Update campaign
export const updateCampaign = async (id, updatedCampaign) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedCampaign, getAuthHeader());
  return response.data;
};

// Delete campaign
export const deleteCampaign = async (id) => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeader());
};

// Schedule campaign
export const scheduleCampaign = async (id, scheduleData) => {
  const response = await axios.post(`${API_URL}/${id}/schedule`, scheduleData, getAuthHeader());
  return response.data;
};

// Mark campaign as sent
export const markCampaignAsSent = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/send`, {}, getAuthHeader());
  return response.data;
};
