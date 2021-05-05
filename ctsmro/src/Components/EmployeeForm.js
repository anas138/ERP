import React,{useState,useEffect} from 'react'
import './EmployeeForm.css'
import {Link,useHistory}from'react-router-dom'
import axios from 'axios';
function EmployeeForm(props) {
   const history=useHistory();
    const [imageValue,setImageValue]=useState();
    //const [employeeData,setEmployeeData]=useState([]);
   
    const handleInputChange=(e)=>{
        props.setfName(e.target.value)
        //setFirstName(e.target.value);
        // console.log(firstName);
    }
    const handleLastChange=(e)=>{
        
        props.setLastName(e.target.value);
         //console.log(firstName);
    }
    const handleServiceNumber=(e)=>{
          props. setServiceValue(e.target.value);
    }
    const handleRank=(e)=>{
        props.setRankValue(e.target.value);
    }
    const handleTrade=(e)=>{
        props.setTradeValue(e.target.value);

    }
    const handleRFID=(e)=>{
        props.setRFIDValue(e.target.value);
    }
    const handleImage=(e)=>{
        setImageValue(e.target.files[0]);
    }


    const handleClick=()=>{ 
        if(props.flag==0)
        {
    axios.post('http://localhost:3001/postdata',{
        firstName:props.fName,
        lastName:props.lastName,
        serviceValue:props.serviceValue,
        rankValue:props.rankValue,
        tradeValue:props.tradeValue,
        rfIDValue:props.rfIDValue
    }).then(res=>{
        console.log(res);
});


     
}
 
    
}

const updateHandle=()=>{
    console.log('anas');
    if(props.flag==1)
    {
            axios.put('http://localhost:3001/updateEmployee',{
            employeeID:props.employeeID,
            firstName:props.fName,
            lastName:props.lastName,
            serviceValue:props.serviceValue,
            rankValue:props.rankValue,
            tradeValue:props.tradeValue,
            rfIDValue:props.rfIDValue
        });
      history.push('/employee');
        
    }
}
    
    return (

        <div className='container'>
            <form  onSubmit={handleClick}>
            <div className='row'id='epHeading'>
            <div className='col-12 offset-2' >
              <span>Employee Form</span>
              </div>
                </div>
            <div className='row'>
                <div className='col-2 offset-2'>
                    <span>First Name</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter First Name' required className="form-control" onChange={handleInputChange} value={props.fName}></input>
                   <div className="invalid-feedback">
                        Validation Error
                  </div>
                   </div>
                <div className='col-2  '>

                    <span>Last Name</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter Last Name' required className="form-control" onChange={handleLastChange} value={props.lastName}></input> 
                </div>
            </div>
            <div className='row'>
                <div className='col-2 offset-2'>
                    <span>Service Number</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter Service Number'  className="form-control" onChange={handleServiceNumber} value={props.serviceValue}></input> 
                   </div>
                <div className='col-2  '>

                    <span>Rank</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter Rank'  className="form-control" onChange={handleRank} value={props.rankValue}></input> 
                </div>
            </div>
            <div className='row'>
                <div className='col-2 offset-2'>
                    <span>Trade</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter Trade'  className="form-control" onChange={handleTrade} value={props.tradeValue}></input> 
                   </div>
                <div className='col-2  '>

                    <span>RF ID</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='ENTER RFID'  type='number' className="form-control" onChange={handleRFID} value={props.rfIDValue}></input> 
                </div>
            </div>
            <div className='row'>
                <div className='col-2 offset-2'>
                    <span>Pick the Image</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Pick Image' type='file' onChange={handleImage} ></input> 
                   </div>
                
            </div>
            <div className='row'id='employeeButton'>
                <div className='col-lg-1 offset-2 col-12' id='divB' >
                    {props.flag==0?<button id='employeeButtonSubmitt'>Submit</button>:<button id='employeeButtonSubmitt' onClick={updateHandle}>Update</button>}
                    
                    </div>
                    
                    <div className=       'col-md-3 col-12 offset-2 offset-lg-0 ' id='divB'>
                        <Link to='/employee'>
                   <button id='employeeButtonCancel'>Cancel</button> 
                   </Link>
                   </div>
                
            </div>
                     
            
            </form>
             
        </div>
    )
}

export default EmployeeForm

