import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TopBar from '../header/TopBar'
import Test from '../../images/Test'
import AWSLogo from '../../images/AWSLogo.png'
import GoogleCloudLogo from '../../images/GoogleCloudLogo.png'
import MicrosoftAzureLogo from '../../images/MicrosoftAzureLogo.png'
import { Link } from 'react-router-dom'
import { IoMdAlert } from 'react-icons/io';
import { RiAlertFill } from 'react-icons/ri';
import { BiCommentError } from 'react-icons/bi';
import { FaPlus, FaFileInvoice } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import GeographicMap from './GeographicMap'
import AlertInsights from './AlertInsights'
import NetworkInsights from './NetworkInsights'

import { useContext } from 'react'
import { AppStateContext } from '../../Context';
import Loading from '../cloudVendors/azure/Loading';
import axios from 'axios';
import { baseUrl } from '../cloudVendors/azure/GetAzureServices';


const WhatNeed = [
  {
    id: 1,
    path: '',
    logo: <IoMdAlert className="cloudnox-dashboard-need-logo" />,
    text: 'See current critical security alerts',
    path1: '',
    logo1: <FaFileInvoice className="cloudnox-dashboard-need-logo" />,
    text1: 'See an inventory of cloud resource'
  },
  {
    id: 2,
    path: '',
    logo: <AiFillDollarCircle className="cloudnox-dashboard-need-logo" />,
    text: 'Monitor your cloud spend',
    path1: '/dashboard/account-management',
    logo1: <FaPlus className="cloudnox-dashboard-need-logo add-account-margin " />,
    text1: 'Add a new account'
  }
]

