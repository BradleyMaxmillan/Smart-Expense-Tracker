import React from 'react'
import { useData } from '../context/DataContext'
import SpendingTrendsChart from '../components/analytics/SpendingTrendsChart'
import CategoryBreakdownChart from '../components/analytics/CategoryBreakdownChart'
import BudgetProgressChart from '../components/analytics/BudgetProgressChart'

export default function Analytics(){
  const { transactions, budgets } = useData()

  const trendsData = transactions.map(tx=>({ date: tx.date, amount: tx.amount }))

  const categoryData = Object.values(transactions.reduce((acc, tx)=>{
    acc[tx.category] = acc[tx.category] || { category: tx.category, amount: 0 }
    acc[tx.category].amount += tx.amount
    return acc
  },{}))

  const budgetData = budgets.map(b=>({ category: b.category, amount: b.amount }))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SpendingTrendsChart data={trendsData} />
        <CategoryBreakdownChart data={categoryData} />
        <BudgetProgressChart data={budgetData} />
      </div>
    </div>
  )
}
