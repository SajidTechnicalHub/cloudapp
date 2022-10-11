import React from 'react'

const AlertInsights = () => {
    return (
        <div>
            <div className="progress">
                <div className="progress-bar bg-danger" role="progressbar" style={{width: "30%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-success" role="progressbar" style={{width: "30%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-warning" role="progressbar" style={{width: "50%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    )
}

export default AlertInsights