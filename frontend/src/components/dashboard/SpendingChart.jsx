import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import { getSpendingByCategory } from '../../utils/chartHelpers';

const SpendingChart = ({ transactions = [], categories = [] }) => {
  // Generate chart data from props
  const chartData = getSpendingByCategory(transactions, categories);

  if (!chartData.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <h3 className="text-lg font-semibold mb-4">
          Breakdown of your expenses by category
        </h3>
        <p className="text-gray-500">No expenses to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">
        Breakdown of your expenses by category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
          <Tooltip formatter={(value) => `$${value}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
