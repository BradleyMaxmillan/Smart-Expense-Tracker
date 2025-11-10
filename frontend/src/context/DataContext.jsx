// src/context/DataContext.jsx
import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { categories as dummyCategories, transactions as dummyTransactions, budgets as dummyBudgets } from '../api/dummyData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage('transactions', dummyTransactions);
  const [categories, setCategories] = useLocalStorage('categories', dummyCategories);
  const [budgets, setBudgets] = useLocalStorage('budgets', dummyBudgets);

  // Add a transaction
  const addTransaction = (tx) => {
    const updated = [...transactions, tx];
    setTransactions(updated);
  };

  // Delete a transaction by id
  const deleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
  };

  return (
    <DataContext.Provider value={{ transactions, categories, budgets, addTransaction, deleteTransaction }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
