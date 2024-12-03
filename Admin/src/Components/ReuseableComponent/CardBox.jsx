import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CardBox = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 200,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#4caf50', width: 56, height: 56 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 30 }} />
          </Avatar>
        </Box>
        <Typography variant="h6" component="div" align="center">
          Total Goals
        </Typography>
        <Typography variant="h4" align="center" color="primary">
          {'8'} 
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardBox;
