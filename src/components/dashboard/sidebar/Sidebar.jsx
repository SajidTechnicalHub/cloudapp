import React, {useState} from 'react'
import { motion } from "framer-motion"
import { Link, Outlet } from 'react-router-dom'
import { FaHome, FaBars } from 'react-icons/fa';


const routes = [
  {
    path:'/',
    name:'Home',
    icon:<FaHome/>
  },
  {
    path:'/',
    name:'Dashboard',
    icon:<FaHome/>
  },{
    path:'/signin',
    name:'Sign In',
    icon:<FaHome/>
  },{
    path:'/',
    name:'Home',
    icon:<FaHome/>
  },
]
const mainWidth ={
  width: 'calc(100vw - 250px)',
}

const Sidebar = () => {
 const [isOpen, setIsOpen] = useState(true)

 const toggle = ()=>setIsOpen(!isOpen)
  

 const ShowAnimation ={
  hidden:{
    width:0,
    opacity: 0,
    transition: {
      duration: 0.5,
    }
  },
  show:{
    width:'auto',
    opacity: 1,
    transition: {
      duration: 0.2,
    }
  }
 }

  return (
    <>
      <div className="main-container">
        
        <motion.div animate={{width: isOpen ? '230px' : '40px', transition:{
          duration:0.5,
          type:'spring',
          damping:10,

        }}} className='sidebar'>

          <div className="top-section">
            {isOpen &&<motion.img src='./logo.png' variants={ShowAnimation}
                    initial='hidden'
                    animate='show'
                    esit='hidden'
                    className='logo' alt=''></motion.img>}
            <div className="bars">
              <FaBars onClick={toggle}/>
            </div>
          </div>
        <hr/>
          <section className='routes'>
           { routes.map((route, index)=>{
              return(
                <React.Fragment key={index}>
                <Link to={route.path} className='sidebar-link '>
                  <div className="icon">{route.icon}</div>
                  { isOpen && <motion.div variants={ShowAnimation}
                    initial='hidden'
                    animate='show'
                    esit='hidden'
                  className="link-text">{route.name}</motion.div>}
                </Link>
                </React.Fragment>
              )
            })

          }
          </section>
        </motion.div>
        <main><Outlet/></main>
      </div>
      
   
    </>
  )
}

export default Sidebar