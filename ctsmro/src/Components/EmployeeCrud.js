import React,{useEffect,useState} from 'react'
import './EmployeeCrud.css'
import {FaPlusSquare,FaEdit} from'react-icons/fa'
import {Link} from 'react-router-dom'
import axios from 'axios'
function EmployeeCrud(props){
const [idKey,setIDKey]=useState();
const [search,setSearch]=useState('');
  
    useEffect(()=>{
    axios.get('http://localhost:3001/data').then(res=>{
        
       props.setEmployeeData(res.data);
       
        //console.log(employeeData);
        //window.location.reload();
        
        
     },[]);
    
    });
   
    const handleAddParts=()=>{
        props.setFlag(0);
        props.setfName(null);
        props.setLastName(null); 
        props.setServiceValue(null); 
        props.setRankValue(null); 
        props.setTradeValue(null); 
        props.setRFIDValue(null);
    }
    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }
    return(
        <div className='container' >
        
    <div className='row offset-2 '>
    <div className='col-1' id='add'>
    <Link to='/employeeForm' onClick={handleAddParts}>
        <FaPlusSquare id='icons' />
        </Link>
    </div>
     <div className='col offset-8'>
      <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" onChange={handleSearch}
      value={search}/>
    </div>   
        
    <table className="table table-bordered" id ='employeeTable'>
  <thead>
      <th>FirstName</th>
      <th>Last Name</th>
      <th>Service Number</th>
      <th>Rank</th>
      <th>Trade</th>
      <th>Edit</th>
  </thead>
 { props.employeeData.filter(val=>{
   if(search=='')
   {
       return val;
   } else if(val.name.toLowerCase().includes(search.toLowerCase()) || val.serviceValue.toLowerCase().includes(search.toLowerCase()))
           {
               return val;
           }
       
   
 }).map((index,key)=>{
     return <tr  >
                  <td>{index.name}</td>
                  <td>{index.educaton}</td>
                  <td>{index.serviceValue}</td>
                  <td>{index.rankValue}</td>
                  <td>{index.tradeValue}</td>

                    <td  data={index._id}   >  
                     <Link to='/employeeForm'>
                     <FaEdit onClick={()=>{
                      props.setFlag(1);
                      console.log(index._id)
                      props.setEmployeeID(index._id);
                      props.setfName(index.name);
                      props.setLastName(index.educaton); 
                      props.setServiceValue(index.serviceValue); 
                      props.setRankValue(index.rankValue); 
                      props.setTradeValue(index.tradeValue); 
                      props.setRFIDValue(index.rfIDValue);
                    }} id='icons'/> 
                    
                    </Link>
                    </td>  
                  

           </tr>

 })}

</table>
</div>
        </div>
    );
};
export default EmployeeCrud;