import React, { useState, useEffect } from 'react';

import { FiPlus, FiRefreshCcw, FiSearch, FiEdit2, } from 'react-icons/fi'
import { useContext } from 'react'
import { AppStateContext } from '../../../Context';
import axios from 'axios';
import Loading from '../../cloudVendors/azure/Loading';
import { useNavigate } from "react-router-dom"
import TopBar from '../../header/TopBar';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { baseUrl } from '../../cloudVendors/azure/GetAzureServices';

const columns = [
    {
        field: 'description',
        headerName: 'Insights Criteria',
        minWidth: 500,
        flex: true,
        editable: true,
    },
    {
        field: 'impact',
        headerName: 'Impact',
        minWidth: 50,
        flex: true,
        editable: true,
        renderCell: (cellValues) => {
            return (
                <>

                    <span className={
                        cellValues.row.impact == 'High' ? 'security-impact-high-text' :
                            cellValues.row.impact == 'Medium' ? 'security-impact-medium-text' :
                                cellValues.row.impact == 'Low' ? 'security-impact-low-text' : ''
                    }>
                        {cellValues.row.impact}
                    </span>

                </>

            );
        }
    },
    {
        field: 'impact_value',
        headerName: 'Impacted Resources',
        minWidth: 300,
        flex: true,
        editable: true,
        renderCell: (cellValues) => {
            return (
                <>
                    <div >
                        {cellValues.row.impact_value = 0}</div>
                </>

            );
        }
    },
    {
        field: 'account_name',
        headerName: 'Account Name',
        minWidth: 100,
        flex: true,
        editable: true,
        hide: true
    },

];

const PerformanceReliability = () => {
    const {

        isoAuth, setoAuth,
        isLoading, setIsLoading,
        performanceReliabilityHighImpact, setPerformanceReliabilityHighImpact,
        performanceReliabilityMediumImpact, setPerformanceReliabilityMediumImpact,
        performanceReliabilityLowImpact, setPerformanceReliabilityLowImpact,
        accountCredentials, setAzureCredentails,
        azureRecommendation, setAzureRecommendation,


    } = useContext(AppStateContext)
    const navigate = useNavigate();
    const [q, setQ] = useState("")
    const [pageSize, setPageSize] = useState(5);
    const [cloudAccount, setCloudAccount] = useState({
        cloud_account: 'Accounts (Default All)'

    })


    const impactValue = [
        {
            id: 1,
            impactText: 'Total Insights Criteria',
            impactNumber: performanceReliabilityHighImpact + performanceReliabilityMediumImpact + performanceReliabilityLowImpact,
            resource: ''
        },
        {
            id: 2,
            impactText: 'HIGH IMPACT',
            impactNumber: performanceReliabilityHighImpact,
            resource: 'Resources'
        },
        {
            id: 3,
            impactText: 'MEDIUM IMPACT',
            impactNumber: performanceReliabilityMediumImpact,
            resource: 'Resources'
        },
        {
            id: 4,
            impactText: 'LOW IMPACT',
            impactNumber: performanceReliabilityLowImpact,
            resource: 'Resources'
        }
    ]

    const InputEvent = (e) => {
        const { name, value } = e.target;
        setCloudAccount(() => {
            return { ...cloudAccount, [name]: value }
        })
    }

    const Search = (azureRecommendation) => {

        return azureRecommendation.filter(
            (row) =>
                cloudAccount.cloud_account == 'Accounts (Default All)' ?
                    row.description.toLowerCase().indexOf(q) > -1 ||
                    row.description.indexOf(q) > -1 :

                    (row.account_name.toLowerCase().indexOf(cloudAccount.cloud_account) > -1 ||
                        row.account_name.indexOf(cloudAccount.cloud_account) > -1) &&
                    (row.description.toLowerCase().indexOf(q) > -1 ||
                        row.description.indexOf(q) > -1)

        );
    }


    return (
        <>
            <TopBar subtitle='Summary / Performance & Reliability' />
            <div className="summary-security-description-block">
                <span className="summary-security-description-text">
                    Detect threats and vulnerabilities that might lead to security breaches and improve your security posture of cloud resources.
                </span>
                <div className="summary-security-description-dropdown-block">
                    <span className="summary-security-description-dropdown">
                        <select
                            name=""
                        // value={cloudAccount.cloud_account}
                        // onChange={InputEvent}
                        >
                            <option >Providers (Default All)</option>
                            <option >Microsoft Azure</option>
                            {/* {accountCredentials.map((val, index) => {
                                return (
                                    <React.Fragment key={val.id}>
                                        <option >{val.account_name}</option>
                                    </React.Fragment>
                                )
                            })} */}


                        </select>
                    </span>
                    <span className="summary-security-description-dropdown">
                        <select
                            name="cloud_account"
                            value={cloudAccount.cloud_account}
                            onChange={InputEvent}

                        >
                            <option >Accounts (Default All)</option>
                            {accountCredentials.map((val, index) => {
                                return (
                                    <React.Fragment key={val.id}>
                                        <option >{val.account_name}</option>
                                    </React.Fragment>
                                )
                            })}


                        </select>
                    </span>
                </div>
            </div>

            <div className="security-impact-container">
                {impactValue.map((val, index) => {
                    return (
                        <React.Fragment key={val.id}>
                            <div className="security-impact-block">
                                <span className={
                                    val.impactText == 'HIGH IMPACT' ? 'security-impact-high-text' :
                                        val.impactText == 'MEDIUM IMPACT' ? 'security-impact-medium-text' :
                                            val.impactText == 'LOW IMPACT' ? 'security-impact-low-text' : 'security-impact-total'
                                }>
                                    {val.impactText}
                                </span>
                                <div className="security-impact-number-resource-block">
                                    <span className="security-impact-number">{val.impactNumber}</span>
                                    <span className="security-impact-resource">{val.resource}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
            <div className="account-management-container">
                <div className="search-container">
                    <div className="search-block">
                        <input type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder='Search' />
                        <span className="search-icon"><FiSearch /></span>
                    </div>
                </div>
            </div>
            <div className="security-datagrid-container">
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={Search(azureRecommendation)}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        {...azureRecommendation}
                        // components={{ Toolbar: GridToolbar }}
                        disableSelectionOnClick
                    />
                </Box>
            </div>
        </>
    )
}

export default PerformanceReliability