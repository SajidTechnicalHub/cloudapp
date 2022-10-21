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
import PdfReport from './PdfReport';
import { VscFilePdf } from 'react-icons/vsc';
import { MdDelete } from 'react-icons/md';
import {GrDocumentPdf} from 'react-icons/gr'

// Model
import Backdrop from '@mui/material/Backdrop';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Model Style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const columns = [
  {
    field: 'report_name',
    headerName: 'Report Name',
    minWidth: 100,
    flex: true,
    editable: true,
  },
  {
    field: 'report_description',
    headerName: 'Description',
    minWidth: 50,
    flex: true,
    editable: true,
  },
  {
    field: 'scope',
    headerName: 'Scope',
    minWidth: 300,
    flex: true,
    editable: true,
  },
  {
    field: 'reports',
    headerName: 'Reports',
    minWidth: 50,
    flex: true,
    sorting:false,
    renderCell: (cellValues) => {
      return (
        <>
          <div className="cloud-insights-report-block">
            <span className="cloud-insights-report-pdf-icon"><GrDocumentPdf color='red'/></span>
            <span className="cloud-insights-report-delete-icon"><MdDelete/></span>
          </div>
        </>

      );
    }
  },


];
const RowData =[
  {
    id:1,
    report_name:'abc',
    report_description:'details',
    scope:'Azure/All Accounts'
  },
  {
    id:2,
    report_name:'abc',
    report_description:'details',
    scope:'Azure/All Accounts'
  },
  {
    id:2,
    report_name:'abc',
    report_description:'details',
    scope:'Azure/All Accounts'
  },
]

const Reports = () => {
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

  // Handle Model
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const InputEvent = (e) => {
    const { name, value } = e.target;
    setCloudAccount(() => {
      return { ...cloudAccount, [name]: value }
    })
  }

  const Search = (RowData) => {

    return RowData.filter(
      (row) =>
        
          row.report_name.toLowerCase().indexOf(q) > -1 ||
          row.report_name.indexOf(q) > -1

    );
  }


  return (
    <>
      <TopBar subtitle='Summary / Reports' />
      {/* <PdfReport/> */}
      <div className="summary-security-description-block">
        <span className="summary-security-description-text">
          Create your reports across various Cloud Service Providers, 
          the accounts within them, and the security, cost optimization, performance & reliability, 
          and operational excellence recommendations across your cloud resources.
        </span>
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
          <div className="referesh-container">
            <span className="referesh-block">
              <FiRefreshCcw  />
            </span>
            <span className="referesh-block">
              <FiPlus onClick={handleOpen}/>
            </span>
          </div>
        </div>
      </div>
      <div className="security-datagrid-container">
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={Search(RowData)}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            {...RowData}
            // components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
          />
        </Box>
        {/* Add Report */}
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
      </div>
    </>
  )
}

export default Reports