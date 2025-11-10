import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#6366f1', '#14b8a6', '#f97316', '#ef4444', '#f43f5e'];

export default function CategoryBreakdownChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full transition-all duration-300 hover:shadow-lg">
      <h3 className="text-md font-semibold mb-3 text-gray-800">Category Breakdown</h3>

      {data.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <div className="h-[250px] lg:h-[400px]"> {/* responsive height */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                label={({ name, amount }) => `${name}: $${amount.toLocaleString()}`}
                isAnimationActive={true}
                animationDuration={700}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={1} />
                ))}
              </Pie>

              <Legend
                verticalAlign="bottom"
                height={40}
                iconType="circle"
                wrapperStyle={{ fontSize: '0.875rem', color: '#4b5563', textAlign: 'center', flexWrap: 'wrap' }}
              />

              <Tooltip
                formatter={(value, name, props) => {
                  const percent = ((props.payload.amount / total) * 100).toFixed(0);
                  return [`$${value.toLocaleString()} (${percent}%)`, name];
                }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#fff', padding: '8px' }}
                itemStyle={{ color: '#374151', fontWeight: '500' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
