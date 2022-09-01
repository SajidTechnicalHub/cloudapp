import React, { useState, useEffect } from 'react';
import TopBar from '../header/TopBar'
import { FiPlus, FiRefreshCcw, FiSearch, FiEdit2, } from 'react-icons/fi'
import { FaAws } from 'react-icons/fa'
import { VscAzure } from 'react-icons/vsc'
import { FcGoogle } from 'react-icons/fc'
import { AiFillDelete, AiOutlineCloudSync, AiFillCheckCircle, AiFillGoogleCircle } from 'react-icons/ai'
import useWindowDimensions from '../../useWindowDimensions';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddAzureAccount from './AddAzureAccount';
import AddAwsAccount from './AddAwsAccount';
import AddGoogleAccount from './AddGoogleAccount';
import AddOracleAccount from './AddOracleAccount';
import EditAzureAccount from './EditAzureAccount';
import EditAwsAccount from './EditAwsAccount';
import EditGoogleAccount from './EditGoogleAccount';
import EditOracleAccount from './EditOracleAccount';
import DeleteCloudAccount from './DeleteCloudAccount';
import { useContext } from 'react'
import { AppStateContext } from '../../Context';
import axios from 'axios';
import Loading from '../cloudVendors/azure/Loading';
import { baseUrl } from '../cloudVendors/azure/GetAzureServices';

const accountData = [
  {
    id: 1,
    title: 'Alkira-Demo',
    heading: 'Alkira-Aws-Demo-Account',
    sync: '07/27/2022 18:14:23 PKT',
    logo: <FaAws color='#FF9900' />
  },
  {
    id: 2,
    title: '002343004234',
    heading: 'Alkira-Aws-Demo-Account',
    sync: '07/27/2022 18:14:23 PKT',
    logo: <VscAzure color='#008AD7' />
  },
  {
    id: 3,
    title: 'Alkira-Demo',
    heading: 'Alkira-Aws-Demo-Account',
    sync: '07/27/2022 18:14:23 PKT',
    logo: <FaAws color='#FF9900' />
  },
]
const CloudAccountTabs = [
  {
    id: 1,
    logo: <VscAzure className='azure-tab-logo' />,
    name: 'Azure'
  },
  {
    id: 2,
    logo: <FaAws className='aws-tab-logo' />,
    name: ''
  },
  {
    id: 3,
    logo: <FcGoogle fontSize='20px' />,
    name: 'Google'
  },
  {
    id: 4,
    logo: '',
    name: 'ORACLE'
  },
]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  height: '95%',
  bgcolor: 'background.paper',
  border: '1px solid #003d48',
  boxShadow: 24,
  overflow: 'auto',
  // p: 4,

};
const mobileStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '95%',
  bgcolor: 'background.paper',
  border: '1px solid #003d48',
  boxShadow: 24,
  overflow: 'auto',
  // p: 4,

};
const deleteStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '1px solid #003d48',
  boxShadow: 24,
  overflow: 'auto',
  // p: 4,

};
const deleteMobileStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '55%',
  bgcolor: 'background.paper',
  border: '1px solid #003d48',
  boxShadow: 24,
  overflow: 'auto',
  // p: 4,

};

