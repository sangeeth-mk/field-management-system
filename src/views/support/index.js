import { Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import { DropzoneArea } from 'react-mui-dropzone';
// import { height } from '@mui/system';

const useStyles = makeStyles({
  dropzone: {
    height: '200px',
    width:'100px !important',
    backgroundColor: '#f0f0f0 !important',
    border: '2px solid #4caf50 !important'
  }
});

const Support = () => {
  const classes = useStyles();

 
  return (
    <MainCard title='Support'>
        <Typography variant='body-2'>
            support
        </Typography>
        {/* <DropzoneArea
      acceptedFiles={['image/*', 'video/*', 'application/*']}
      showFileNames
      dropzoneText="Choose File"
      showAlerts={false}
      filesLimit={20}
      classes={{
        root: classes.dropzone
      }}
    /> */}
    </MainCard>
  );
}

export default Support;
