import React from 'react'
import { useData } from '../context/DataContext'
import TransactionForm from '../components/transactions/TransactionForm'
import TransactionList from '../components/transactions/TransactionList'

export default function AddTransaction(){
  const { transactions, categories, addTransaction, deleteTransaction } = useData()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <TransactionForm onAdd={addTransaction} categories={categories} />
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </div>
    </div>
  )
}
