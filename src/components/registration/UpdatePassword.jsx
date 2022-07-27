import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';



const UpdatePassword = () => {

    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordInfo, setPasswordInfo] = useState(false)

    const [user, setUser] = useState({
        password: '',
        confirm_password: ''
    })
    const InputEvent = (e) => {
        const { name, value } = e.target;
        setUser(() => {
            return { ...user, [name]: value }
        })

        setPasswordInfo(true)
    }
    const SubmitEvent = (e) => {
        e.preventDefault()

        if (user.password == user.confirm_password) {
            setPasswordMessage('')
        } else {
            setPasswordMessage('Password did not match!')
        }


        setUser({
            password: '',
            confirm_password: ''
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
                            <img src="./lock.jpg" className='form-logo-img' alt="" />
                            <br />
                            <span className='update-password-heading'> Update your password</span>
                            <span className='form-top-email-info'>Create a new password for your Cloud insights account. So, you can login to your account.</span>

                        </div>
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
                                <label htmlFor="password" className="input-field-label">Password<span className='estaric'>*</span></label>
                                <input type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={InputEvent}
                                    required="required"
                                    placeholder='Password'
                                />

                            </div>
                            <div className="input-field-block ">
                                <label htmlFor="confirm_password" className="input-field-label">Confirm Password<span className='estaric'>*</span></label>
                                <input type="confirm_password"
                                    name="confirm_password"
                                    value={user.confirm_password}
                                    onChange={InputEvent}
                                    required="required"
                                    placeholder='Re-Type Password'
                                />
                                <span className="password-message">
                                    {passwordMessage}
                                </span>
                            </div>
                            <div className="form-submit-field ">
                                <button type='submit' className='form-submit-btn'>Sign In</button>

                            </div>


                        </form>


                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdatePassword