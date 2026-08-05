import API from '../api/axios';

/**
 * Fetch leads with optional search, status filter, pagination, and sorting.
 */
export const getLeads = async (params = {}) => {
  const response = await API.get('/leads', { params });
  return response.data;
};

/**
 * Create a new lead.
 */
export const createLead = async (leadData) => {
  const response = await API.post('/leads', leadData);
  return response.data;
};

/**
 * Update an existing lead by ID.
 */
export const updateLead = async (id, leadData) => {
  const response = await API.put(`/leads/${id}`, leadData);
  return response.data;
};

/**
 * Delete a lead by ID. (Admin only)
 */
export const deleteLead = async (id) => {
  const response = await API.delete(`/leads/${id}`);
  return response.data;
};
