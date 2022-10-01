import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import TopBar from '../header/TopBar'
import { FaArrowsAltH } from 'react-icons/fa';
import { FiPlus, FiRefreshCcw, FiSearch, FiEdit2, } from 'react-icons/fi'
import { GoArrowSmallDown } from 'react-icons/go'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useContext } from 'react'
import { AppStateContext } from '../../Context'
import Loading from './azure/Loading';
import axios from 'axios';
import { baseUrl } from './azure/GetAzureServices';

const columns = [
    {
        field: 'VNet_name',
        headerName: 'VNet Name',
        minWidth: 162,
        flex: true,
        editable: true,
    },
    {
        field: 'CIDR',
        headerName: 'CIDR(x)',
        minWidth: 162,
        flex: true,
        editable: true,
    },
    {
        field: 'region',
        headerName: 'Region',
        minWidth: 162,
        flex: true,
        editable: true,
    },
    {
        field: 'subscription',
        headerName: 'Subscription',
        minWidth: 162,
        flex: true,
        editable: true,
    },
    {
        field: 'resource_group',
        headerName: 'Resource Group',
        minWidth: 162,
        flex: true,
        editable: true,
    },
    {
        field: 'account_name',
        headerName: 'Account Name',
        minWidth: 162,
        flex: true,
        editable: true,
    },
];


const AzureInventoryDetails = () => {
    const {
        virtualNetwork, setVirtualNetwork,
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

    const Search = (virtualNetwork) => {

        return virtualNetwork?.filter(
            (row) =>
                cloudAccount.cloud_account == 'All Azure Cloud Accounts' ?
                    row.VNet_name.toLowerCase().indexOf(q) > -1 ||
                    row.VNet_name.indexOf(q) > -1 :

                    (row.account_name.toLowerCase().indexOf(cloudAccount.cloud_account) > -1 ||
                        row.account_name.indexOf(cloudAccount.cloud_account) > -1) &&
                    (row.VNet_name.toLowerCase().indexOf(q) > -1 ||
                        row.VNet_name.indexOf(q) > -1)

        );
    }

    const InputEvent = (e) => {
        const { name, value } = e.target;
        setCloudAccount(() => {
            return { ...cloudAccount, [name]: value }
        })
    }

    const getVirtualNetwork = async () => {

        const response = await axios.get(`${ baseUrl }/azure_virtualnetworks/get_azure_virtual_network`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })

        setIsLoading(false)
        setVirtualNetwork(response.data.virtualNetwork)

    }

    const updateVirtualNetwork = async () => {
        setIsLoading(true)
        const response = await fetch(`${ baseUrl }/azure_virtualnetworks/virtual_network_save`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => {
                console.log(res)
                if (res.ok == true) {
                    setoAuth(false)
                    setIsLoading(false)
                    getVirtualNetwork()
                } else if (res.status == "401") {
                    setoAuth(true)
                    setIsLoading(false)
                    navigate('/registration/signin')
                }

            })

    }




    return (
        <>
            <TopBar subtitle='Azure / All VNets' />
            <span className='Login-error-message'> {isoAuth === true ? 'You are Unauthorized! Please Login.' : ''}</span>
            <div className="azure-inventory-detail-container">
                <div className="azure-inventory-detail-all-vnets-block">
                    <span className="azure-inventory-detail-all-vnets-block-heading">
                        <span className="azure-inventory-detail-vnets-block">
                            <span className="azure-inventory-detail-vnets-logo-block">
                                <FaArrowsAltH />
                            </span>

                            <span className='azure-inventory-detail-vnets-text'>All VNets ({virtualNetwork?.length})</span>
                        </span>
                    </span>
                    <span className="azure-inventory-detail-all-vnets-block-dropdown">
                        <select
                            name="cloud_account"
                            value={cloudAccount.cloud_account}
                            onChange={InputEvent}
                        >
                            <option >All Azure Cloud Accounts</option>
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
                            <FiRefreshCcw onClick={() => updateVirtualNetwork()} />
                        </span>
                    </div>
                </div>
                {isLoading === true ?
                    <div className="loading">
                        <Loading />
                    </div> :
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            // rows={Search(virtualNetwork)}
                            rows={Search(virtualNetwork)}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            {...virtualNetwork}
                            components={{ Toolbar: GridToolbar }}
                            disableSelectionOnClick
                        />
                    </Box>
                }
            </div>
        </>
    )
}

export default AzureInventoryDetails
