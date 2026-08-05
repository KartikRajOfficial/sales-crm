import API from '../api/axios';

/**
 * Fetch opportunities with optional stage filter, value range, pagination, and sorting.
 */
export const getOpportunities = async (params = {}) => {
  const response = await API.get('/opportunities', { params });
  return response.data;
};

/**
 * Create a new opportunity.
 */
export const createOpportunity = async (opportunityData) => {
  const response = await API.post('/opportunities', opportunityData);
  return response.data;
};

/**
 * Update an existing opportunity by ID.
 */
export const updateOpportunity = async (id, opportunityData) => {
  const response = await API.put(`/opportunities/${id}`, opportunityData);
  return response.data;
};

/**
 * Delete an opportunity by ID. (Admin only)
 */
export const deleteOpportunity = async (id) => {
  const response = await API.delete(`/opportunities/${id}`);
  return response.data;
};
