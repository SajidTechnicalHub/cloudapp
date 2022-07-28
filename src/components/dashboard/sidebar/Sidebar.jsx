import React, { useState } from 'react'
import { motion } from "framer-motion"
import { NavLink, Outlet } from 'react-router-dom'
import {FaGoogleDrive, FaBars, FaPlus, FaMinus, FaAws} from 'react-icons/fa';
import { MdOutlineManageAccounts, MdDashboard, MdOutlineInventory } from 'react-icons/md';
import { SiMicrosoftazure } from 'react-icons/si';
import { BsClouds } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { BiCloudUpload } from 'react-icons/bi';
import { TbReport } from 'react-icons/tb';
import TopBar from '../header/TopBar';
import useWindowDimensions from '../../useWindowDimensions';




const routes = [
  {
    path: '/overview',
    name: 'Dashboard',
    icon: <MdDashboard />
  },
  {
    path: '/account-management',
    name: 'Cloud Account Management',
    icon: <MdOutlineManageAccounts />
  },
  {
    path: '',
    name: 'Cloud Vendors',
    icon: <BsClouds />
  },
  {
    path: '',
    name: 'Cloud Insights',
    icon: <BiCloudUpload />
  },
  {
    path: '/signin',
    name: 'Sign In',
    icon: <BiCloudUpload />
  },
  
]
const CloudVender = [
  {
    path: '/Azure',
    name: 'Azure Inventory',
    icon: <SiMicrosoftazure />
  },
  {
    path: '/AWS',
    name: 'AWS Inventory',
    icon: <FaAws />
  },
  {
    path: '/GCP',
    name: 'GCP Inventory',
    icon: <FaGoogleDrive />
  },
  

]
const CloudInsights = [
  {
    path: '/summary',
    name: 'Summary',
    icon: <MdOutlineInventory />
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: <TbReport/>
  },

]
const mainWidthToggleHidden = {
  width: 'calc(100vw - 50px)',
}
const mainWidthToggleShow = {
  width: 'calc(100vw - 230px)',
}
const Sidebar = () => {
  const { height, width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(true)

// console.log(width)
  const [insightsToggle, setInsightsToggle] = useState(false)
  const [inventoryToggle, setInventoryToggle] = useState(false)

  const handleInsightsToggle = () => setInsightsToggle(!insightsToggle)
  const handleInventoryToggle = () => setInventoryToggle(!inventoryToggle)
  const toggle = () => setIsOpen(!isOpen)


  const ShowAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      }
    },
    show: {
      width: 'auto',
      opacity: 1,
      transition: {
        duration: 0.2,
      }
    }
  }

  //////////////Mobile View////////////////////
  const [mobileView, setMobileView] = useState(false)
  const [mobileWidth, setMobileWidth] = useState(width)

  const handleMobileView =()=> setMobileView(!mobileView)

  const mobileViewDashboar = {
    width: 'calc(100vw )',
  }
 
  //////////////Mobile View////////////////////

  return (
    <>
      {mobileWidth >= 700 ?
     
        <div className="main-container">

          <motion.div animate={{
            width: isOpen ? '250px' : '50px', transition: {
              duration: 0.5,
              type: 'spring',
              damping: 10,

            }
          }} className='sidebar'>

            <div className="top-section">
              {isOpen && <motion.img src='./logo.png' variants={ShowAnimation}
                initial='hidden'
                animate='show'
                esit='hidden'
                className='logo' alt=''></motion.img>}
              <div className="bars">
                <FaBars onClick={toggle} />
              </div>
            </div>
            <hr />
            <section className='routes'>
              {routes.map((route, index) => {
                return (
                  <React.Fragment key={index}>
                    {
                      route.name == 'Cloud Vendors' ?
                        <div>
                          <span className='sidebar-link '>
                            {isOpen && <div onClick={handleInventoryToggle} className="icon">{route.icon}</div>}
                            <div onClick={handleInventoryToggle} className='sidebar-link-dropdown'>
                              {isOpen && <motion.div variants={ShowAnimation}
                                initial='hidden'
                                animate='show'
                                esit='hidden'
                                className="link-text ">{route.name}</motion.div>
                              }
                              {inventoryToggle ? <FaMinus className='sidebar-link-dropdown-icon' /> :
                                <FaPlus className='sidebar-link-dropdown-icon' />
                              }
                            </div>
                          </span>
                          {CloudVender.map((inventory, index) => {
                            return (
                              <React.Fragment key={index}>
                                {inventoryToggle && <NavLink to={inventory.path} className='sidebar-link inventory'>
                                  <div className="icon">{inventory.icon}</div>
                                  {isOpen && <motion.div variants={ShowAnimation}
                                    initial='hidden'
                                    animate='show'
                                    esit='hidden'
                                    className="link-text">{inventory.name}</motion.div>}
                                </NavLink>}
                              </React.Fragment>
                            )
                          })}</div> :
                        route.name == 'Cloud Insights' ?
                          <div>
                            <span className='sidebar-link '>
                              {isOpen && <div onClick={handleInsightsToggle} className="icon">{route.icon}</div>}
                              <div onClick={handleInsightsToggle} className='sidebar-link-dropdown'>
                                {isOpen && <motion.div variants={ShowAnimation}
                                  initial='hidden'
                                  animate='show'
                                  esit='hidden'
                                  className="link-text ">{route.name}</motion.div>
                                }
                                {insightsToggle ? <FaMinus className='sidebar-link-dropdown-icon' /> :
                                  <FaPlus className='sidebar-link-dropdown-icon' />
                                }
                              </div>
                            </span>
                            {CloudInsights.map((insights, index) => {

                              return (
                                <React.Fragment key={index}>

                                  {insightsToggle && <NavLink to={insights.path} className='sidebar-link inventory'>
                                    <div className="icon">{insights.icon}</div>
                                    {isOpen && <motion.div variants={ShowAnimation}
                                      initial='hidden'
                                      animate='show'
                                      esit='hidden'
                                      className="link-text">{insights.name}</motion.div>}
                                  </NavLink>}
                                </React.Fragment>
                              )
                            })}</div> :

                          <NavLink to={route.path} className='sidebar-link '>
                            <div className="icon">{route.icon}</div>
                            {isOpen && <motion.div variants={ShowAnimation}
                              initial='hidden'
                              animate='show'
                              esit='hidden'
                              className="link-text">{route.name}</motion.div>}

                          </NavLink>
                    }
                  </React.Fragment>
                )
              })

              }
            </section>
          </motion.div>



          <main style={isOpen ? mainWidthToggleShow : mainWidthToggleHidden}>
            {/* <TopBar /> */}
             <Outlet />
          </main>

        </div> :

        /////////////// Disply on Mobile View///////////////////////
        <div className="mobile-main-container">

          <div className="mobile-top-section">
            {isOpen && <motion.img src='./logo.png' variants={ShowAnimation}
              initial='hidden'
              animate='show'
              esit='hidden'
              className='logo' alt=''></motion.img>}
            <div className="mobile-bars">
              {mobileView ?<CgClose  onClick={handleMobileView} />:
              <FaBars onClick={handleMobileView} />}
            </div>
          </div>
          <hr />
          {mobileView&&<motion.div animate={{
            width: isOpen ? '250px' : '50px', transition: {
              duration: 0.5,
              type: 'spring',
              damping: 10,

            }
          }} className='mobile-sidebar'>

            {/* <div className="mobile-top-section">
              {isOpen && <motion.img src='./logo.png' variants={ShowAnimation}
                initial='hidden'
                animate='show'
                esit='hidden'
                className='logo' alt=''></motion.img>}
              <div className="bars">
                <FaBars onClick={handleMobileView} />
              </div>
            </div>
            <hr /> */}
            <section className='routes'>
              {routes.map((route, index) => {
                return (
                  <React.Fragment key={index}>
                    {
                      route.name == 'Cloud Vendors' ?
                        <div>
                          <span className='sidebar-link '>
                            {isOpen && <div onClick={handleInventoryToggle} className="icon">{route.icon}</div>}
                            <div onClick={handleInventoryToggle} className='sidebar-link-dropdown'>
                              {isOpen && <motion.div variants={ShowAnimation}
                                initial='hidden'
                                animate='show'
                                esit='hidden'
                                className="link-text ">{route.name}</motion.div>
                              }
                              {inventoryToggle ? <FaMinus className='sidebar-link-dropdown-icon' /> :
                                <FaPlus className='sidebar-link-dropdown-icon' />
                              }
                            </div>
                          </span>
                          {CloudVender.map((inventory, index) => {
                            return (
                              <React.Fragment key={index}>
                                {inventoryToggle && <NavLink to={inventory.path} className='sidebar-link inventory'>
                                  <div className="icon">{inventory.icon}</div>
                                  {isOpen && <motion.div variants={ShowAnimation}
                                    initial='hidden'
                                    animate='show'
                                    esit='hidden'
                                    className="link-text">{inventory.name}</motion.div>}
                                </NavLink>}
                              </React.Fragment>
                            )
                          })}</div> :
                        route.name == 'Cloud Insights' ?
                          <div>
                            <span className='sidebar-link '>
                              {isOpen && <div onClick={handleInsightsToggle} className="icon">{route.icon}</div>}
                              <div onClick={handleInsightsToggle} className='sidebar-link-dropdown'>
                                {isOpen && <motion.div variants={ShowAnimation}
                                  initial='hidden'
                                  animate='show'
                                  esit='hidden'
                                  className="link-text ">{route.name}</motion.div>
                                }
                                {insightsToggle ? <FaMinus className='sidebar-link-dropdown-icon' /> :
                                  <FaPlus className='sidebar-link-dropdown-icon' />
                                }
                              </div>
                            </span>
                            {CloudInsights.map((insights, index) => {

                              return (
                                <React.Fragment key={index}>

                                  {insightsToggle && <NavLink to={insights.path} className='sidebar-link inventory'>
                                    <div className="icon">{insights.icon}</div>
                                    {isOpen && <motion.div variants={ShowAnimation}
                                      initial='hidden'
                                      animate='show'
                                      esit='hidden'
                                      className="link-text">{insights.name}</motion.div>}
                                  </NavLink>}
                                </React.Fragment>
                              )
                            })}</div> :

                          <NavLink to={route.path} className='sidebar-link '>
                            <div className="icon">{route.icon}</div>
                            {isOpen && <motion.div variants={ShowAnimation}
                              initial='hidden'
                              animate='show'
                              esit='hidden'
                              className="link-text">{route.name}</motion.div>}

                          </NavLink>
                    }
                  </React.Fragment>
                )
              })

              }
            </section>
          </motion.div>}

          <main style={mobileViewDashboar}>
            <TopBar />
            <div className='dashboard-pages'> <Outlet /></div>
          </main>

        </div>
        /////////////// Disply on Mobile View///////////////////////
      }

    </>
  )
}

export default Sidebar