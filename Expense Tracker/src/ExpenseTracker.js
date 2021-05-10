import React,{useContext,useState} from 'react'
import{TransactionContext} from './transactionContext' 
function ExpenseTracker() {
    let {transactions}=useContext(TransactionContext)
    let{add,remove}=useContext(TransactionContext)
    console.log(transactions);
    
    const [desc,setDesc]=useState('');
    const [amount,setAmount]=useState(0)
    const [count,setCount] =useState(0);
   
    //console.log(transaction);
    const handleSunmit=(e)=>{
        e.preventDefault();
        console.log(desc,amount);
        const trns={
            id:count,
            amount:amount,
            desc:desc
        }
        setCount(count+1);
        add(trns);
    }
    const income=()=>{
        let income=0;
        transactions.forEach(element => {
            
            if(element.amount>0){
               income+=parseInt(element.amount) 
            }        
        });
        return income
        
    }  
    const expense=()=>{
        let expense=0;
        transactions.forEach(element => {
            
            if(element.amount<0){
                expense+=parseInt(element.amount )
            }        
        });
        return expense
        
    } 
       
    return (
        <div>
            <h1>Expense Tracker</h1>
            <h2>Current Balanace</h2>
            <h1>${income()+expense()}</h1>
            <div className='income'>
               <div >
                 <h2>Income</h2>
                 <h2 id='income'>${income()}</h2>
              </div>
              <div>
                <h2 >Expense</h2>
                <h2 id='expense'>${expense()}</h2>
              </div>
            </div>
            <h2>Transaction History</h2>
            <hr/>
            <div>
            {transactions.map((index,key1)=>
            {
                
                      return <div  key={key1} >
                          
                          {console.log('tra',transactions)}
                <div className='transactions'>
                    
                    <span>{index.desc}</span>
                    <span>{index.amount}</span>
                                 <button onClick={()=>{remove(index.id)}}className='del'>x</button>
                </div>
                
                
            </div>
            

            })}
            </div>
            <h2>Add New Transactions</h2>
            <hr/>
            <form onSubmit={handleSunmit}>
                <label>
                    Descriptions<br/>
                             <input type='text' required onChange={(e)=>{setDesc(e.target.value)}}></input>
                </label>
                <br/>
                <label>
                    Transaction Amount<br/>
                         <input type='number' required onChange={(e)=>{setAmount(e.target.value)}}></input>
                </label>
                <br/>
                <input type='submit' value='Add Transactions' className='button' ></input>
            </form>
        </div>
    )
}

export default ExpenseTracker
