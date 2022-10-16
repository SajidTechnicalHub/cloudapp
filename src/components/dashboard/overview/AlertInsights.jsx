import React, { useState, useEffect } from 'react'
import { AiFillSecurityScan } from 'react-icons/ai'
import {MdOutlineEdit} from 'react-icons/md'
import {CgArrowTopRightR} from 'react-icons/cg'
import { Link } from 'react-router-dom'

const AlertInsights = () => {
    const [highProgressBar, setHighProgressBar] = useState()
    const [mediumProgressBar, setMediumProgressBar] = useState()
    const [lowProgressBar, setLowProgressBar] = useState()
    const setProgressBarValues = () => {
        let hight = 1;
        let medium = 20;
        let low = 10;
        let total;
        let highPer;
        let lowPer;
        let mediumPer;
        total = hight + medium + low;
        highPer = (hight / total) * 100;
        mediumPer = (medium / total) * 100;
        lowPer = (low / total) * 100;

        setHighProgressBar(Math.round(highPer))
        setLowProgressBar(Math.round(lowPer))
        setMediumProgressBar(Math.round(mediumPer))

    }

    useEffect(() => {
        setProgressBarValues()
    }, [])

    return (
        <div className='cloudnox-dashboard-alert-insights-content-block'>
            <AiFillSecurityScan fontSize='40px' color='blue' />
            <div class="d-block w-100">
                <span className='progress-bar-title'>Security</span>
                <div className="progress">
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: highProgressBar + '%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: mediumProgressBar + '%' }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: lowProgressBar + '%' }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="cloudnox-dashboard-alert-insights-progress-block">
                    <span className="cloudnox-dashboard-alert-insights-progress-high-block">
                        <span className="cloudnox-dashboard-alert-insights-progress-high-text">HIGH</span>
                        <span className="cloudnox-dashboard-alert-insights-progress-high-count">{highProgressBar}</span>
                    </span>

                    <span className="cloudnox-dashboard-alert-insights-progress-high-block">
                        <span className="cloudnox-dashboard-alert-insights-progress-medium-text">MEDIUM</span>
                        <span className="cloudnox-dashboard-alert-insights-progress-high-count">{mediumProgressBar}</span>
                    </span>

                    <span className="cloudnox-dashboard-alert-insights-progress-high-block">
                        <span className="cloudnox-dashboard-alert-insights-progress-low-text">LOW</span>
                        <span className="cloudnox-dashboard-alert-insights-progress-high-count">{lowProgressBar}</span>
                    </span>
                </div>
            </div>
            <span className='cloudnox-dashboard-alert-insights-progress-insights-block'>
                <span className='cloudnox-dashboard-alert-insights-progress-insights-desc-count-block'>
                    <MdOutlineEdit fontSize='20px' color='red' />
                    <span className='cloudnox-dashboard-alert-insights-progress-insights-desc-count-container'>
                    <span className='cloudnox-dashboard-alert-insights-progress-insights-count'>30</span>
                    <span className='cloudnox-dashboard-alert-insights-progress-insights-desc'>Insights</span>
                    </span>
                </span>
                <span className='cloudnox-dashboard-alert-insights-progress-insights-link'>
                    <Link to=''><CgArrowTopRightR color='blue'/></Link>
                </span>
            </span>

        </div>
    )
}

export default AlertInsights