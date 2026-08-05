import API from '../api/axios';

/**
 * Login user with email and password.
 * Returns { token, user } on success.
 */
export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

/**
 * Register a new user.
 * Returns { message, user } on success.
 */
export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};
