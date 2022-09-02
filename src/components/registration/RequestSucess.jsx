import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import {useNavigate} from "react-router-dom"
import successImg from '../images/success-icon.png'
const RequestSuccess = () => {
    const navigate = useNavigate();
    const SubmitEvent = (e) => {
        navigate('/cloudapp/registration/signin')
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
                            <img src={successImg} className='form-logo-sucess' alt="" />
                            <span className='request-submitted' >Request Submitted Successfully</span>
                            <span className='form-top-code-info'>Your password has been updated successfully.</span>
                        </div>

                        <div className="form-submit-field ">
                            <button type='submit' onClick={SubmitEvent} className='form-submit-btn'>Back to Sign In</button>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default RequestSuccess