import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
// import { useContext } from 'react'
// import { AppStateContext } from '../../Context'

const SignIn = () => {

  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  //  const {isLogin, setIsLogin} = useContext(AppStateContext)
  
  const InputEvent = (e) => {
    const { name, value } = e.target;
    setUser(() => {
      return { ...user, [name]: value }
    })
  }
  const SubmitEvent = (e) => {
    e.preventDefault()
   

      fetch("http://localhost:3000/api/v1/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          user: {
            email: user.email,
            password: user.password,
          },
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log(res.headers.get("Authorization"));
            localStorage.setItem("token", res.headers.get("Authorization"));
            // setIsLogin(res.data)
            navigate('/cloudapp/overview')
            
            return res.json();

          } else {
            return res.text().then((text) => Promise.reject(text));
          }
        })
        .then((json) => console.dir(json))
        .catch((err) => console.error(err));

  



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
            
            <span>{loginMessage}</span>
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
                  <Link to='/forgot_password'>Forgot Password?</Link>
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