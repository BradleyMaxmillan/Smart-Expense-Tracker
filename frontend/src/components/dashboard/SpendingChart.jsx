import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { getSpendingByCategory } from '../../utils/chartHelpers';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f43f5e'];

const SpendingChart = ({ transactions = [], categories = [] }) => {
  const chartData = getSpendingByCategory(transactions, categories);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Expenses by Category</h3>

      {chartData.length === 0 ? (
        <p className="text-gray-500">No expenses to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}          // donut style
              outerRadius={90}
              paddingAngle={4}
              labelLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              label={({ name, value, percent }) => `${name}: $${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
              isAnimationActive={true}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            <Legend
              verticalAlign="bottom"
              height={60}
              iconType="circle"
              wrapperStyle={{ fontSize: '0.875rem', color: '#4b5563', textAlign: 'center', flexWrap: 'wrap' }}
            />

            <Tooltip
              formatter={(value, name, props) => {
                const percent = ((props.payload.value / chartData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(0);
                return [`$${value.toLocaleString()} (${percent}%)`, name];
              }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#fff', padding: '8px' }}
              itemStyle={{ color: '#374151', fontWeight: '500' }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SpendingChart;
