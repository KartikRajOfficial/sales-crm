import API from '../api/axios';

/**
 * Fetch dashboard statistics.
 * Returns { totalLeads, totalCustomers, totalOpportunities, totalPipelineValue }
 */
export const getDashboardStats = async () => {
  const response = await API.get('/dashboard/stats');
  return response.data;
};
