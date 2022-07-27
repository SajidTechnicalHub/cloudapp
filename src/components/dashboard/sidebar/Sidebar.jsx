import React, { useState } from 'react'
import { motion } from "framer-motion"
import { NavLink, Outlet } from 'react-router-dom'
import {
  FaHome, FaBars, FaPlus, FaMinus, FaCloudflare,
  FaDeezer, FaStore, FaAws, FaJsfiddle
}
  from 'react-icons/fa';
import { MdManageAccounts, MdOutlineInventory, MdOutlineSummarize, MdOutlineReportProblem } from 'react-icons/md';
import { SiMicrosoftazure } from 'react-icons/si';
import { FcDataConfiguration } from 'react-icons/fc';
import { CgClose } from 'react-icons/cg';
import TopBar from '../header/TopBar';
import useWindowDimensions from '../../useWindowDimensions';




const routes = [
  {
    path: '/dashboard_home',
    name: 'Cloud-Insights',
    icon: <FaCloudflare />
  },
  {
    path: '/overview',
    name: 'Overview',
    icon: <FaDeezer />
  },
  {
    path: '/inventory',
    name: 'Inventory',
    icon: <MdOutlineInventory />
  },
  {
    path: '/insights',
    name: 'Insights',
    icon: <FaJsfiddle />
  },
  {
    path: '/account-management',
    name: 'Account Management',
    icon: <MdManageAccounts />
  },
]
const Inventory = [
  {
    path: '/AWS',
    name: 'AWS',
    icon: <FaAws />
  },
  {
    path: '/Azure',
    name: 'Azure',
    icon: <SiMicrosoftazure />
  },

]
const Insights = [
  {
    path: '/summary',
    name: 'Summary',
    icon: <MdOutlineSummarize />
  },
  {
    path: '/configuration',
    name: 'Configuration',
    icon: <FcDataConfiguration />
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: <MdOutlineReportProblem />
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
            width: isOpen ? '230px' : '50px', transition: {
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
                      route.name == 'Inventory' ?
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
                          {Inventory.map((inventory, index) => {
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
                        route.name == 'Insights' ?
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
                            {Insights.map((insights, index) => {

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
            <TopBar />
            <div className='dashboard-pages'> <Outlet /></div>
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
            width: isOpen ? '230px' : '50px', transition: {
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
                      route.name == 'Inventory' ?
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
                          {Inventory.map((inventory, index) => {
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
                        route.name == 'Insights' ?
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
                            {Insights.map((insights, index) => {

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