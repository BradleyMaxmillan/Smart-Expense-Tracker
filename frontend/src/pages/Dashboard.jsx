import React, { useEffect, useState } from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import SpendingChart from '../components/dashboard/SpendingChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import SavingsTip from '../components/dashboard/SavingsTip';
import { fetchCategories, fetchTransactions } from '../api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const tx = await fetchTransactions();
      const cat = await fetchCategories();
      setTransactions(tx);
      setCategories(cat);
    };
    loadData();
  }, []);

  return (
    <>
      <SummaryCards />
      <SpendingChart transactions={transactions} categories={categories} />
      <RecentTransactions transactions={transactions} />
      <SavingsTip />
    </>
  );
};

export default Dashboard;
