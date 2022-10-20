import React, { useState, useEffect } from 'react'
import { AiFillSecurityScan } from 'react-icons/ai'
import { MdOutlineEdit } from 'react-icons/md'
import { CgArrowTopRightR } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppStateContext } from '../../Context';
import Loading from '../cloudVendors/azure/Loading';
import axios from 'axios';
import { baseUrl } from '../cloudVendors/azure/GetAzureServices';

const AlertInsights = () => {
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

    const setProgressBarValues = async () => {

        try {
            const response = await axios.get(`${baseUrl}/azure_dashboards/azure_impact_count`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            console.log('count impact', response)

            setPerformanceReliabilityHighImpact(response.data. performanceReliabilityHighImpact)
            setPerformanceReliabilityMediumImpact(response.data. performanceReliabilityMediumImpact)
            setPerformanceReliabilityLowImpact(response.data. performanceReliabilityLowImpact)

            let total =  performanceReliabilityHighImpact +  performanceReliabilityMediumImpact +  performanceReliabilityLowImpact;
            let highPer = ( performanceReliabilityHighImpact / total) * 100;
            let mediumPer = ( performanceReliabilityMediumImpact / total) * 100;
            let lowPer = ( performanceReliabilityLowImpact / total) * 100;

            setPerformanceReliabilityHighProgressBar(Math.round(highPer))
            setPerformanceReliabilityLowProgressBar(Math.round(lowPer))
            setPerformanceReliabilityMediumProgressBar(Math.round(mediumPer))
        }
        catch (error) {
            console.log(error);
        }


    }


    const progressBarData = [
        {
            id: 1,
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
            name: 'Performance & Reliability',
            lowImpact:  performanceReliabilityLowImpact,
            mediumImpact:  performanceReliabilityMediumImpact,
            highImpact:  performanceReliabilityHighImpact,
            lowImpactProgressBar:  performanceReliabilityLowProgressBar,
            mediumImpactProgressBar:  performanceReliabilityMediumProgressBar,
            highImpactProgressBar:  performanceReliabilityHighProgressBar,
        },


        {
            id: 4,
            name: 'Operational Excellence',
            lowImpact: 0,
            mediumImpact: 0,
            highImpact: 0,
            lowImpactProgressBar: 0,
            mediumImpactProgressBar: 0,
            highImpactProgressBar: 0,
        },
    ]

    useEffect(() => {
        setProgressBarValues()
    }, [])

    return (
        <>
            {progressBarData.map((val, index) => {
                return (
                    <React.Fragment key={index}>
                        <div className='cloudnox-dashboard-alert-insights-content-block'>
                            <AiFillSecurityScan fontSize='40px' color='blue' />
                            <div className="d-block w-100">
                                <span className='progress-bar-title'>{val.name}</span>
                                <div className="progress">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: val.highImpactProgressBar + '%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: val.mediumImpactProgressBar + '%' }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                    <div className="progress-bar  bg-success" role="progressbar" style={{ width: val.highImpactProgressBar + '%' }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="cloudnox-dashboard-alert-insights-progress-block">
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
                    </React.Fragment>
                )
            })}
        </>

    )
}

export default AlertInsights