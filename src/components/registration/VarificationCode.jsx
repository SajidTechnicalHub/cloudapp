import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from "react-router-dom"
import lockImg from '../images/lock.jpg'
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react'
import { AppStateContext } from '../Context';
import { baseUrl } from '../dashboard/cloudVendors/azure/GetAzureServices';
import Loading from '../dashboard/cloudVendors/azure/Loading';
import { getTimeInMinute } from './GetTime';

const VarificationCode = () => {

    const {
        isLoading, setIsLoading,
        randomNumber, setRandomNumber,
        randomNumberTimeInMinutes, setRandomNumberTimeInMinutes,
        setoAuth,
    } = useContext(AppStateContext)
    const [varifyCodeMessage, setVarifyCodeMessage] = useState('')

    const navigate = useNavigate();
    const [btnStatus, setBtnStatus] = useState(false)

    const [user, setUser] = useState({
        code: '',
    })
    const InputEvent = (e) => {
        const { name, value } = e.target;
        setUser(() => {
            return { ...user, [name]: value }
        })

        if (user.code.length >= 5) {
            setBtnStatus(true)
        } else {
            setBtnStatus(false)
        }


    }

        

    const SubmitEvent = (e) => {
        e.preventDefault()

        console.log(randomNumber)
        
        if (user.code == randomNumber) {
            const currentTime = getTimeInMinute()
            if (randomNumberTimeInMinutes <= currentTime) {
                navigate('/cloudapp/registration/update_password')
            } else {
                setVarifyCodeMessage('Your Pin Code expired!')
            }
        } else {
            setVarifyCodeMessage('Your entered code did not match!')
        }
    }
    const resendPinCode = async ()=>{
        console.log('resend')
        try{
            const response = await fetch(`${baseUrl}/reset_password/resend_varification_code`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                
            })
            const data = await response.json()
            
            if (data.status == 201) {
                console.log(data)
                setIsLoading(false)
                setRandomNumber(data.randNumber)
                setRandomNumberTimeInMinutes(getTimeInMinute())
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
                            <img src={lockImg} className='form-logo-img' alt="" />
                            <br />
                            <span className="email-varify-message">{varifyCodeMessage}</span>
                            <span className='form-top-email-info'>Enter the verification code to reset your Cloud Insights account password.</span>
                            <span className='form-top-code-info'>You'll receive an email that contains your 6-digit verification code.</span>
                        </div>
                        <form onSubmit={SubmitEvent} className='sign-in-form'>
                            <div className="input-field-block ">
                                <label htmlFor="code" className="input-field-label">Varification Code<span className='estaric'>*</span></label>
                                <input type="code"
                                    name="code"
                                    value={user.code}
                                    onChange={InputEvent}
                                    onKeyUp={InputEvent}
                                    required="required"
                                    autoComplete="off"
                                    placeholder='Enter Varification Code'
                                />

                            </div>

                            <div className="form-submit-field ">
                                {btnStatus == true ? <button type='submit' className='code-varify-btn'>Sign In</button> :
                                    <button disabled type='submit' className='code-unvarify-btn'>Verify</button>}
                            </div>


                        </form>
                        <div className='form-buttom-container'>
                            <div className='form-buttom-block' style={{ marginTop: '0px' }}>
                                <a href="#" className='a-underline' onClick={e => resendPinCode()}>Didn't received it? Resend Code</a>
                            </div>
                            <div className='form-buttom-block'>
                                <div className='back-to-home'>
                                    <a href="/cloudapp/registration/signin"><BiArrowBack />Back To Sign In</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default VarificationCode