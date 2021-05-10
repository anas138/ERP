import React from 'react'
import Expense from './ExpenseTracker.js'
import './App.css'
import {TransactionProvider} from './transactionContext'
function App() {
  return (
    <div className='ExpenseTracker'>
      <TransactionProvider>
      <Expense />
      </TransactionProvider>
      

    </div>
  );
}

export default App;
