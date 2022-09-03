import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, Link } from "react-router-dom"
import emailImg from '../images/email.png'
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react'
import { AppStateContext } from '../Context';
import { baseUrl } from '../dashboard/cloudVendors/azure/GetAzureServices';
import Loading from '../dashboard/cloudVendors/azure/Loading';
const ForgotPassword = () => {

    const { isLoading, setIsLoading, randomNumber,setoAuth } = useContext(AppStateContext)

    const navigate = useNavigate();
    const [btnStatus, setBtnStatus] = useState(true)
    const [varifyEmailMessage, setVarifyEmailMessage] = useState('')

    const [user, setUser] = useState({
        email: '',
    })
    const InputEvent = (e) => {
        const { name, value } = e.target;
        setUser(() => {
            return { ...user, [name]: value }
        })

    }
    const SubmitEvent = async (e) => {
        e.preventDefault()

        setBtnStatus(false) // check send email btn status
        setIsLoading(true)

        try{
            const response = await fetch(`${baseUrl}/reset_password/varify_email`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    email: user.email,
                }),
            })
            const data = await response.json()
            
            if (data.status == 201) {
                setIsLoading(false)
                navigate('/cloudapp/registration/varification_code')
                console.log(data)
            } else if (data.status == 404) {
                setIsLoading(false)
                setVarifyEmailMessage('Please enter your registed email address.')
            }else {
                setIsLoading(false)
                
            }
    

        }
        catch(error){
            console.log(error)
            setIsLoading(false)
            if (error == `SyntaxError: Unexpected token 'S', "Signature "... is not valid JSON`) {
                setoAuth(true)
                navigate('/cloudapp/registration/signin')
            }
        }
        

    }

    return (
        <>

            <div className="form-container">
                <div className="form-left-container">
                    <h1 className='form-right-heading'>Cloud Insights</h1>
                </div>
                <div className="form-right-container">
                    {isLoading == true ? <Loading /> : <></>}
                    < AiOutlineClose onClick={() => navigate(-1)} className='form-close-window-icon' />
                    <div className="signin-form-block">
                        <div className="form-top-container">
                            <img src={emailImg} className='form-logo-img' alt="" />
                            <span className="email-varify-message">{varifyEmailMessage}</span>
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
                                {btnStatus == true ? <button type='submit' className='form-submit-btn'>Sign In</button> :
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