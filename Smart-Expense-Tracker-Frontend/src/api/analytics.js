import axios from 'axios';

export const fetchAnalyticsData = async () => {
  try {
    const response = await axios.get('/api/analytics');
    return response.data;
  } catch (error) {
    return {
      monthlyExpenses: [],
      monthlyIncome: [],
      categories: [],
      recent: [],
      budgets: [],
      totalTransactions: 0,
      connection_status: 'disconnected',
      error: error.message,
    };
  }
};