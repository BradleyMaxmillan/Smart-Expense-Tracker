import React from 'react'
import Card from '../ui/Card'

export default function RecentTransactions({transactions, onDelete}){
  return (
    <Card>
      <h3 className="font-semibold mb-2">Recent Transactions</h3>
      <ul>
        {transactions.slice().reverse().map(tx=>(
          <li key={tx.id} className="flex items-center justify-between py-3 border-b">
            <div>
              <div className="font-medium">{tx.description}</div>
              <div className="text-xs text-gray-500">{tx.category} • {tx.date}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">Ksh {tx.amount}</div>
              <button onClick={()=>onDelete(tx.id)} className="text-red-500 text-sm mt-1">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
