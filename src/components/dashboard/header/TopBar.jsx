import React from 'react'
import {BiHelpCircle} from 'react-icons/bi';
import {GiInsectJaws} from 'react-icons/gi';
import {FaAdversal} from 'react-icons/fa';



const TopBar = () => {
  return (
    <>
    <div className='topbar-container'>
        <div className="topbar-heading">
            <span className="topbar-heading-text">
                Cloud-Insights Inventory <span className='topbar-subheading-text'> / Access Control Lists</span>
            </span>

        </div>
        <div className="topbar-icons-block">
            <GiInsectJaws className='topbar-icons'/>
            <BiHelpCircle className='topbar-icons'/>
            <FaAdversal className='topbar-icons'/>

        </div>
    </div>
    <hr />
    </>  
  )
}

export default TopBar