import React, { useState } from 'react'


const SignIn = () => {
  const [inputData, setInputData] = useState('')
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const InputEvent = (e) => {
    const { name, value } = e.target;
    setInput(() => {
      return { ...input, [name]: value }
    })
  }
  const SubmitEvent = (e) => {
    e.preventDefault()

    setInput({
      email: '',
      password: ''
    })



  }

  return (
    <>
      <div className='container-flue'>
        <div className="row">
          <div className="col-lg-6 signin-logo-container">
            <img src="./logo.png" className='signin-logo' alt="" />
          </div>
          <div className="col-lg-6 signin-form-container">
            <div className="signin-form-block">
              <span className='signin-form-heading'> Cloud Cloud</span>

              <form onSubmit={SubmitEvent} className=''>
                <div className="mb-2 orm-field ">
                  <label htmlFor="email" className="form-label">Email<span className='estaric'>*</span></label>
                  <input type="email"
                    name="eamil"
                    value={input.email}
                    onChange={InputEvent}
                    required="required"
                    placeholder='Email'
                  />

                </div>
                <div className="mb-2 form-field ">
                  <label htmlFor="password" className="form-label">Password<span className='estaric'>*</span></label>
                  <input type="password"
                    name="password"
                    value={input.password}
                    onChange={InputEvent}
                    required="required"
                    placeholder='Password'
                  />

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn