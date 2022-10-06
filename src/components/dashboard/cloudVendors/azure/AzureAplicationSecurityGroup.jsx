import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import TopBar from '../../header/TopBar';
import { FaArrowsAltH } from 'react-icons/fa';
import { FiRefreshCcw, FiSearch } from 'react-icons/fi'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useContext } from 'react'
import { AppStateContext } from '../../../Context'
import Loading from './Loading';
import axios from 'axios';
import { baseUrl } from './GetAzureServices';
import ApplicationSecurityGroupsLogo from '../../../images/ApplicationSecurityGroups.png'

const columns = [
  {
    field: 'nsg_name',
    headerName: 'ASG Name',
    minWidth: 262,
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


const AzureApplicationkSecurityGroups = () => {
  const {
    azureApplicationSecurityGroups, setAzureApplicationSecurityGroups,
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

  const Search = (azureApplicationSecurityGroups) => {

    return azureApplicationSecurityGroups.filter(
      (row) =>
        cloudAccount.cloud_account == 'All Azure Cloud Accounts' ?
          row.nsg_name.toLowerCase().indexOf(q) > -1 ||
          row.nsg_name.indexOf(q) > -1 :

          (row.account_name.toLowerCase().indexOf(cloudAccount.cloud_account) > -1 ||
            row.account_name.indexOf(cloudAccount.cloud_account) > -1) &&
          (row.nsg_name.toLowerCase().indexOf(q) > -1 ||
            row.nsg_name.indexOf(q) > -1)

    );
  }

  const InputEvent = (e) => {
    const { name, value } = e.target;
    setCloudAccount(() => {
      return { ...cloudAccount, [name]: value }
    })
  }


  const getAzureApplicationSecurityGroups = async () => {

    const response = await axios.get(`${baseUrl}/azure_application_security_groups/get_azure_application_security_grops`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })

    setIsLoading(false)
    if (response.data.status != 'No_record_find') {
      setAzureApplicationSecurityGroups(response.data.azureApplicationSecurityGroups)
    }

  }

  const updateAzureApplicationSecurityGroups = async () => {
    setIsLoading(true)
    const response = await fetch(`${baseUrl}/azure_application_security_groups/index`, {
      method: 'get',
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
          getAzureApplicationSecurityGroups()
        } else if (res.status == "401") {
          setoAuth(true)
          setIsLoading(false)
          navigate('/registration/signin')
        } else if (res.status == "404") {

          setIsLoading(false)

        }

      })

  }



  return (
    <>
      <TopBar subtitle='Azure / All Application Sec Groups' />

      <div className="azure-inventory-detail-container">
        <div className="azure-inventory-detail-all-vnets-block">
          <span className="azure-inventory-detail-all-vnets-block-heading">
            <span className="azure-inventory-detail-vnets-block">
              <img src={ApplicationSecurityGroupsLogo} alt="" className="azure-inventory-sub-groups-logo" />

              <span className='azure-inventory-detail-vnets-text'>All Application Sec Groups ({azureApplicationSecurityGroups?.length})</span>
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
              <FiRefreshCcw onClick={() => updateAzureApplicationSecurityGroups()} />
            </span>
          </div>
        </div>
        {isLoading === true ?
          <div className="loading">
            <Loading />
          </div> :
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={Search(azureApplicationSecurityGroups)}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              {...azureApplicationSecurityGroups}
              components={{ Toolbar: GridToolbar }}
              disableSelectionOnClick
            />
          </Box>
        }
      </div>
    </>
  )
}

export default AzureApplicationkSecurityGroups
