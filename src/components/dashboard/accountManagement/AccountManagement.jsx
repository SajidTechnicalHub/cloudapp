import * as React from 'react';
import TopBar from '../header/TopBar'
import { FiPlus, FiRefreshCcw, FiSearch, FiEdit2,  } from 'react-icons/fi'
import { FaAws } from 'react-icons/fa'
import { VscAzure } from 'react-icons/vsc'
import { AiFillDelete, AiOutlineCloudSync } from 'react-icons/ai'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddCloudAccount from './AddCloudAccount';

const accountData = [
  {
    id: 1,
    title: 'Alkira-Demo',
    heading: 'Alkira-Aws-Demo-Account',
    sync: '07/27/2022 18:14:23 PKT',
    logo: <FaAws color='#FF9900'/>
  },
  {
    id: 2,
    title: '002343004234',
    heading: 'Alkira-Aws-Demo-Account',
    sync: '07/27/2022 18:14:23 PKT',
    logo: <VscAzure color='#008AD7'/>
  },
  {
    id: 3,
    title: 'Alkira-Demo',
    heading: 'Alkira-Aws-Demo-Account',
    sync: '07/27/2022 18:14:23 PKT',
    logo: <FaAws color='#FF9900'/>
  },
]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '1px solid #003d48',
  boxShadow: 24,
  // p: 4,
  
};
const AccountManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <TopBar subtitle='Cloud Account Management' />
      <div className="account-management-container">
        <div className="search-container">
          <div className="search-block">
            <input type="search" placeholder='Search' />
            <span className="search-icon"><FiSearch /></span>
          </div>
          <div className="referesh-container">
            <span className="referesh-block">
              <FiRefreshCcw />
            </span>
            <span onClick={handleOpen} className="referesh-block">
              <FiPlus />
            </span>
          </div>
        </div>
        {
          accountData.map((val, index) => {
            return (
              <React.Fragment key={val.id}>
                <div className='aws-content-container'>

                  <div className="aws-name-container">
                    <div className="aws-name-logo">
                      <span className='aws-name-logo-icon' >{val.logo}</span>
                    </div>
                    <div className="aws-heading-container">
                      <span className="aws-heading-text">{val.heading}</span>
                      <span className='aws-sub-heading'>{val.title}</span>
                      <span className='aws-sub-heading'>Last Sync Attempt: {val.sync}</span>
                    </div>
                  </div>

                  <div className="total-resource-action">

                    <div className="total-resource-block">
                      <span className="total-resource-number">5</span>
                      <span className="total-resource-text">Total Resource</span>
                    </div>
                    <div className="action-container">
                      <span className="action-referesh-block">
                        <AiOutlineCloudSync/>
                      </span>
                      <span className="referesh-block">
                        <FiEdit2/>
                      </span>
                      <span className="action-delete-block">
                        <AiFillDelete />
                      </span>
                    </div>
                  </div>

                </div>
              </React.Fragment>
            )
          })

        }

      </div>
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
          <Box sx={style}>
            <div className="add-cloud-account-title">
              <h1>Add Cloud Account</h1>
            </div>
            <hr />
            <div className="add-cloud-account-body">
              <AddCloudAccount/>
            </div>
            
          </Box>
        </Fade>
      </Modal>
    </>

  )
}

export default AccountManagement