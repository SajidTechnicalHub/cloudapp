import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import TopBar from '../header/TopBar'
import { FaArrowsAltH } from 'react-icons/fa';
import { FiPlus, FiRefreshCcw, FiSearch, FiEdit2, } from 'react-icons/fi'
import { GoArrowSmallDown } from 'react-icons/go'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';


const columns = [
    {
        field: 'VNet_Name',
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
        field: 'Region',
        headerName: 'Region',
        minWidth: 162,
        flex: true,
        editable: true,
    },
    {
        field: 'Subscription',
        headerName: 'Subscription',
        minWidth: 162,
        flex: true,
        editable: true,
    },
    {
        field: 'Resource_Group',
        headerName: 'Resource Group',
        minWidth: 162,
        flex: true,
        editable: true,
    },
    {
        field: 'Account_Name',
        headerName: 'Account Name',
        minWidth: 162,
        flex: true,
        editable: true,
    },
];

const rows = [
    { id: 1, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 2, VNet_Name: 'Cloud Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 3, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 4, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 5, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 6, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 7, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 8, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 9, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
    { id: 10, VNet_Name: 'PhishCode Testing', CIDR: '10.0.0/16', Region: 'Pakistan', Subscription: 'Azure', Resource_Group: 'PhishCode', Account_Name: 'Ahsan' },
];

const AzureInventoryDetails = () => {
    const navigate = useNavigate();
    const [q, setQ] = useState("")
    const [users, setUsers] = useState(rows)
    const [pageSize, setPageSize] = useState(5);
    const [cloudAccount, setCloudAccount] = useState({
        cloud_account: 'All Azure Cloud Accounts'

    })
    const Search = (users) => {
        return users.filter(
            (row) =>
                row.VNet_Name.toLowerCase().indexOf(q) > -1 ||
                row.VNet_Name.indexOf(q) > -1

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
        console.log('handle referesh')
        axios.get('http://localhost:3000/api/v1/azure_connection/index')
            .then(function (response) {
                console.log(response);
            })
    }
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
                        {/* <span className="referesh-block">
                            <GoArrowSmallDown fontSize='28px' fontWeight='bold' />
                        </span> */}
                    </div>
                </div>

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={Search(users)}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        {...users}
                        components={{ Toolbar: GridToolbar }}
                        disableSelectionOnClick
                    />
                </Box>
            </div>
        </>
    )
}

export default AzureInventoryDetails
