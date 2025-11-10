import React, { useEffect, useState } from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import SpendingChart from '../components/dashboard/SpendingChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import SavingsTip from '../components/dashboard/SavingsTip';
import { transactions as dummyTransactions, categories as dummyCategories } from '../api/dummyData';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // directly use dummy data
    setTransactions(dummyTransactions);
    setCategories(dummyCategories);
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
