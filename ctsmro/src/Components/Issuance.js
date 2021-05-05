import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './Isuance.css';
import {useHistory} from 'react-router-dom'
const Issuance = () => {
    const [partData,setPartData]=useState([]);
    const [inputValue,setInputValue]=useState([]);
    const [rfidData,setRfidData]=useState([]);
    const [EmployeeData,setEmployeeData]=useState([]);
    const dispPart=[];
    const history=useHistory();
    var temp;
    
    
    useEffect(()=>{
        axios.get('http://localhost:3001/partData').then(res=>{
       // console.log(res.data);
        setPartData(res.data);
       //console.log(partData);
       });

       axios.put('http://localhost:3001/rfid').then(res=>{
           console.log(res);
       })
       axios.get('http://localhost:3001/data').then(res=>{
        setEmployeeData(res.data);

       });
           
    },[]);
    const inputChangeHandle=(e)=>{
        setInputValue(e.target.value);
        if(e.target.value.length==10){

            partData.map((index,key)=>{
                
                   
                            if(index.rfIDValue==e.target.value)
                         {
                                


                                axios.post('http://localhost:3001/rfid',{
                                    partValue: index.partValue,
                                    partValueName:index.partValueName,
                                    locationValue:index.locationValue,
                                    locationCode:index.locationCode,
                                    quantity:index.quantity,
                                    rfIDValue:index.rfIDValue

                                }).then(res=>{
                                    setInputValue('');
                                    //console.log(res);
                                    axios.get('http://localhost:3001/rfid').then(res=>{
                                    console.log('data',res.data);
                                    setRfidData(res.data);
                           // setPartData(res.data);
                           //console.log(partData);
                           });
                    
                                });
                                console.log('partName',index.rfIDValue);
                                console.log(dispPart);
                         }
              
                         setInputValue('');
                
                
            })




           
            //console.log(inputValue);
        }
        
        
        
    
    
          
         
    }
  
    const handleIssuance=()=>{
        var optionId=document.getElementById('optioId').value;
        var issuanceId=document.getElementById('issuanceId').value;
        var id=document.getElementById('id').value;
        var date=document.getElementById('date').value;
        console.log(id);
        axios.post('http://localhost:3001/issuanceForm',{
           _id:id,
           user:optionId,
           issuanceNo:issuanceId,
           issuanceDate:date,
       }).then(res=>{
          rfidData.map(index=>{
               axios.post('http://localhost:3001/issuance',{
                rfidData:index,
                fkIssuance:id,
            });
            history.push('/part');
          });
           

       })

   
    }
    
    return (
        <div className='container-fluid' id='rfDta'>
            <div className='row'><h1>Issuance Form</h1></div>
            <form>
            <input type='hidden' value={Math.floor((Math.random() * 100) + 1)} id='id'></input>
            <input type='hidden' value={new Date()} id='date'></input>
           <div className='row'>
               
                   <div className='col-2'>
                       <span>Emplpyee Name</span>
                   </div>
                         <div className='col-2 '>
                   <select name="" id="">
                           {EmployeeData.map(index=>{
                               return <option value={index._id} id='optioId'>{index.name}</option>
                           })}
                       
                      
                    </select>
                   </div>


                   <div className='col-2 offset-3'>
                       <span>Issuance Number</span>
                   </div>
                   <div className='col-2 offset'>
                   <input type='text' className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder='Enter Issuance Number' value={Math.floor((Math.random() * 100) + 1)} readOnly id='issuanceId'></input>
                   </div>
               
           </div>
           </form>
        <div className='row'>
            <input type='text' className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder='Enter Code'  onChange={inputChangeHandle} value={inputValue} autoFocus></input>
        </div>
        <div className='row'>
    <table className="table table-bordered" id ='employeeTable' >
        <thead>
            <th>Part Number</th>
            <th>Part Name</th>
            <th>RF ID</th>
            <th>Location</th>
            <th>Location Code</th>
            <th>Quantity</th>
      </thead>
      {rfidData.map((index,key)=>{
          return <tr key={index.id}>
          <td>{index.partValue}</td>
          <td>{index.partValueName}</td>
          <td>{index.rfIDValue}</td>
          <td>{index.locationValue}</td>
          <td>{index.locationCode}</td>
          <td>{index.quantity}</td>
          </tr>
      })}
    </table>
      
            
        </div>
        <div className='row'id='employeeButton'>
                    <div className='col-lg-1 col-12' id='divB' >
                    <button id='employeeButtonSubmitt' onClick={handleIssuance}>Submit</button>
                    
                    </div>
                    </div>        
        </div>
    )
}

export default Issuance
