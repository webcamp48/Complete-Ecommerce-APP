import React from 'react';
import Button from '@mui/material/Button';

function CustomButton({endIcon, startIcon, width, variant = 'contained', color = 'primary', size = 'medium', onClick, text, type =""}) {
  return (
    <Button sx={{width: width}} variant={variant} startIcon={startIcon} endIcon={endIcon} color={color} size={size} onClick={onClick} type={type} >
      {text}
    </Button>
  );
}

export default CustomButton;
