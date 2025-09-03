// src/services/contactService.js

import axios from 'axios';
const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
const BASE_URL =import.meta.env.VITE_API_BASE_URL+'/contacts'; // Adjust base URL if needed

// Get all contacts
export const getAllContacts = async () => {
  const response = await axios.get(BASE_URL,authHeader());
  return response.data;
};

// Get all subscribed contacts
export const getAllSubscribedContacts = async (id) => {
  const response = await axios.get(`${BASE_URL}/subscribers/${id}`,authHeader());
  console.log(response.data);
  return response.data;
};
// Get all unsubscribed contacts
export const getAllUnsubscribedContacts = async (id) => {
  const response = await axios.get(`${BASE_URL}/unsubscribers/${id}`,authHeader());
  console.log(response.data);
  return response.data;
};
// Get a contact by ID
export const getContactById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`,authHeader());
  
  return response.data;
};
// Get a contact by Owner ID
export const getContactByOwnerId = async (id) => {
  const response = await axios.get(`${BASE_URL}/user/${id}`,authHeader());
  return response.data;
};
// Create a new contact
export const createContact = async (contactData) => {
  const response = await axios.post(BASE_URL, contactData,authHeader());
  return response.data;
};

// Update an existing contact
export const updateContact = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData,authHeader());
  return response.data;
};

// Delete a contact
export const deleteContact = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`,authHeader());
  return response.data;
};

export const getContactsNotInMailingList = (uid,mid) => {
  return axios.get(`${BASE_URL}/not-in-mailinglist/${uid}/${mid}`, authHeader());
};


// ✅ Toggle subscription status (subscribe/unsubscribe)
export const toggleSubscription = async (id) => {
  const response = await axios.put(`${BASE_URL}/${id}/toggle-subscription`,  {}, authHeader());
  return response.data;
};