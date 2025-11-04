import React from 'react'
export default function TransactionList({transactions, onDelete}){
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">All Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="text-sm text-gray-500"><th className="p-2">Description</th><th>Category</th><th>Amount</th><th>Date</th><th></th></tr></thead>
          <tbody>
            {transactions.map(tx=>(
              <tr key={tx.id} className="border-t">
                <td className="py-2 p-2">{tx.description}</td>
                <td className="p-2">{tx.category}</td>
                <td className="p-2">Ksh {tx.amount}</td>
                <td className="p-2">{tx.date}</td>
                <td className="p-2"><button onClick={()=>onDelete(tx.id)} className="text-red-500">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
