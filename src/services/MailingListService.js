import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL+'/mailing-lists';

// Utility function to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getAllMailingLists = () => {
  return axios.get(API_URL, getAuthHeaders());
};

const getMailingListById = (id) => {
  return axios.get(`${API_URL}/${id}`, getAuthHeaders());
};

export const getMailingListByOwnerId = (id) => {
  return axios.get(`${API_URL}/user/${id}`, getAuthHeaders());
};

export const createMailingList = (data) => {
  return axios.post(API_URL, data, getAuthHeaders());
};

const updateMailingList = (id, data) => {
  const params = new URLSearchParams();
  params.append("name", data.name);
  params.append("description", data.description);

  return axios.put(`${API_URL}/update/${id}?${params.toString()}`, null, getAuthHeaders());
};

const deleteMailingList = (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};



// ✅ Add contact to mailing list (POST without body, but with Bearer token)
const addContactToMailingList = (mailingListId, contactId) => {
  return axios.post(
    `${API_URL}/${mailingListId}/contacts/${contactId}`,
    {}, // empty body
    getAuthHeaders()
  );
};

// ✅ Final MailingListService object with all methods
const MailingListService = {
  getAllMailingLists,
  getMailingListById,
  createMailingList,
  updateMailingList,
  deleteMailingList,
  addContactToMailingList, // <-- Make sure this is exported
  getMailingListByOwnerId
};

export default MailingListService;
