import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import {useNavigate, Link} from "react-router-dom"
import emailImg from '../images/email.png'
import { AiOutlineClose } from 'react-icons/ai';
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [btnStatus,  setBtnStatus] = useState(true)

    const [user, setUser] = useState({
        email: '',
    })
    const InputEvent = (e) => {
        const { name, value } = e.target;
        setUser(() => {
            return { ...user, [name]: value }
        })

    }
    const SubmitEvent = (e) => {
        e.preventDefault()

        setBtnStatus(false) // check send email btn status

        setUser({
            email: '',
        })

        navigate('/cloudapp/registration/varification_code')

    }

    return (
        <>

            <div className="form-container">
                <div className="form-left-container">
                    <h1 className='form-right-heading'>Cloud Insights</h1>
                </div>
                <div className="form-right-container">
                < AiOutlineClose onClick={() => navigate(-1)} className='form-close-window-icon' />
                    <div className="signin-form-block">
                        <div className="form-top-container">
                            <img src={emailImg} className='form-logo-img' alt="" />
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
                                    placeholder='Email Your Address'
                                />

                            </div>
                            
                            <div className="form-submit-field ">
                                {btnStatus == true ?<button type='submit' className='form-submit-btn'>Sign In</button>:
                                <button type='submit' className='form-submit-btn-status'>Send Email</button>}
                            </div>

                        </form>
                        <div className='form-buttom-container'>
                            <div className='form-buttom-block'>
                                <div className='back-to-home'>
                                    <Link to="/cloudapp/registration/signin"><BiArrowBack />Back To Sign In</Link>
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