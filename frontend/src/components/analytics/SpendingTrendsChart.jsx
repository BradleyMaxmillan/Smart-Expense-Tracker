import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SpendingTrendsChart({ data = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full transition-all duration-300 hover:shadow-lg">
      <h3 className="text-md font-semibold mb-3 text-gray-800">Spending Trends</h3>

      {data.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <div className="h-[250px] lg:h-[400px]"> {/* responsive height */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                tickLine={false} 
                axisLine={{ stroke: '#d1d5db' }} 
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                tickLine={false} 
                axisLine={{ stroke: '#d1d5db' }} 
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value) => `$${value.toLocaleString()}`} 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#fff', padding: '8px' }}
                itemStyle={{ color: '#374151', fontWeight: '500' }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 3, fill: '#3b82f6', strokeWidth: 1, stroke: '#fff' }} 
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
