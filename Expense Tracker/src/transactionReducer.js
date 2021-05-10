const TransactionReducer=((state,action)=>{
   switch(action.type){
       case 'Add':{
           return {
               ...state,
              transactions:[ action.payload, ...state.transactions]
           }
       }
       case 'remove':{
                return {
                          ...state,
                           transactions:state.transactions.filter((index)=>index.id!=action.payload.id),
                    
                }
                
    }
       default:{
       return state
       }
   }
});
export default TransactionReducer