import React from 'react'
import {BiHelpCircle, BiSupport} from 'react-icons/bi';
import {GiInsectJaws} from 'react-icons/gi';
import {FaAdversal} from 'react-icons/fa';




const TopBar = (props) => {
  return (
    <>
    <div className='topbar-container'>
        <div className="topbar-heading">
            <span className="topbar-heading-text">
                Cloud Insights: {props.subtitle}
            </span>

        </div>
        <div className="topbar-icons-block">
            <BiSupport className='topbar-icons-3'/>
            <BiHelpCircle className='topbar-icons-2'/>
            <span className="topbar-icon-1">
              <span className="topbar-icon-text">AS</span>
            </span>

        </div>
    </div>
    <hr className='topbar-line' />
    </>  
  )
}

export default TopBar