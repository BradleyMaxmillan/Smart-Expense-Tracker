import * as ls from './localStorageService'
import { defaultTransactions, defaultCategories, defaultBudgets } from './dummyData'

const KEYS = { TRANSACTIONS: 'transactions', CATEGORIES: 'categories', BUDGETS: 'budgets', USER: 'user' }

export const bootstrapDefaults = () => {
  if (!ls.getData(KEYS.TRANSACTIONS)) ls.saveData(KEYS.TRANSACTIONS, defaultTransactions)
  if (!ls.getData(KEYS.CATEGORIES)) ls.saveData(KEYS.CATEGORIES, defaultCategories)
  if (!ls.getData(KEYS.BUDGETS)) ls.saveData(KEYS.BUDGETS, defaultBudgets)
}

export const storage = {
  getTransactions: () => ls.getData(KEYS.TRANSACTIONS) || [],
  saveTransactions: (list) => ls.saveData(KEYS.TRANSACTIONS, list),
  getCategories: () => ls.getData(KEYS.CATEGORIES) || [],
  getBudgets: () => ls.getData(KEYS.BUDGETS) || [],
  getUser: () => ls.getData(KEYS.USER),
  saveUser: (user) => ls.saveData(KEYS.USER, user),
  removeUser: () => ls.removeData(KEYS.USER),
}
