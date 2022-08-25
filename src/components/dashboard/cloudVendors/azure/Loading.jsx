import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = (props) => {

  return (
    <>
      <div className="loading">
        <CircularProgress/>
      </div>
    </>
  )
}

export default Loading