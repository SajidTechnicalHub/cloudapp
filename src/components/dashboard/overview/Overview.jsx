import React from 'react'
import TopBar from '../header/TopBar'
import Test from '../../images/Test'
import AWSLogo from '../../images/AWSLogo.png'
import GoogleCloudLogo from '../../images/GoogleCloudLogo.png'
import MicrosoftAzureLogo from '../../images/MicrosoftAzureLogo.png'


const Overview = () => {
  
  
  return (
    <>
    <TopBar subtitle='Dashboard' />
    <div className="azure-inventory-container">
      <div className="row">
        <div className="col-lg-3">
          <div className="cloudnox-dashboard-tabs-block">
            <div className="cloudnox-dashboard-tabs-logo-heading-block">
              <span className="cloudnox-dashboard-tabs-logo-block">
                <img src={MicrosoftAzureLogo} alt="Logo" className="cloudnox-dashboard-tabs-logo"/>
              </span>
            </div>
            <div className="cloudnox-dashboard-tabs-text-number-block">
            <span className="cloudnox-dashboard-text">Cloud Accounts</span>
              <span className="cloudnox-dashboard-number">2</span>
            </div>
          </div>
        </div>
        <div className="col-lg-3"></div>
        <div className="col-lg-3"></div>
        <div className="col-lg-3"></div>
      </div>
    </div>
    </>
   
  )
}

export default Overview