import React,{useEffect,useState} from 'react'
import './EmployeeCrud.css'
import {FaPlusSquare,FaEdit} from'react-icons/fa'
import {Link,useHistory} from 'react-router-dom'
import axios from'axios';

function PartFormCrud(props){
    const [partData,setPartData]=useState([]);
    const [search,setSearch]=useState('');
    const history=useHistory(); 
    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }
useEffect(()=>{
  axios.get('http://localhost:3001/partData').then(res=>{
      setPartData(res.data);
      console.log(partData);
  });
},[]);
    return(
        <div  className='container'>
        
    <div className='row offset-2 '>
    <div className='col' id='add'>
        <Link to='/partForm'>
        <FaPlusSquare onClick={()=>
        {
            props.setPflag(0);
            props.setPartvalue();
            props.setPartvalueName();
            props.setRFIDValue();
            props.setLocationValue();
            props.setLocationCode();
        }}  id='icons'/>
        </Link>
        </div>
        <div className='col offset-8'>
      <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" onChange={handleSearch}
      value={search}/>
    </div>   

    <table className="table table-bordered" id ='employeeTable'>
  <thead>
      <th>Part Number</th>
      <th>Part Name</th>
      <th>RF ID</th>
      <th>Location</th>
      <th>Location Code</th>
      <th>Quantity</th>
      <th>Edit</th>
  </thead>
  {partData.filter(val=>{if(search==''){
      return val;
  }else if(search.toLowerCase()==val.partValue.toLowerCase() || search.toLowerCase()==val.rfIDValue.toLowerCase())
  {return val;}
}).map((index,key)=>{
      
return <tr key={index.id}>
           <td>{index.partValue}</td>
           <td>{index.partValueName}</td>
           <td>{index.rfIDValue}</td>
           <td>{index.locationValue}</td>
           <td>{index.locationCode}</td>
           <td>{index.quantity}</td>
           
            <FaEdit onClick={()=>{
                props.setPflag(1);
              props.setpartId(index._id)
              props.setPartvalue(index.partValue);
              props.setPartvalueName(index.partValueName);
              props.setRFIDValue(index.rfIDValue);
              props.setLocationValue(index.locationValue);
              props.setLocationCode(index.locationCode);
              history.push('/partForm')
              

            }} id='icons'/>
            
        
      </tr>
      
  })}

</table>
</div>
        </div>
    );
};
export default PartFormCrud;