import React from 'react'
import Card from '../ui/Card'

export default function SummaryCards({transactions}){
  const total = transactions.reduce((s,t)=>s + Number(t.amount),0)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card><h3 className="font-semibold text-sm">Total Expenses</h3><p className="text-2xl font-bold">Ksh {total}</p></Card>
      <Card><h3 className="font-semibold text-sm">Monthly Budget</h3><p className="text-2xl font-bold">Ksh 10,000</p></Card>
      <Card><h3 className="font-semibold text-sm">Savings</h3><p className="text-2xl font-bold">Ksh 2,500</p></Card>
    </div>
  )
}
