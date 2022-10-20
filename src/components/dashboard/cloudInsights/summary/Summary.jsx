import React, { useState, useEffect } from 'react'
import TopBar from '../../header/TopBar'
import { AiFillSecurityScan } from 'react-icons/ai'
import { MdOutlineEdit } from 'react-icons/md'
import { CgArrowTopRightR } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppStateContext } from '../../../Context';
import Loading from '../../cloudVendors/azure/Loading'
import axios from 'axios';
import { baseUrl } from '../../cloudVendors/azure/GetAzureServices'
const Summary = () => {
  const {

    isoAuth, setoAuth,
    isLoading, setIsLoading,
    performanceReliabilityHighProgressBar, setPerformanceReliabilityHighProgressBar,
    performanceReliabilityMediumProgressBar, setPerformanceReliabilityMediumProgressBar,
    performanceReliabilityLowProgressBar, setPerformanceReliabilityLowProgressBar,

    performanceReliabilityHighImpact, setPerformanceReliabilityHighImpact,
    performanceReliabilityMediumImpact, setPerformanceReliabilityMediumImpact,
    performanceReliabilityLowImpact, setPerformanceReliabilityLowImpact,

  } = useContext(AppStateContext)
  
  const progressBarData = [
    {
      id: 1,
      text: 'Detect threats and vulnerabilities that might lead to security breaches and improve your security posture of cloud resources.',
      path:'/dashboard/summary/security',
      name: 'Security',
      lowImpact: 0,
      mediumImpact: 0,
      highImpact: 0,
      lowImpactProgressBar: 0,
      mediumImpactProgressBar: 0,
      highImpactProgressBar: 0,
    },
    {

      id: 2,
      text: 'Optimize and reduce your overall cloud spending by removing unused or idle resources. ',
      path:'/dashboard/summary/cost-optimization',
      name: 'Cost Optimization',
      lowImpact: 0,
      mediumImpact: 0,
      highImpact: 0,
      lowImpactProgressBar: 0,
      mediumImpactProgressBar: 0,
      highImpactProgressBar: 0,
    },
    {
      id: 3,
      text: 'To ensure and improve the continuity of your business-critical applications. Improve the speed of your applications',
      path:'/dashboard/summary/performance-reliability',
      name: 'Performance & Reliability',
      lowImpact: performanceReliabilityLowImpact,
      mediumImpact: performanceReliabilityMediumImpact,
      highImpact: performanceReliabilityHighImpact,
      lowImpactProgressBar: performanceReliabilityLowProgressBar,
      mediumImpactProgressBar: performanceReliabilityMediumProgressBar,
      highImpactProgressBar: performanceReliabilityHighProgressBar,
    },


    {
      id: 4,
      text: 'Help you achieve process and workflow efficiency, resource manageability, and deployment best practices',
      path:'',
      name: 'Operational Excellence',
      lowImpact: 0,
      mediumImpact: 0,
      highImpact: 0,
      lowImpactProgressBar: 0,
      mediumImpactProgressBar: 0,
      highImpactProgressBar: 0,
    },
  ]
  return (
    <>
      <TopBar subtitle='Summary' />
      {progressBarData.map((val, index) => {
        return (
          <React.Fragment key={index}>
            <div className="cloudnox-summary">
              <Link to={val.path}>
              <div className='cloudnox-dashboard-alert-insights-content-block' style={{ padding: '10px' }}>
                <AiFillSecurityScan className='cloudnox-dashboard-alert-insights-content-logo' fontSize='40px' color='blue' />
                <div className="d-block w-100">
                  <span className='progress-bar-title'>{val.name}</span><br />
                  <span className='progress-bar-title-text'>{val.text}</span>
                  <div className="progress" style={{ marginTop: '10px' }}>
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: val.highImpactProgressBar + '%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: val.mediumImpactProgressBar + '%' }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="progress-bar  bg-success" role="progressbar" style={{ width: val.highImpactProgressBar + '%' }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div className="cloudnox-dashboard-alert-insights-progress-block" style={{ marginTop: '10px' }}>
                    <span className="cloudnox-dashboard-alert-insights-progress-high-block">
                      <span className="cloudnox-dashboard-alert-insights-progress-high-text">HIGH</span>
                      <span className="cloudnox-dashboard-alert-insights-progress-high-count">{val.highImpact}</span>
                    </span>

                    <span className="cloudnox-dashboard-alert-insights-progress-high-block">
                      <span className="cloudnox-dashboard-alert-insights-progress-medium-text">MEDIUM</span>
                      <span className="cloudnox-dashboard-alert-insights-progress-high-count">{val.mediumImpact}</span>
                    </span>

                    <span className="cloudnox-dashboard-alert-insights-progress-high-block">
                      <span className="cloudnox-dashboard-alert-insights-progress-low-text">LOW</span>
                      <span className="cloudnox-dashboard-alert-insights-progress-high-count">{val.lowImpact}</span>
                    </span>
                  </div>
                </div>
                <span className='cloudnox-dashboard-alert-insights-progress-insights-block'>
                  <span className='cloudnox-dashboard-alert-insights-progress-insights-desc-count-block'>
                    <MdOutlineEdit fontSize='20px' color='red' />
                    <span className='cloudnox-dashboard-alert-insights-progress-insights-desc-count-container'>
                      <span className='cloudnox-dashboard-alert-insights-progress-insights-count'>{val.highImpact + val.mediumImpact + val.lowImpact}</span>
                      <span className='cloudnox-dashboard-alert-insights-progress-insights-desc'>Insights</span>
                    </span>
                  </span>
                  <span className='cloudnox-dashboard-alert-insights-progress-insights-link'>
                    <Link to='/dashboard/summary'><CgArrowTopRightR color='blue' /></Link>
                  </span>
                </span>

              </div>
              </Link>
            </div><br />
          </React.Fragment>
        )
      })}
    </>
  )
}

export default Summary