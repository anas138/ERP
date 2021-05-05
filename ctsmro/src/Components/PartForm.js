import React,{useState} from 'react'
import './EmployeeForm.css'
import {Link,useHistory}from'react-router-dom'
import PartFormCrud from './PartFormCrud'
import axios from 'axios'
function PartForm(props) {
    const history=useHistory();

    const handlePart=(e)=>{
        props.setPartvalue(e.target.value);

    }
    const handlePartName=(e)=>{
        props.setPartvalueName(e.target.value);

    }
    const handleLocation=(e)=>{
        props.setLocationValue(e.target.value);

    }
    const handleLocationCode=(e)=>{
        props.setLocationCode(e.target.value);

    }
    const handlerfID=(e)=>{

        props.setRFIDValue(e.target.value);
    }
    const handlePartSubmit=()=>{
        if(props.pFlag==0)
        {
        axios.post('http://localhost:3001/part',{
        partValue:props.partValue,
        partValueName :props.partValueName, 
        locationValue:props.locationValue, 
        locationCode:props.locationCode, 
        rfIDValue:props.rfIDValue, 
        quantity:props.quantity
    }).then(res=>{
       console.log(res);
    });
    history.push('/part');
}
    }
    const handlePartUpdate=()=>{
        if(props.pFlag==1){
            axios.put('http://localhost:3001/partUpdate',{
                 partValue:props.partValue,
                 partValueName:props.partValueName,
                 locationValue:props.locationValue,
                 locationCode:props.locationCode,
                 rfIDValue:props.rfIDValue,
                 
                 partId:props.partId,
     

            });
            history.push('/part');
        }
    }
    return (
        <div className='container'>
            <form onSubmit={handlePartSubmit}>
            <div className='row'id='epHeading'>
            <div className='col-12 offset-2' >
              <span>Part Form</span>
              </div>
                </div>
            <div className='row'>
                <div className='col-2 offset-2'>
                    <span>Part Number</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter Part Number' required className="form-control" onChange={handlePart} value={props.partValue}></input>
                   <div className="invalid-feedback">
                        Validation Error
                  </div>
                   </div>
                <div className='col-2  '>

                    <span>Part Name</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter Part Name' required className="form-control" onChange={handlePartName} value={props.partValueName}></input> 
                </div>
            </div>
            <div className='row'>
                <div className='col-2 offset-2'>
                    <span>Location</span>
                    </div>
     <div className='col-3'>

     <div >
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleLocation} value={props.locationValue}/>
  <label className="form-check-label" for="flexRadioDefault1">
    Rack
  </label>
  </div>

  <div>
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked onChange={handleLocation} value={props.locationValue}/>
  <label className="form-check-label" for="flexRadioDefault2">
    Stack
  </label>
  </div>

                    
        </div>
                <div className='col-2  '>

                    <span>Location Code</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter Location Code' required className="form-control" onChange={handleLocationCode} value={props.locationCode}></input> 
                </div>
            </div>
            <div className='row'>
                <div className='col-2 offset-2'>
                    <span>Quantity</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='Enter Quantity' required className="form-control"  value='1' readOnly ></input> 
                   </div>
                <div className='col-2  '>

                    <span>RF ID</span>
                    </div>
                    <div className='col-3'>
                   <input placeholder='ENTER RFID' required type='number' className="form-control" onChange={handlerfID} value={props.rfIDValue}></input> 
                </div>
            </div>
            
            <div className='row'id='employeeButton'>
                <div className='col-lg-1 offset-2 col-12' id='divB' >
                   {props.pFlag==0?<button id='employeeButtonSubmitt'>Submit</button>:<button id='employeeButtonSubmitt'onClick={handlePartUpdate}>Update</button>} 
                    </div>
                    
                    <div className=       'col-md-3 col-12 offset-2 offset-lg-0 ' id='divB'>
                        <Link to='/part'>
                   <button id='employeeButtonCancel'>Cancel</button> 
                   </Link>
                   </div>
                
            </div>
            
            
            </form>
            
        </div>
    )
}

export default PartForm

