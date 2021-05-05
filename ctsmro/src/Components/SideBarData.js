import React from 'react'
import {FaMale} from "react-icons/fa";
 import {FaLuggageCart} from 'react-icons/fa'
 import './SideBarData.css'
 import {Link} from 'react-router-dom'
function SideBarData(){
    const sideBarClickHandler=()=>{
        document.getElementById('mySidenav').style.width='0px';
        document.getElementById('main').style.marginLeft='0px';
        document.getElementById('crud').style.marginLeft='0px';
    }
    return(
        <div className='container'>
            <div className='row'>
                
            <Link to='/employee'>
            <div className='col-12' onClick={sideBarClickHandler}>
                 <FaMale className='data' />
                <span className='data'>Emplyees</span>
            </div>
            </Link>
            </div>
            <div className='row'>
            <Link to='/part' >   
            <div className='col-12'onClick={sideBarClickHandler}>
            <FaLuggageCart className='data'/>
            <span className='data'> Parts</span>
            </div>
            </Link>
            </div>

            <div className='row'>
            <Link to='/Issuance' >   
            <div className='col-12'onClick={sideBarClickHandler}>
            <FaLuggageCart className='data'/>
            <span className='data'>Issuance</span>
            </div>
            </Link>
            </div>

        </div>

    );
}; 
export default SideBarData;