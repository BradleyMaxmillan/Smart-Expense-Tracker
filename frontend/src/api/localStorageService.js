// Generic helpers
export const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

// Auth helpers
export const getUser = () => getItem('user');
export const saveUser = (user) => setItem('user', user);
export const removeUser = () => removeItem('user');

// Transactions helpers
export const getTransactions = () => getItem('transactions') || [];
export const saveTransactions = (data) => setItem('transactions', data);
export const removeTransactions = () => removeItem('transactions');

// Categories helpers
export const getCategories = () => getItem('categories') || [];
export const saveCategories = (data) => setItem('categories', data);
export const removeCategories = () => removeItem('categories');

// Budgets helpers
export const getBudgets = () => getItem('budgets') || [];
export const saveBudgets = (data) => setItem('budgets', data);
export const removeBudgets = () => removeItem('budgets');
