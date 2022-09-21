import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { useNavigate } from "react-router-dom"
import lockImg from '../images/lock.jpg'
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react'
import { AppStateContext } from '../Context';
import { baseUrl } from '../dashboard/cloudVendors/azure/GetAzureServices';
import Loading from '../dashboard/cloudVendors/azure/Loading';
import CloudNoxLogo from '../images/CloudNoxLogo.png'

const UpdatePassword = () => {

    const {
        isLoading, setIsLoading,
        randomNumber, setRandomNumber,
        setoAuth
    } = useContext(AppStateContext)



    const navigate = useNavigate();
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordLength, setPasswordLength] = useState('')
    const [passwordInfo, setPasswordInfo] = useState(false)
    const [forgotPasswordUser, setForgotPasswordUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [user, setUser] = useState({
        password: '',
        confirm_password: ''
    })
    const InputEvent = (e) => {
        const { name, value } = e.target;
        setUser(() => {
            return { ...user, [name]: value }
        })

        if (user.password.length <= 1) {
            setPasswordInfo(true)
        }
    }
    const SubmitEvent = async (e) => {
        e.preventDefault()

        if (user.password == user.confirm_password) {
            setPasswordMessage('')
            // navigate('/cloudapp/registration/request_success')
        } else {
            setPasswordMessage('Password did not match!')
        }

        if (user.password.length >= 8) {
            setPasswordLength('')

        } else {
            setPasswordLength('Password must be contain atleast 8 characters.')
        }

        // if (user.password == user.confirm_password && user.password.length >= 8) {
        //     navigate('/cloudapp/registration/request_success')
        // }
        setIsLoading(true)
        try {
            const response = await fetch(`${baseUrl}/reset_password/update_password`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    password: user.password,
                    email: forgotPasswordUser.email
                }),
            })
            const data = await response.json()

            if (data.status == 201) {
                console.log(data)
                setIsLoading(false)
                navigate('/cloudapp/registration/request_success')

            } else if (data.status == 404) {
                setIsLoading(false)
            } else {
                setIsLoading(false)

            }


        }
        catch (error) {
            console.log(error)
            setIsLoading(false)
        }

    }

    return (
        <>

            <div className="form-container">
                <div className="form-left-container">
                    <img src={CloudNoxLogo} className='form-right-logo' alt="CloudNoxLogo" />
                </div>
                <div className="form-right-container">
                    < AiOutlineClose onClick={() => navigate(-1)} className='form-close-window-icon' />
                    <div className="signin-form-block">
                        <div className="form-top-container">
                            <img src={lockImg} className='form-logo-img' alt="" />
                            <br />
                            <span className='update-password-heading'> Update your password</span>
                            <span className='form-top-email-info'>Create a new password for your CLOUDNOX account. So, you can login to your account.</span>

                        </div>
                        {passwordInfo && <div className="password-info-container">
                            <AiOutlineClose onClick={(e) => setPasswordInfo(false)} className='password-info-close-icon' />
                            <span className="password-info-block">
                                <HiOutlineCheckCircle className='password-info-icon' />
                                <span className='password-info'>Should be atleast 8 character long.</span>
                            </span>
                            <span className="password-info-block">
                                <HiOutlineCheckCircle className='password-info-icon' />
                                <span className='password-info'>Should contain atleast one special character.</span>
                            </span>
                            <span className="password-info-block">
                                <HiOutlineCheckCircle className='password-info-icon' />
                                <span className='password-info'>Should contain atleast uppercase.</span>
                            </span>
                            <span className="password-info-block">
                                <HiOutlineCheckCircle className='password-info-icon' />
                                <span className='password-info'>Should contain atleast one number.</span>
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
                                    placeholder='Enter a new password'
                                />
                                <span className="password-message">
                                    {passwordLength}
                                </span>
                            </div>

                            <div className="input-field-block ">
                                <label htmlFor="confirm_password" className="input-field-label">Confirm Password<span className='estaric'>*</span></label>
                                <input type="password"
                                    name="confirm_password"
                                    value={user.confirm_password}
                                    onChange={InputEvent}
                                    required="required"
                                    placeholder='Confirm your new password'
                                />
                                <span className="password-message">
                                    {passwordMessage}
                                </span>
                            </div>
                            <div className="form-submit-field ">
                                <button type='submit' className='form-submit-btn'>Update Password</button>

                            </div>


                        </form>


                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdatePassword