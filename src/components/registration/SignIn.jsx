import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom"

const SignIn = () => {
  const defaultUserValues = {
    email: '',
    password: ''
  }
  const navigate = useNavigate();
  const [user, setUser] = useState(defaultUserValues)
  
  const InputEvent = (e) => {
    const { name, value } = e.target;
    setUser(() => {
      return { ...user, [name]: value }
    })
  }
  const SubmitEvent = (e) => {
    e.preventDefault()
    // useState(defaultUserValues)
    navigate('/forgot_password')

  }
  return (
    <>

      <div className="form-container">
        <div className="form-left-container">
          <h1 className='form-right-heading'>Cloud Insights</h1>
        </div>
        <div className="form-right-container">
          <div className="signin-form-block">
            <span className='form-heading'> Cloud Cloud</span>

            <form onSubmit={SubmitEvent} className='sign-in-form'>
              <div className="input-field-block ">
                <label htmlFor="email" className="input-field-label">Email<span className='estaric'>*</span></label>
                <input type="email"
                  name="email"
                  value={user.email}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Email Address'
                />

              </div>
              <div className="input-field-block ">
                <span className='password-forgot-label-container'>
                  <label htmlFor="password" className="input-field-label">Password<span className='estaric'>*</span>
                  </label>
                  <a href='#'>Forgot Password?</a>
                </span>
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
                <span className='checkbox-field-label'>Remember me</span>
              </div>
              <div className="form-submit-field ">
                <button type='submit' className='form-submit-btn'>Sign In</button>
              </div>

            </form>
            <div className='form-buttom-container'>
              <div className='form-buttom-block'>
                <span className='checkbox-field-label'>Don't have an Account?</span>
                <div className='sign-up-block'>
                  <Link to="/signup" className='a-underline'>Sign up and try it free</Link>
                  <a href="#"><BiArrowBack />Back To Home</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default SignIn