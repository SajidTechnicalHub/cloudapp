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
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdSecurity, MdDashboard } from 'react-icons/md'
import { RiGlobeFill } from 'react-icons/ri'
import { baseUrl } from './GetAzureServices';


const advisorTabs = [
  {
    id: 1,
    name: 'Cost',
    logo: <AiFillCheckCircle fontSize='22px' color='green' />
  },
  {
    id: 2,
    name: 'Security',
    logo: <MdSecurity fontSize='22px' color='blue' />
  },
  {
    id: 3,
    name: 'Reliability',
    logo: <RiGlobeFill fontSize='22px' color='blue' />
  },
  {
    id: 4,
    name: 'Operational excelence',
    logo: <AiFillCheckCircle fontSize='22px' color='green' />
  },
  {
    id: 5,
    name: 'Performance',
    logo: <AiFillCheckCircle fontSize='22px' color='green' />
  },
  {
    id: 5,
    name: 'All Recommendation',
    logo: <MdDashboard fontSize='22px' color='green' />
  }
]

const columns = [
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 500,
    flex: true,
    editable: true,
    renderCell: (cellValues) => {
      return (
        <>
          <div className="azure-recommendation-column-style">{cellValues.row.description}</div>
        </>

      );
    }
  },

  {
    field: 'category',
    headerName: 'Category',
    minWidth: 100,
    flex: true,
    editable: true,
  },


  {
    field: 'impact',
    headerName: 'Impact',
    minWidth: 50,
    flex: true,
    editable: true,
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
          <div className="azure-recommendation-column-style">{cellValues.row.impact_value}</div>
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
  }

];


const AzureAdvisor = () => {
  const {
    azureRecommendation, setAzureRecommendation,
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

  const Search = (azureRecommendation) => {

    return azureRecommendation.filter(
      (row) =>
        cloudAccount.cloud_account == 'All Azure Cloud Accounts' ?
          row.description.toLowerCase().indexOf(q) > -1 ||
          row.description.indexOf(q) > -1 :

          (row.account_name.toLowerCase().indexOf(cloudAccount.cloud_account) > -1 ||
            row.account_name.indexOf(cloudAccount.cloud_account) > -1) &&
          (row.description.toLowerCase().indexOf(q) > -1 ||
            row.description.indexOf(q) > -1)

    );
  }

  const InputEvent = (e) => {
    const { name, value } = e.target;
    setCloudAccount(() => {
      return { ...cloudAccount, [name]: value }
    })
  }


  const getAzureRecommendation = async () => {

    const response = await axios.get(`${baseUrl}/azure_recommendations/get_azure_recommendation`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })

    setIsLoading(false)
    if (response.data.status != 'No_record_find') {
      setAzureRecommendation(response.data.azureRecommendation)
    }


  }

  const updateAzureRecommendation = async () => {
    setIsLoading(true)
    const response = await fetch(`${baseUrl}/azure_recommendations/index`, {
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
          getAzureRecommendation()
        } else if (res.status == "401") {
          setoAuth(true)
          setIsLoading(false)
          navigate('/cloudapp/registration/signin')
        }else if (res.status == "404") {
                    
          setIsLoading(false)

      }

      })

  }



  return (
    <>
      <TopBar subtitle='Azure / All Advisor Recommendation' />
      
      <div className="azure-inventory-detail-container">
        <div className="azure-inventory-detail-all-vnets-block">
          <span className="azure-inventory-detail-all-vnets-block-heading">
            <span className="azure-inventory-detail-vnets-block">
              <span className="azure-inventory-detail-vnets-logo-block">
                <FaArrowsAltH />
              </span>

              <span className='azure-inventory-detail-vnets-text'>All Advisor Recommendation ({azureRecommendation?.length})</span>
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
              <FiRefreshCcw onClick={() => updateAzureRecommendation()} />
            </span>
          </div>
        </div>
        <div className="row">
          {
            advisorTabs.map((val, index) => {
              return (
                <React.Fragment key={index}>


                  <div className="col-lg-2">
                    {
                      val.name == 'All Recommendation' ?
                        <div className="advisor-tabs-block-enable">
                          <span className="advisor-tabs-name">{val.name}</span>
                          <span className="advisor-tabs-logo-block">
                            <span className="advisor-tab-logo">{val.logo}</span>
                            <span className="advisor-tab-number">{azureRecommendation?.length}</span>
                          </span>
                        </div> :
                        <div className="advisor-tabs-block">
                          <span className="advisor-tabs-name">{val.name}</span>
                          <span className="advisor-tabs-logo-block">
                            <span className="advisor-tab-logo">{val.logo}</span>
                            <span className="advisor-tab-number">-</span>
                          </span>
                        </div>
                    }
                  </div>


                </React.Fragment>
              )
            })
          }
        </div>
        {isLoading === true ?
          <div className="loading">
            <Loading />
          </div> :
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              // rows={Search(azureRecommendation)}
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
        }
      </div>
    </>
  )
}

export default AzureAdvisor
