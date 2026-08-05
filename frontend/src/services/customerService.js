import API from '../api/axios';

/**
 * Fetch customers with optional search, pagination, and sorting.
 */
export const getCustomers = async (params = {}) => {
  const response = await API.get('/customers', { params });
  return response.data;
};

/**
 * Create a new customer.
 */
export const createCustomer = async (customerData) => {
  const response = await API.post('/customers', customerData);
  return response.data;
};

/**
 * Update an existing customer by ID.
 */
export const updateCustomer = async (id, customerData) => {
  const response = await API.put(`/customers/${id}`, customerData);
  return response.data;
};

/**
 * Delete a customer by ID. (Admin only)
 */
export const deleteCustomer = async (id) => {
  const response = await API.delete(`/customers/${id}`);
  return response.data;
};