const Overview = () => {
  const {
    resourceGroup, setResourceGroup,
    accountCredentials, setAzureCredentails,
    isoAuth, setoAuth,
    isLoading, setIsLoading,
    azureRegion, setAzureRegion

  } = useContext(AppStateContext)

  ////////////////////////Delay Time//////////////////////
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const makeRequest = async () => {
    await delay(10000);

    setoAuth(false)
    setIsLoading(false)
  }
  ////////////////////////////////////////////////////

  useEffect(() => {
    setIsLoading(true)
    makeRequest()
  }, [])


  return (
    <>
      <TopBar subtitle='Dashboard' />
      {isLoading === true ?
        <div className="loading">
          <Loading />
        </div> :

        <div className="azure-inventory-container">
          <div className="row dashboard-tabs-margin">
            <div className="col-lg-3 cloudnox-dashboard-tabs-margin-buttom">
              <div className="cloudnox-dashboard-tabs-block">
                <div className="cloudnox-dashboard-tabs-logo-heading-block">
                  <span className="cloudnox-dashboard-tabs-logo-block">
                    <img src={MicrosoftAzureLogo} alt="Logo" className="cloudnox-dashboard-tabs-azure-logo" />
                  </span>
                </div>
                <div className="cloudnox-dashboard-tabs-text-number-block">
                  <span className="cloudnox-dashboard-text">Cloud Accounts</span>
                  <span className="cloudnox-dashboard-number">2</span>
                </div>
                <div className="cloudnox-dashboard-tabs-text-number-block">
                  <span className="cloudnox-dashboard-text">Virtual Networks</span>
                  <span className="cloudnox-dashboard-number">1</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 cloudnox-dashboard-tabs-margin-buttom">
              <div className="cloudnox-dashboard-tabs-block">
                <div className="cloudnox-dashboard-tabs-logo-heading-block">
                  <span className="cloudnox-dashboard-tabs-logo-block">
                    <img src={AWSLogo} alt="Logo" className="cloudnox-dashboard-tabs-aws-logo" />
                  </span>
                </div>
                <div className="cloudnox-dashboard-tabs-text-number-block">
                  <span className="cloudnox-dashboard-text">Cloud Accounts</span>
                  <span className="cloudnox-dashboard-number">0</span>
                </div>
                <div className="cloudnox-dashboard-tabs-text-number-block">
                  <span className="cloudnox-dashboard-text">VPS Networks</span>
                  <span className="cloudnox-dashboard-number">0</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 cloudnox-dashboard-tabs-margin-buttom">
              <div className="cloudnox-dashboard-tabs-block">
                <div className="cloudnox-dashboard-tabs-logo-heading-block">
                  <span className="cloudnox-dashboard-tabs-logo-block">
                    <img src={GoogleCloudLogo} alt="Logo" className="cloudnox-dashboard-tabs-google-logo" />
                  </span>
                </div>
                <div className="cloudnox-dashboard-tabs-text-number-block">
                  <span className="cloudnox-dashboard-text">Cloud Accounts</span>
                  <span className="cloudnox-dashboard-number">0</span>
                </div>
                <div className="cloudnox-dashboard-tabs-text-number-block">
                  <span className="cloudnox-dashboard-text">VPS Networks</span>
                  <span className="cloudnox-dashboard-number">0</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 cloudnox-dashboard-tabs-margin-buttom">
              <div className="cloudnox-dashboard-add-cloud-account-block">
                <Link to='/dashboard/account-management'>
                  <span className='cloudnox-dashboard-add-cloud-account-text'>+ Add Cloud</span>
                </Link>

              </div>
            </div>
          </div>
          <div className="cloudnox-dashboard-alert-need-block">
            <div className="cloudnox-dashboard-alert-block">
              <div className="cloudnox-dashboard-alert-view-block">
                <span className="cloudnox-dashboard-alert-view-heading">
                  Alert Summary
                </span>
                <Link to='/'>
                  <span className="cloudnox-dashboard-alert-view-text">View All</span>
                </Link>
              </div>
              <div className="cloudnox-dashboard-alert-high-medium-low-block">
                <div className="cloudnox-dashboard-alert-high-block">
                  <span className="cloudnox-dashboard-alert-high-number">30</span>
                  <div className="cloudnox-dashboard-alert-high-logo-text-block">
                    <BiCommentError className="cloudnox-dashboard-alert-high-logo" />
                    <span className="cloudnox-dashboard-alert-high-text">High Alerts</span>
                  </div>
                </div>
                <div className="cloudnox-dashboard-alert-high-block">
                  <span className="cloudnox-dashboard-alert-medium-number">23</span>
                  <div className="cloudnox-dashboard-alert-high-logo-text-block">
                    <RiAlertFill className="cloudnox-dashboard-alert-medium-logo" />
                    <span className="cloudnox-dashboard-alert-high-text">Medium Alerts</span>
                  </div>
                </div>
                <div className="cloudnox-dashboard-alert-high-block">
                  <span className="cloudnox-dashboard-alert-low-number">12</span>
                  <div className="cloudnox-dashboard-alert-high-logo-text-block">
                    <IoMdAlert className="cloudnox-dashboard-alert-low-logo" />
                    <span className="cloudnox-dashboard-alert-high-text">Low Alerts</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cloudnox-dashboard-need-block">
              <div className="cloudnox-dashboard-alert-view-block">
                <span className="cloudnox-dashboard-alert-view-heading">
                  What Do You Need To Do?
                </span>
              </div>
              {WhatNeed.map((val, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="cloudnox-dashboard-need-content-block">
                      <div className="cloudnox-dashboard-need-content-logo-text-block">
                        <span className="">
                          {val.logo}
                        </span>
                        <Link to={val.path}>
                          <span className="cloudnox-dashboard-need-text">
                            {val.text}
                          </span>
                        </Link>
                      </div>

                      <div className="cloudnox-dashboard-need-content-logo-text-block">
                        <span className="">
                          {val.logo1}
                        </span>
                        <Link to={val.path1}>
                          <span className="cloudnox-dashboard-need-text">
                            {val.text1}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}

            </div>
          </div>

          <div className="cloudnox-dashboard-geographic-map">
            <span className="cloudnox-dashboard-geographic-map-titlebar">
              Cloud Geographical Distribution
            </span>
            <div className='cloudnox-dashboard-geographic-map-block'>
              <span className='cloudnox-dashboard-geographic-map-container'>

                <GeographicMap />
              </span>
              <span className='cloudnox-dashboard-geographic-map-cloud-acount-container'>
                <span className="cloudnox-dashboard-geographic-map-cloud-account-name-block">
                  <span className='cloudnox-dashboard-geographic-map-cloud-account-azure-checkbox'></span>
                  <span className='cloudnox-dashboard-geographic-map-cloud-account-name'>Azure </span>
                </span>
                <span className="cloudnox-dashboard-geographic-map-cloud-account-name-block">
                  <span className='cloudnox-dashboard-geographic-map-cloud-account-aws-checkbox'></span>
                  <span className='cloudnox-dashboard-geographic-map-cloud-account-name'>AWS </span>
                </span>

              </span>
            </div>

          </div>

          <div className="cloudnox-dashboard-insights-block">
            <div className="cloudnox-dashboard-alert-insights-block">
              <span className="cloudnox-dashboard-geographic-map-titlebar">
                Alert Insights
              </span>
              <AlertInsights />
            </div>
            <div className="cloudnox-dashboard-network-insights-block">
              <span className='cloudnox-dashboard-network-insights-title'>
                Your Environments Network Insights
              </span>
              <span className='cloudnox-dashboard-network-insights-radio'>
                <FormControl>

                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="aws" control={<Radio />} label="AWS" />
                    <FormControlLabel value="azure" control={<Radio />} label="Azure" />
                    <FormControlLabel value="gcp" control={<Radio />} label="GCP" />

                  </RadioGroup>
                </FormControl>
              </span>
              <NetworkInsights />
            </div>
          </div>

        </div>
      }
    </>

  )
}

export default Overview