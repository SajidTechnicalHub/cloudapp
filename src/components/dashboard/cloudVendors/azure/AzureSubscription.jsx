import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import TopBar from '../../header/TopBar';
import { FaArrowsAltH } from 'react-icons/fa';
import { FiRefreshCcw, FiSearch } from 'react-icons/fi'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useContext } from 'react'
import { AppStateContext } from '../../../Context'
import Loading from './Loading';
import axios from 'axios';
import { baseUrl } from './GetAzureServices';
import subscriptionGroup from '../../../images/Subscriptions.png'


const AzureSubscription = () => {
  const {
    azureSubscription, setAzureSubscription,
    accountCredentials, setAzureCredentails,
    isoAuth, setoAuth,
    isLoading, setIsLoading,

  } = useContext(AppStateContext)

  const navigate = useNavigate();
  const [q, setQ] = useState("")
  const [pageSize, setPageSize] = useState(5);
  const [cloudAccount, setCloudAccount] = useState({
    cloud_account: 'All Azure Cloud Accounts'

  })

  ////////////////////////Delay Time//////////////////////
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const makeRequest = async () => {
    await delay(10000);
    getAzureSubscription()
    setoAuth(false)
    setIsLoading(false)
  }
  ////////////////////////////////////////////////////

  const InputEvent = (e) => {
    const { name, value } = e.target;
    setCloudAccount(() => {
      return { ...cloudAccount, [name]: value }
    })
  }


  const getAzureSubscription = async () => {

    const response = await axios.get(`${baseUrl}/azure_subscription/get_azure_subscription`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })

    setIsLoading(false)
    setAzureSubscription(response.data.azureSubscription)


  }

  const updateAzureSubscription = async () => {
    setIsLoading(true)
    const response = await fetch(`${baseUrl}/azure_subscription/index`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res)
        if (res.ok == true) {
          makeRequest()

        } else if (res.status == "401") {
          setoAuth(true)
          setIsLoading(false)
          navigate('/registration/signin')
        } else if (res.status == "404") {

          setIsLoading(false)

        }

      })

  }



  return (
    <>
      <TopBar subtitle='Azure / All Subscriptions' />
      <span className='Login-error-message'> {isoAuth === true ? 'You are Unauthorized! Please Login.' : ''}</span>
      <div className="azure-inventory-detail-container">
        <div className="azure-inventory-detail-all-vnets-block">
          <span className="azure-inventory-detail-all-vnets-block-heading">
            <span className="azure-inventory-detail-vnets-block">
              <img src={subscriptionGroup} alt="" className="azure-inventory-sub-groups-logo" />

              <span className='azure-inventory-detail-vnets-text'>All Subscriptions ({azureSubscription?.length})</span>
            </span>
          </span>
          <span className="azure-inventory-detail-all-vnets-block-dropdown">
            <select
              name="cloud_account"
              value={cloudAccount.cloud_account}
              onChange={InputEvent}
            >
              <option >All Azure Cloud Accounts</option>
              {accountCredentials?.map((val, index) => {
                return (
                  <React.Fragment key={val.id}>
                    <option >{val.account_name}</option>
                  </React.Fragment>
                )
              })}


            </select>
          </span>
        </div>
        <div className="search-container">
          <div className="search-block">
            <input type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Search' />
            <span className="search-icon"><FiSearch /></span>
          </div>
          <div className="referesh-container">
            <span className="referesh-block">
              <FiRefreshCcw onClick={() => updateAzureSubscription()} />
            </span>
          </div>
        </div>
        {isLoading === true ?
          <div className="loading">
            <Loading />
          </div> :
          <span>
            <div className="row g-5">
              {
                azureSubscription?.filter(
                  (row) =>
                    cloudAccount.cloud_account == 'All Azure Cloud Accounts' ?
                      row.subscription_name.toLowerCase().indexOf(q) > -1 ||
                      row.subscription_name.indexOf(q) > -1 :

                      (row.account_name.toLowerCase().indexOf(cloudAccount.cloud_account) > -1 ||
                        row.account_name.indexOf(cloudAccount.cloud_account) > -1) &&
                      (row.subscription_name.toLowerCase().indexOf(q) > -1 ||
                        row.subscription_name.indexOf(q) > -1)

                ).map((val, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="col-lg-6">
                        <div className="azure-subscription-block">
                          <div className="azure-subscription-title-block">
                            Subscription Name: {val.subscription_name}
                          </div>
                          <div className="azure-subscription-block-body">
                            <div className="azure-subscription-block-body-contents-container">
                              <span className="azure-subscription-name">Subscription ID: </span>
                              <span className="azure-subscription-state">{val.subscription_id}</span>
                            </div>

                            <div className="azure-subscription-block-body-contents-container">
                              <span className="azure-subscription-name">Tenant ID: </span>
                              <span className="azure-subscription-state">{val.tenant_id}</span>
                            </div>

                            <div className="azure-subscription-block-body-contents-container">
                              <span className="azure-subscription-name">Subscription State:</span>
                              <span className="azure-subscription-state">{val.subscription_state}</span>
                            </div>

                            <div className="azure-subscription-block-body-contents-container">
                              <span className="azure-subscription-name">Subscription Speed Limit:</span>
                              <span className="azure-subscription-state">{val.subscription_speed}</span>
                            </div>

                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  )
                })}


            </div>
          </span>
        }
      </div>
    </>
  )
}

export default AzureSubscription
