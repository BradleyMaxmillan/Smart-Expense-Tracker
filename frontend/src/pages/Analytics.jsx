import React from 'react';
import { useData } from '../context/DataContext';
import SpendingTrendsChart from '../components/analytics/SpendingTrendsChart';
import CategoryBreakdownChart from '../components/analytics/CategoryBreakdownChart';

export default function Analytics() {
  const { transactions } = useData();

  // Prepare data for charts
  const trendsData = transactions.map(tx => ({ date: tx.date, amount: tx.amount }));

  const categoryData = Object.values(
    transactions.reduce((acc, tx) => {
      acc[tx.category] = acc[tx.category] || { category: tx.category, amount: 0 };
      acc[tx.category].amount += tx.amount;
      return acc;
    }, {})
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500 mt-1">View your spending trends and category breakdowns.</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingTrendsChart data={trendsData} />
        <CategoryBreakdownChart data={categoryData} />
      </div>
    </div>
  );
}
