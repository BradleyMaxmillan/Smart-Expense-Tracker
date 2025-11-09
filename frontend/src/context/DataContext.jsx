import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { storage } from '../api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage('transactions', storage.getTransactions());
  const [categories, setCategories] = useLocalStorage('categories', storage.getCategories());
  const [budgets, setBudgets] = useLocalStorage('budgets', storage.getBudgets());

  const addTransaction = (tx) => setTransactions([...transactions, tx]);
  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));

  return (
    <DataContext.Provider value={{ transactions, categories, budgets, addTransaction, deleteTransaction }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
