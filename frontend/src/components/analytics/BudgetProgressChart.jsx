import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function BudgetProgressChart({ data }) {
  return (
    <div className="card">
      <h3 className="font-semibold mb-2">Budget Progress</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="var(--accent-green)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
