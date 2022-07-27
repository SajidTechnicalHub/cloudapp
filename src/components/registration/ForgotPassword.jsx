import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';


const ForgotPassword = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const InputEvent = (e) => {
        const { name, value } = e.target;
        setUser(() => {
            return { ...user, [name]: value }
        })
    }
    const SubmitEvent = (e) => {
        e.preventDefault()

        setUser({
            email: '',
            password: ''
        })



    }

    return (
        <>

            <div className="form-container">
                <div className="form-left-container">
                    <h1 className='form-right-heading'>Cloud Insights</h1>
                </div>
                <div className="form-right-container">
                    <div className="signin-form-block">
                        <div className="form-top-container">
                            <img src="./email.png" className='form-logo-img' alt="" />
                            <span className='form-top-email-info'>Enter the email address to get the verification code to reset your Cloud Insights account password.</span>
                            <span className='form-top-code-info'>You'll receive an email at your email address that contains your 6-digit verification code.</span>
                        </div>
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
                            
                            <div className="form-submit-field ">
                                <button type='submit' className='form-submit-btn'>Sign In</button>
                            </div>

                        </form>
                        <div className='form-buttom-container'>
                            <div className='form-buttom-block'>
                                <div className='sign-up-block'>
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

export default ForgotPassword