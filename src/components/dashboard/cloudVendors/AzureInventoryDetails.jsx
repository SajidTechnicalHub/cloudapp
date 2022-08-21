import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import TopBar from '../header/TopBar'
import { FaArrowsAltH } from 'react-icons/fa';
import { FiPlus, FiRefreshCcw, FiSearch, FiEdit2, } from 'react-icons/fi'
import { GoArrowSmallDown } from 'react-icons/go'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext } from 'react'
import { AppStateContext } from '../../Context'

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
    const { network, setNetwork } = useContext(AppStateContext)

    const navigate = useNavigate();
    const [q, setQ] = useState("")
    const [virtualNetwork, setVirtualNetwork] = useState()
    const [pageSize, setPageSize] = useState(5);
    const [cloudAccount, setCloudAccount] = useState({
        cloud_account: 'All Azure Cloud Accounts'

    })
    const Search = (network) => {
        return network.filter(
            (row) =>
                row.VNet_name.toLowerCase().indexOf(q) > -1 ||
                row.VNet_name.indexOf(q) > -1

        );
    }


    const InputEvent = (e) => {
        const { name, value } = e.target;
        setCloudAccount(() => {
            return { ...cloudAccount, [name]: value }
        })
    }
    const SubmitEvent = (e) => {
        e.preventDefault()

    }
    const handleReferesh = () => {

    }
    // const getVirtualNetwork = async () => {
    //     const response = await fetch("http://localhost:3000/api/v1/azure_connection/virtual_network", {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: localStorage.getItem("token"),
    //         },
    //     })
    //     const data = await response.json()
    //     console.log(data)
    //     setVirtualNetwork(data)
    // }

    // useEffect(() => {
    //     getVirtualNetwork()
    // }, [])




    return (
        <>
            <TopBar subtitle='Azure / All VNets' />
            <div className="azure-inventory-detail-container">
                <div className="azure-inventory-detail-all-vnets-block">
                    <span className="azure-inventory-detail-all-vnets-block-heading">
                        <span className="azure-inventory-detail-vnets-block">
                            <span className="azure-inventory-detail-vnets-logo-block">
                                <FaArrowsAltH onClick={handleReferesh()} />
                            </span>

                            <span className='azure-inventory-detail-vnets-text'>All VNets (2)</span>
                        </span>
                    </span>
                    <span className="azure-inventory-detail-all-vnets-block-dropdown">
                        <select
                            name="cloud_account"
                            value={cloudAccount.cloud_account}
                            onChange={InputEvent}
                        >
                            <option >All Azure Cloud Accounts</option>
                            <option > Azure Accounts</option>

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
                            <FiRefreshCcw />
                        </span>
                    </div>
                </div>

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={Search(network)}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        {...network}
                        components={{ Toolbar: GridToolbar }}
                        disableSelectionOnClick
                    />
                </Box>
            </div>
        </>
    )
}

export default AzureInventoryDetails
