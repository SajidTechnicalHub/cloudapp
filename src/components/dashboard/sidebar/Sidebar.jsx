import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const Sidebar = () => {
  return (
    <>
    <div className="dashboard-container">
      <div className="sidebar-container">
        <h1>sidebar</h1>
      </div>
      <div className='dashboard-pages'>
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default Sidebar