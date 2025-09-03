import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL+'/auth'; // Change if needed

// ---- Token Utility Functions ----
const TOKEN_KEY = 'token';

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---- API Calls ----

/**
 * Register new user
 * @param {Object} user - { name, email, username, password, role }
 */
export const register = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, user);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Signup failed' };
  }
};

/**
 * Login user with email or username and password
 * @param {Object} credentials - { username (or email), password }
 */

export const login = async (credentials) => {
  try {
    //console.log(JSON.stringify(credentials));
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    );
    if (response.data.token) {
      saveToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

/**
 * Logout the user by removing token
 */
export const logout = () => {
  removeToken();
};
