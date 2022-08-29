import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useContext } from 'react'
import { AppStateContext } from '../Context';

const SignIn = () => {

  const {
    isLogin, setIsLogin,
    loading, setLoading,
    isoAuth, setoAuth,
    virtualNetwork, setVirtualNetwork,
    loadBalancer, setLoadBalancer,
    azureDnsZone, setAzureDnsZone,
    azureRouteTable, setAzureRouteTable,
    azureNatGateway, setAzureNatGateway,
    azureVirtualWans, setAzureVirtualWans,
    azurePublicIpAddress, setAzurePublicIpAddress,
    azureNetworkSecurityGroups, setAzureNetworkSecurityGroups,
    azureApplicationSecurityGroups, setAzureApplicationSecurityGroups,
    azureStorageAccount, setAzureStorageAccount,
    azureSupportsTickets, setAzureSupportsTickets,
    azureRecommendation, setAzureRecommendation,
    azureVirtualMachine, setAzureVirtualMachine,
    azureDisks, setAzureDisks,

    resourceGroup, setResourceGroup,
    accountCredentials, setAzureCredentails,
    azureSubscription, setAzureSubscription,

  } = useContext(AppStateContext)

  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: ''
  })


  // Get All Azure Account Details
  const getAccountDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/azure_accounts/azure_account_details", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      // const res = await response.json()
      console.log(response)
      setAzureCredentails(response.data.azureCredential)
      setAzureSubscription(response.data.azureSubscription)
      setResourceGroup(response.data.resourceGroup)

      setVirtualNetwork(response.data.virtualNetwork)
      setLoadBalancer(response.data.loadBalancer)
      setAzureDnsZone(response.data.azureDnsZone)
      setAzureRouteTable(response.data.azureRouteTable)
      setAzureNatGateway(response.data.azureNatGateway)
      setAzureVirtualWans(response.data.azureVirtualWans)
      setAzurePublicIpAddress(response.data.azurePublicIpAddress)

      setAzureApplicationSecurityGroups(response.data.azureApplicationSecurityGroups)
      setAzureNetworkSecurityGroups(response.data.azureNetworkSecurityGroups)
      setAzureStorageAccount(response.data.azureStorageAccount)
      setAzureSupportsTickets(response.data.azureSupportsTickets)
      setAzureRecommendation(response.data.azureRecommendation)
      setAzureVirtualMachine(response.data.azureVirtualMachine)
      setAzureDisks(response.data.azureDisks)
      setoAuth(false)
      setLoading(false)
    }
    catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

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
          setIsLogin(true)
          getAccountDetails()
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