import React,{createContext,useReducer} from 'react'
import TransactionReducer from './transactionReducer.js'
const initialState={
    transactions:[]

}
 
export const TransactionContext=createContext(initialState)

export const TransactionProvider=({children})=>{
    const [state, dispatch] = useReducer(TransactionReducer, initialState);
    function add(obj){
        dispatch({
            type:'Add',
            payload:obj
            
        })
    }
    function remove(pr){
        dispatch({
            type:'remove',
            payload:{
                id:pr,
            }
        });
    }
    return (
        <TransactionContext.Provider value={{
            transactions:state.transactions,
            add,
            remove

        }}>
            {children}

        </TransactionContext.Provider>
    )
}