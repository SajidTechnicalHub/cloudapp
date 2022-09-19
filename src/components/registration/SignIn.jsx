import React, { useState, useEffect } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useContext } from 'react'
import { AppStateContext } from '../Context';
import { baseUrl } from '../dashboard/cloudVendors/azure/GetAzureServices';
import Loading from '../dashboard/cloudVendors/azure/Loading';
import { getTimeInMinute } from './GetTime';


const SignIn = () => {

  const {
    isLogin, setIsLogin,
    isLoading, setIsLoading,
    isoAuth, setoAuth,
    forgotPasswordUser, setForgotPasswordUser,
    randomNumber, setRandomNumber,
    randomNumberTimeInMinutes, setRandomNumberTimeInMinutes,
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

  // setIsLoading(false)

  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: ''
  })


  // Get All Azure Account Details
  const getAccountDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/azure_accounts/azure_account_details`, {
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

    }
    catch (error) {
      console.log(error);

    }
  }

  const updateAzureAccounts = () => {



    const request1 = axios.get(`${baseUrl}/azure_resource_groups/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request2 = axios.get(`${baseUrl}/azure_subscription/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request3 = axios.get(`${baseUrl}/azure_recommendations/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request4 = axios.get(`${baseUrl}/azure_supports_tickets/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request5 = axios.get(`${baseUrl}/azure_recommendations/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request6 = axios.get(`${baseUrl}/azure_application_security_groups/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request7 = axios.get(`${baseUrl}/azure_storage_accunt/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request8 = axios.get(`${baseUrl}/azure_application_security_groups/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request9 = axios.get(`${baseUrl}/azure_network_security_groups/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request10 = axios.get(`${baseUrl}/azure_public_ip_address/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request11 = axios.get(`${baseUrl}/azure_virtual_wans/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request12 = axios.get(`${baseUrl}/azure_nat_gateway/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request13 = axios.get(`${baseUrl}/azure_route_tables/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request14 = axios.get(`${baseUrl}/azure_dns_zone/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request15 = axios.get(`${baseUrl}/azure_virtual_machine/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request16 = axios.get(`${baseUrl}/azure_load_balancer/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });
    const request17 = axios.get(`${baseUrl}/azure_disks/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    });


    axios.all([request1, request2, request3, request4, request5, request6, request7,
      request8, request9, request10, request11, request12, request13, request14, request15,
      request16, request17])

      .then(axios.spread((res) => {
        console.log(res[0])
        console.log(res[1])
        console.log(res[2])
        console.log(res[3])
        console.log(res[4])
        console.log(res[6])
        console.log(res[7])
        console.log(res[8])
        console.log(res[9])
        console.log(res[10])
        console.log(res[11])
        console.log(res[12])
        console.log(res[13])
        console.log(res[14])
        console.log(res[15])
        console.log(res[16])
        console.log(res[17])

      }))

      .catch((err) => console.log(err));


  }

  const InputEvent = (e) => {
    const { name, value } = e.target;
    setUser(() => {
      return { ...user, [name]: value }
    })
  }
  const SubmitEvent = (e) => {
    e.preventDefault()

    setIsLoading(true)
    fetch(`${baseUrl}/login`, {
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
          setIsLoading(false)

          // updateAzureAccounts()
          // getAccountDetails()
          setForgotPasswordUser(res.data)
          setRandomNumberTimeInMinutes(getTimeInMinute())
          navigate('/cloudapp/registration/signin_varification_code')

          return res.json();

        } else {
          setLoginMessage('Invalid Email Or Password')
          setIsLoading(false)
          return res.text().then((text) => Promise.reject(text));
        }
      })
      .then((response) => setRandomNumber(response.randNumber))
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
          {isLoading == true ? <Loading /> : <></>}
          <div className="signin-form-block">
            <span className='form-heading'> Cloud Cloud</span>
            <span className='Login-error-message'> {isoAuth == true ? 'Your are session expired! Please login.' : ''}</span>
            <span className='Login-error-message'>{loginMessage}</span>
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
                  <Link to='/cloudapp/registration/forgot_password'>Forgot Password?</Link>
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
                  <Link to="/cloudapp/registration/signup" className='a-underline'>Sign up and try it free</Link>
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