import React from 'react'
import { useData } from '../context/DataContext'
import SummaryCards from '../components/dashboard/SummaryCards'
import RecentTransactions from '../components/dashboard/RecentTransactions'

export default function Dashboard(){
  const { transactions, deleteTransaction } = useData()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <SummaryCards transactions={transactions} />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <RecentTransactions transactions={transactions} onDelete={deleteTransaction} />
        </div>
        <div>
          <div className="card">
            <h3 className="font-semibold">Quick Actions</h3>
            <div className="mt-3 space-y-2">
              <button className="w-full px-3 py-2 bg-[color:var(--accent-blue)] text-white rounded">Add Transaction</button>
              <button className="w-full px-3 py-2 border rounded">Export Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