const AccountManagement = () => {

  const {
    azureSubscription, setAzureSubscription,
    editAzureCredential, setEditAzureCredential,
    accountCredentials, setAzureCredentails,
    isoAuth, setoAuth,
    isLoading, setIsLoading,

  } = useContext(AppStateContext)

  const { height, width } = useWindowDimensions();

  // Add Cloud Account
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Edit Cloud Account
  const [editOpen, setEditOpen] = React.useState(false);

  // *****************Get Azure Credential data******************
  const handleEditOpen = async (id) => {

    const response = await axios.get(`http://localhost:3000/api/v1/azure_credentials/${id}`, {

      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },

    })
    if (response.status == 200) {
      setEditOpen(true)
      setEditAzureCredential(response.data.azureCredential)
      console.log(editAzureCredential)
    }

  }
  // *************************************************
  const handleEditClose = () => setEditOpen(false);

  // Delete Cloud Account
  const [deleteAccoutData, setDetaleAccountData] = useState()
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = (id) => {
    setDetaleAccountData(id)
    setDeleteOpen(true);
  }
  const handleDeleteClose = () => setDeleteOpen(false);

  const [q, setQ] = useState("")
  const [cloudAccount, setCloudAccount] = useState(accountData)

  const [activeTab, setActiveTab] = useState('')

  const handleActiveCass = (id) => {
    setActiveTab(id)
  }

  const getAllAzureSubscriptionResource = async () => {
    setIsLoading(true)
    const response = await axios.get("http://localhost:3000/api/v1/azure_accounts/update_subscription_total_resources", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })

    setIsLoading(false)
    console.log(response)
    setAzureSubscription(response.data.azureSubscription)


  }

  const updateSubscriptionResource = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${baseUrl}/azure_accounts/update_subscription_current_resources`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          subscription: id
        }),
      })
      const data = await response.json()
      setIsLoading(false)
      console.log(data)
    }

    catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getAllAzureSubscriptionResource()
  }, [])


  return (
    <>
      <TopBar subtitle='Cloud Account Management' />
      <span className='Login-error-message'> {isoAuth === true ? 'You are Unauthorized! Please Login.' : ''}</span>
      <div className="account-management-container">
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
              <FiRefreshCcw onClick={() => getAllAzureSubscriptionResource()} />
            </span>
            <span onClick={handleOpen} className="referesh-block">
              <FiPlus />
            </span>
          </div>
        </div>
        {
          azureSubscription?.filter((val) => {
            if (q == '') {

              return val
            }
            else if (val.heading.toLowerCase().includes(q.toLocaleLowerCase())) {
              return val
            }
          }).map((currentElement) => {
            return (
              <React.Fragment key={currentElement.id}>
                {isLoading === true ?
                  <div className="loading">
                    <Loading />
                  </div> :
                  <div className='aws-content-container'>

                    <div className="aws-name-container">
                      <div className="aws-name-logo">
                        <span className='aws-name-logo-icon' ><VscAzure color='#008AD7' /></span>
                      </div>
                      <div className="aws-heading-container">
                        <span className="aws-heading-text">{currentElement.account_name}</span>
                        <span className='aws-sub-heading'>{currentElement.subscription_name}</span>
                        <span className='aws-sub-heading'>Last Sync Attempt: {currentElement.updated_at}</span>
                      </div>
                    </div>

                    <div className="total-resource-action">

                      <div className="total-resource-block">
                        <span className="total-resource-number">{currentElement.total_resource}</span>
                        <span className="total-resource-text">Total Resource</span>
                      </div>
                      <div className="action-container">
                        <span className="action-referesh-block">
                          <AiOutlineCloudSync onClick={() => updateSubscriptionResource(currentElement.id)} />
                        </span>
                        <span className="referesh-block">
                          <FiEdit2 onClick={(e) => handleEditOpen(currentElement.azure_credential_id)} />
                        </span>
                        <span className="action-delete-block">
                          <AiFillDelete onClick={e => handleDeleteOpen(currentElement.azure_credential_id)} />
                        </span>
                      </div>
                    </div>

                  </div>
                }
              </React.Fragment>
            )
          })

        }

      </div>
      {/* Add Azure Account */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={width >= 992 ? style : mobileStyle}>
            <div className="add-cloud-account-title">
              <h1>Add Cloud Account</h1>
            </div>
            <hr />
            <div className="add-cloud-account-body">
              <div className="add-cloud-account-tabs-container">
                {
                  CloudAccountTabs.map((val, index) => {
                    return (
                      <React.Fragment key={index}>

                        <div onClick={(e) => handleActiveCass(val.id)} className="cloud-account-tabs-block">
                          <span className={activeTab == val.id ? 'active-tab' : activeTab == '' && val.id == 1 ? 'active-tab' : 'dis-active-tab'} >
                            <AiFillCheckCircle fontSize='25px' />
                          </span>

                          <span className="aws-tabs-block">
                            <span className="aws-tabs-logo">
                              {/* <VscAzure className='aws-tab-logo' /> */}
                              {val.logo}
                            </span>
                            <span className="tabs-name">{val.name}</span>
                          </span>
                        </div>

                      </React.Fragment>
                    )
                  })
                }
              </div>
              {
                activeTab == 1 ?
                  <AddAzureAccount handleClose={handleClose} /> :
                  activeTab == 2 ?
                    <AddAwsAccount handleClose={handleClose} /> :
                    activeTab == 3 ?
                      <AddGoogleAccount handleClose={handleClose} /> :
                      activeTab == 4 ?
                        <AddOracleAccount handleClose={handleClose} /> :
                        <AddAzureAccount handleClose={handleClose} />
              }

            </div>

          </Box>
        </Fade>
      </Modal>

      {/* Edit Azure Account */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editOpen}
        onClose={handleEditClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editOpen}>
          <Box sx={width >= 992 ? style : mobileStyle}>
            <div className="add-cloud-account-title">
              <h1>Edit Cloud Account</h1>
            </div>
            <hr />
            <div className="add-cloud-account-body">
              <div className="add-cloud-account-tabs-container">
                {
                  CloudAccountTabs.map((val, index) => {
                    return (
                      <React.Fragment key={index}>

                        <div onClick={(e) => handleActiveCass(val.id)} className="cloud-account-tabs-block">
                          <span className={activeTab == val.id ? 'active-tab' : activeTab == '' && val.id == 1 ? 'active-tab' : 'dis-active-tab'} >
                            <AiFillCheckCircle fontSize='25px' />
                          </span>

                          <span className="aws-tabs-block">
                            <span className="aws-tabs-logo">
                              {/* <VscAzure className='aws-tab-logo' /> */}
                              {val.logo}
                            </span>
                            <span className="tabs-name">{val.name}</span>
                          </span>
                        </div>

                      </React.Fragment>
                    )
                  })
                }
              </div>
              {
                activeTab == 1 ?
                  <EditAzureAccount
                    handleEditClose={handleEditClose}

                  /> :
                  activeTab == 2 ?
                    <EditAwsAccount handleEditClose={handleEditClose} /> :
                    activeTab == 3 ?
                      <EditGoogleAccount handleEditClose={handleEditClose} /> :
                      activeTab == 4 ?
                        <EditOracleAccount handleEditClose={handleEditClose} /> :
                        <EditAzureAccount handleEditClose={handleEditClose} />
              }

            </div>

          </Box>
        </Fade>
      </Modal>

      {/* Delete Azure Account */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={deleteOpen}
        onClose={handleDeleteClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteOpen}>
          <Box sx={width >= 992 ? deleteStyle : deleteMobileStyle}>
            <DeleteCloudAccount
              handleDeleteClose={handleDeleteClose}
              deleteAccoutData={deleteAccoutData}
            />
          </Box>
        </Fade>
      </Modal>
    </>

  )
}

export default AccountManagement