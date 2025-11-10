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
    <div className="space-y-6">
        {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Chart and Transactions side by side on large screens */}
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {/* Chart on the left */}
        <div className="lg:w-2/3">
          <SpendingChart transactions={transactions} categories={categories} />
        </div>

        {/* Latest Transactions on the right */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <RecentTransactions transactions={transactions} />
        </div>
      </div>

      {/* Savings Tip or other sections */}
      <SavingsTip />
    </div>
  );
};

export default Dashboard;
