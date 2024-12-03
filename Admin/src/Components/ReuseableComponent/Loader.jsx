import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader({size}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: "center"}}>
      <CircularProgress size={size}/>
    </Box>
  );
}