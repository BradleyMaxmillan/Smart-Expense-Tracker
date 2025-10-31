import { useEffect, useState } from 'react';
import { getAnalyticsData } from '../api/analytics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getAnalyticsData(token).then(setData);
  }, []);
console.log("Analytics data:", data);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Monthly Spending */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Monthly Spending</h2>
          <BarChart width={400} height={300} data={data.monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_spending" fill="#4F46E5" />
          </BarChart>
        </div>

        {/* Spending by Category */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Spending by Category</h2>
          <PieChart width={400} height={300}>
            <Pie data={data.categories} dataKey="total_amount" nameKey="category" cx="50%" cy="50%" outerRadius={100}>
              {data.categories.map((entry, index) => (
                <Cell key={index} fill={entry.color || '#4F46E5'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
