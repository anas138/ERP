import React,{useState} from'react'
import './NavBar.css'
import { FaBars } from "react-icons/fa";
import SideBarData from './SideBarData.js'
import EmployeeCrud from'./EmployeeCrud.js'
import EmployeeForm from './EmployeeForm.js'
import PartFormCrud from'./PartFormCrud.js'
import PartForm from './PartForm.js'
import Issuance from './Issuance.js'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function NavBar(){
    const [employeeData,setEmployeeData]=useState([]);
    const [editEmployee,setEditEmplyee] =useState();
    const [fName,setfName]=useState();
    const [lastName,setLastName]=useState();
    const [serviceValue,setServiceValue]=useState();
    const [rankValue,setRankValue]=useState();
    const [tradeValue,setTradeValue]=useState();
    const [rfIDValue,setRFIDValue]=useState();
    const [flag,setFlag]=useState();
    const [employeeID,setEmployeeID]=useState();
    const [partValue, setPartvalue]=useState();
    const [partValueName, setPartvalueName]=useState();
    const [locationValue, setLocationValue]=useState();
    const [locationCode, setLocationCode]=useState();
    const [pFlag,setPflag]=useState();
    const [partId,setpartId]=useState();
    //const [rfIDValue, setRFIDValue]=useState();
    const quantity=1;
    const openMenue=()=>{
        document.getElementById('mySidenav').style.width='250px';
        document.getElementById('main').style.marginLeft='250px';
        document.getElementById('crud').style.marginLeft='10px';
    }
    const closeNav=()=>{
        document.getElementById('mySidenav').style.width='0px';
        document.getElementById('main').style.marginLeft='0px';
        document.getElementById('crud').style.marginLeft='0px';
    }
    return(
        <Router>
        <div>
            <div id="mySidenav" className="sidenav">
  <a  className="closebtn" onClick={closeNav}>&times;</a>
  <SideBarData />
  
</div>




<div id="main" className='Container'>
<div className='row'>
<div className='col-12 col-md-2'>
            <span id='menue' onClick={openMenue}><FaBars/></span>
  <span>PAC</span>
</div>
<div className='col-12 offset-md-3 col-md-1'>
    Logistics
</div>
<div className='col-12 offset-md-4 col-md-2'>
    CTS USER
</div>
 </div>
</div>
<div className='container-fluid' id='crud'>
               <Route path='/employee' render={()=>(<EmployeeCrud employeeData={employeeData} setEditEmplyee={setEditEmplyee} setEmployeeData={setEmployeeData} setfName={setfName} setLastName={setLastName} setServiceValue={setServiceValue} setRankValue={setRankValue}
               setTradeValue={setTradeValue} setRFIDValue={setRFIDValue}
               setFlag={setFlag} setEmployeeID={setEmployeeID}/>)} />
    <Route path='/employeeForm' render={()=>(<EmployeeForm editEmployee={editEmployee} employeeData={employeeData} fName={fName} setfName={setfName} lastName={lastName} serviceValue={serviceValue}rankValue={rankValue} tradeValue={tradeValue}
                rfIDValue={rfIDValue} setEditEmplyee={setEditEmplyee} setEmployeeData={setEmployeeData} 
                setLastName={setLastName} setServiceValue={setServiceValue} setRankValue={setRankValue}
               setTradeValue={setTradeValue} setRFIDValue={setRFIDValue} flag={flag} employeeID={employeeID} />)}/>
    <Route path='/part'   render={()=>(<PartFormCrud setPartvalue={setPartvalue} setPartvalueName={setPartvalueName}
     setLocationValue={setLocationValue} setLocationCode={setLocationCode} setRFIDValue={setRFIDValue} setPflag={setPflag} setpartId={setpartId}  />)} />

    <Route path='/partForm' render={()=>(<PartForm setPartvalue={setPartvalue} setPartvalueName={setPartvalueName}
     setLocationValue={setLocationValue} setLocationCode={setLocationCode} setRFIDValue={setRFIDValue} 
     partValue={partValue} partValueName={partValueName} locationValue={locationValue} locationCode={locationCode} rfIDValue={rfIDValue} pFlag={pFlag} partId={partId}/>)} />

    <Route path='/Issuance' render={()=>(<Issuance/>)}/>
    
    
</div>
</div>
</Router>
    );
};
export default NavBar; 