import * as storageService from './localStorageService';
import { categories, transactions, budgets } from './dummyData';

const useBackend = false;

// Fetchers (dummy or local storage)
export const fetchCategories = async () => useBackend ? [] : storageService.getCategories() || categories;
export const fetchTransactions = async () => useBackend ? [] : storageService.getTransactions() || transactions;
export const fetchBudgets = async () => useBackend ? [] : storageService.getBudgets() || budgets;

// Bootstrap defaults
export const bootstrapDefaults = () => console.log('Bootstrap defaults initialized');

// Export storage helpers
export const storage = storageService;
