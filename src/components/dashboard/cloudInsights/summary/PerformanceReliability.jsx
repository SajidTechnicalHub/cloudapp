import React, { useState, useEffect, useCallback } from 'react';

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

        accountCredentials, setAzureCredentails,
        azureRecommendation, setAzureRecommendation,

        highAvailabilityPerformanceHighImpact, setHighAvailabilityPerformanceHighImpact,
        highAvailabilityPerformanceMediumImpact, setHighAvailabilityPerformanceMediumImpact,
        highAvailabilityPerformanceLowImpact, setHighAvailabilityPerformanceLowImpact,
        highAvailabilityPerformanceAllImpact, setHighAvailabilityPerformanceAllImpact,

    } = useContext(AppStateContext)
    const navigate = useNavigate();
    const [q, setQ] = useState("")
    const [pageSize, setPageSize] = useState(5);

    const [countHighImpact, setCountHighImpact] = useState(0)
    const [countMediumImpact, setCountMediumImpact] = useState(0)
    const [countLowImpact, setCountLowImpact] = useState(0)
    const [countCloudInsightImpact, setCountCloudInsightImpact] = useState()

    const [cloudAccount, setCloudAccount] = useState('Accounts (Default All)')


    
    const impactValue = [
        {
            id: 1,
            impactText: 'Total Insights Criteria',
            impactNumber: countCloudInsightImpact,
            resource: ''
        },
        {
            id: 2,
            impactText: 'HIGH IMPACT',
            impactNumber: highAvailabilityPerformanceHighImpact,
            resource: 'Resources'
        },
        {
            id: 3,
            impactText: 'MEDIUM IMPACT',
            impactNumber: highAvailabilityPerformanceMediumImpact,
            resource: 'Resources'
        },
        {
            id: 4,
            impactText: 'LOW IMPACT',
            impactNumber: highAvailabilityPerformanceLowImpact,
            resource: 'Resources'
        }
    ]

    const InputEvent = (e) => {
        const { name, value } = e.target;
        updateData(e.target.value)
        setCloudAccount(e.target.value)
        
    }

    const getPerformanceReliabilityData = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${baseUrl}/azure_dashboards/azure_single_impact_recommendations`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })

            setIsLoading(false)
            console.log(response)
            setHighAvailabilityPerformanceHighImpact(response.data.high_availability_performance_high_impact)
            setHighAvailabilityPerformanceMediumImpact(response.data.high_availability_performance_medium_impact)
            setHighAvailabilityPerformanceLowImpact(response.data.high_availability_performance_low_impact)
            setHighAvailabilityPerformanceAllImpact(response.data.high_availability_performance_all_impact)
            setCountCloudInsightImpact(response.data.high_availability_performance_total_impact)
            console.log('avail',highAvailabilityPerformanceAllImpact)
        }
        catch (error) {
            setIsLoading(false)
            console.log(error)
        }


    }
    const getSingleAccountData = async (value) => {
        setIsLoading(true)
        try {
          const response = await fetch(`${baseUrl}/azure_dashboards/azure_single_account_recommendation_count`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                account_name: value
            }),
          })
          const res = await response.json()
          console.log(res)
          setHighAvailabilityPerformanceHighImpact(res.high_availability_performance_high_impact)
          setHighAvailabilityPerformanceMediumImpact(res.high_availability_performance_medium_impact)
          setHighAvailabilityPerformanceLowImpact(res.high_availability_performance_low_impact)
          setCountCloudInsightImpact(res.high_availability_performance_total_impact)
          
        }
    
        catch (error) {
          setIsLoading(false)
          console.log(error)
          if(error == `SyntaxError: Unexpected token 'S', "Signature "... is not valid JSON`){
            navigate('/')
          }
        }
      }
    

   

    const Search = (highAvailabilityPerformanceAllImpact) => {

        return highAvailabilityPerformanceAllImpact?.filter(
            (row) =>
                cloudAccount == 'Accounts (Default All)' ?
                    row.description.toLowerCase().indexOf(q) > -1 ||
                    row.description.indexOf(q) > -1 :

                    (row.account_name.toLowerCase().indexOf(cloudAccount) > -1 ||
                        row.account_name.indexOf(cloudAccount) > -1) &&
                    (row.description.toLowerCase().indexOf(q) > -1 ||
                        row.description.indexOf(q) > -1)

        );
    }

    const updateData =(value)=>{
        console.log('value', value)
        if(value == 'Accounts (Default All)'){
            getPerformanceReliabilityData(value)
        }else{
            getSingleAccountData(value)
        }
    }

    useEffect(() => {
        // if(cloudAccount.cloud_account == 'Accounts (Default All)'){
        //     getPerformanceReliabilityData()
        // }else{
        //     getSingleAccountData()
        // }
        getPerformanceReliabilityData()
        
    }, [])

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
                            value={cloudAccount}
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
                        rows={Search(highAvailabilityPerformanceAllImpact)}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        {...highAvailabilityPerformanceAllImpact}
                        // components={{ Toolbar: GridToolbar }}
                        disableSelectionOnClick
                    />

                </Box>
            </div>
        </>
    )
}

export default PerformanceReliability