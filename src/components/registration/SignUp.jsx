import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { Link, useNavigate } from "react-router-dom"


const SignUp = () => {
  const navigate = useNavigate();
  const [passwordInfo, setPasswordInfo] = useState(false)

  const [user, setUser] = useState({
    fname: '',
    lname: '',
    company_name: '',
    company_email: '',
    password: '',
    lname: ''
  })
  const InputEvent = (e) => {
    const { name, value } = e.target;
    setUser(() => {
      return { ...user, [name]: value }
    })

    if(user.password == ''){
      setPasswordInfo(false)
    }else{
      setPasswordInfo(true)
    }
    
  }
  const SubmitEvent = (e) => {
    e.preventDefault()


    setUser({
      fname: '',
      lname: '',
      company_name: '',
      company_email: '',
      password: '',
      lname: ''
    })

    // navigate('/request_success')

  }

  return (
    <>

      <div className="form-container signup-container">
        <div className="form-left-container">
          <h1 className='form-right-heading'>Cloud Insights</h1>
        </div>
        <div className="form-right-container">
          <div className="signin-form-block">
            <span className='form-heading'> Cloud Cloud Cloud</span>
            {passwordInfo && <div className="password-info-container">
              <span className="password-info-block">
                <HiOutlineCheckCircle />
                <span className='password-info'>Shoudl be atleast 8 character long.</span>
              </span>
              <span className="password-info-block">
                <HiOutlineCheckCircle />
                <span className='password-info'>Should contain atleast one special character.</span>
              </span>
              <span className="password-info-block">
                <HiOutlineCheckCircle />
                <span className='password-info'>Shoudl contain atleast uppercase.</span>
              </span>
              <span className="password-info-block">
                <HiOutlineCheckCircle />
                <span className='password-info'>Shoudl contain atleast one number.</span>
              </span>
            </div>}
            <form onSubmit={SubmitEvent} className='sign-in-form'>

              <div className="input-field-block ">
                <label htmlFor="fname" className="input-field-label">Fist Name<span className='estaric'>*</span></label>
                <input type="text"
                  name="fname"
                  value={user.fname}
                  onChange={InputEvent}
                  required="required"
                  placeholder='First Name'
                />

              </div>

              <div className="input-field-block ">
                <label htmlFor="lname" className="input-field-label">Last Name<span className='estaric'>*</span></label>
                <input type="text"
                  name="lname"
                  value={user.lname}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Last Name'
                />

              </div>
              <div className="input-field-block ">
                <label htmlFor="company_name" className="input-field-label">Company Name<span className='estaric'>*</span></label>
                <input typext="text"
                  name="company_name"
                  value={user.company_name}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Company Name'
                />

              </div>
              <div className="input-field-block ">
                <label htmlFor="company_email" className="input-field-label">Company Email<span className='estaric'>*</span></label>
                <input typext="email"
                  name="company_email"
                  value={user.company_email}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Company Email'
                />

              </div>
             

              <div className="input-field-block ">
                <label htmlFor="password" className="input-field-label">Password<span className='estaric'>*</span></label>
                <input type="password"
                  name="password"
                  value={user.password}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Password'
                />

              </div>
              <div className='checkbox-field-block'>
                <input type="checkbox" className='checkbox-input-field' />
                <span className='form-privacy-policy'>
                  <span>I've read agree to the </span> 
                  <Link to='#' className='a-underline a-color'>Cloud Insights Privacy Policy</Link>
                    <span> lanch and the </span>  
                    <Link to='#' className='a-underline a-color'>Cloud Insights End User Agreement</Link>
                    <span> lanch.</span>  
                  </span>
              </div>
              <div className="form-submit-field ">
                <button type='submit' className='form-submit-btn'>Sign Up</button>

              </div>


            </form>


          </div>
        </div>
      </div>

    </>
  )
}

export default SignUp