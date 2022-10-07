import React from 'react'
import TopBar from '../header/TopBar'
import Test from '../../images/Test'
import AWSLogo from '../../images/AWSLogo.png'
import GoogleCloudLogo from '../../images/GoogleCloudLogo.png'
import MicrosoftAzureLogo from '../../images/MicrosoftAzureLogo.png'
import { Link } from 'react-router-dom'
import { IoMdAlert } from 'react-icons/io';
import { RiAlertFill } from 'react-icons/ri';
import { BiCommentError } from 'react-icons/bi';



const Overview = () => {


  return (
    <>
      <TopBar subtitle='Dashboard' />
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
            <div className="cloudnox-dashboard-need-content-block">
              <div className="cloudnox-dashboard-need-content-logo-text-block">

                <span className="">
                  <IoMdAlert className="cloudnox-dashboard-need-logo" />
                </span>
                <Link to=''>
                  <span className="cloudnox-dashboard-need-text">
                    See current critical security alerts
                  </span>
                </Link>
              </div>

              <div className="cloudnox-dashboard-need-content-logo-text-block">

                <span className="">
                  <IoMdAlert className="cloudnox-dashboard-need-logo" />
                </span>
                <Link to=''>
                  <span className="cloudnox-dashboard-need-text">
                    See current critical security alerts
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Overview