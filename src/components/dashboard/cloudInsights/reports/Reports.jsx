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
import { PDFViewer } from '@react-pdf/renderer';
import { VscFilePdf } from 'react-icons/vsc';
import { MdDelete } from 'react-icons/md';
import { GrDocumentPdf } from 'react-icons/gr'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import CreateReport from './CreateReport';




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
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  // border: '1px solid background: rgb(234, 242, 245)',
  boxShadow: 24,
  width: '40%',
  height: '100%',
};



const Reports = () => {
  const {

    isoAuth, setoAuth,
    isLoading, setIsLoading,
    performanceReliabilityHighImpact, setPerformanceReliabilityHighImpact,
    performanceReliabilityMediumImpact, setPerformanceReliabilityMediumImpact,
    performanceReliabilityLowImpact, setPerformanceReliabilityLowImpact,
    accountCredentials, setAzureCredentails,
    azureRecommendation, setAzureRecommendation,
    reportResponse, setReportResponse


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
  const handleClose = () => {
    setOpen(false);
    console.log('close event')
  }

  const columns = [
    {
      field: 'report_name',
      headerName: 'Report Name',
      minWidth: 100,
      flex: true,
      editable: true,
    },
    {
      field: 'report_des',
      headerName: 'Description',
      minWidth: 50,
      flex: true,
      editable: true,
    },
    {
      field: 'provider',
      headerName: 'Scope',
      minWidth: 400,
      flex: true,
      editable: true,
      renderCell: (cellValues) => {
        return (
          <>
            <span>{cellValues.row.provider}/{cellValues.row.account}/{cellValues.row.cloud_insights}</span>
          </>

        );
      }
    },
    {
      field: 'reports',
      headerName: 'Reports',
      minWidth: 50,
      flex: true,
      sorting: false,
      renderCell: (cellValues) => {
        return (
          <>
            <div className="cloud-insights-report-block">
              <div>
                {/* {console.log('cellValue', cellValues.row)} */}
                <PDFDownloadLink document={<PdfReport abc={cellValues.row.report_name} />} fileName={cellValues.row.report_name}>
                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' :
                    <span className="cloud-insights-report-pdf-icon"><GrDocumentPdf color='red' /></span>)}
                </PDFDownloadLink>
              </div>
              {/* <span className="cloud-insights-report-pdf-icon"><GrDocumentPdf color='red' /></span> */}
              <span className="cloud-insights-report-delete-icon"><MdDelete onClick={() => handleDelete(cellValues.row.id)} /></span>
            </div>
          </>

        );
      }
    },


  ];

  const Search = (reportResponse) => {

    return reportResponse.filter(
      (row) =>

        row.report_name.toLowerCase().indexOf(q) > -1 ||
        row.report_name.indexOf(q) > -1

    );
  }

  const fetchReports = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${baseUrl}/reports`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      const data = await response.json()
      console.log(data)
      setReportResponse(data.reports)
      setIsLoading(false)

    } catch (e) {
      setIsLoading(false)
      return e
    }

  }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/reports/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      const data = await response.json()
      console.log(data)
      fetchReports()

    } catch (e) {
      return e
    }

  }
  useEffect(() => {
    fetchReports()
  }, [])


  return (
    <>
      <TopBar subtitle='Summary / Reports' />
      {/* <PDFViewer>
        <PdfReport />
      </PDFViewer> */}


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
              <FiRefreshCcw onClick={fetchReports} />
            </span>
            <span className="referesh-block">
              <FiPlus onClick={handleOpen} />
            </span>
          </div>
        </div>
      </div>
      <div className="security-datagrid-container">
        {
          isLoading == true ?
            <div className="loading">
              <Loading />
            </div> :
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={Search(reportResponse)}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                {...reportResponse}
                // components={{ Toolbar: GridToolbar }}
                disableSelectionOnClick
                checkboxSelection
              />
            </Box>
        }
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

              <CreateReport
                handleClose={handleClose}
                fetchReports={fetchReports}
              />

            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  )
}

export default Reports