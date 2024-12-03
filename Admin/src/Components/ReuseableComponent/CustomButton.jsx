import React from 'react';
import Button from '@mui/material/Button';

function CustomButton({endIcon, startIcon, width, type ='submit',background, variant = 'contained', color = 'primary', size = 'medium', onClick, text }) {
  return (
    <Button sx={{width: width, backgroundColor : {background}}} variant={variant} startIcon={startIcon} endIcon={endIcon} color={color} size={size} onClick={onClick} type={type} background = {background}>
      {text}
    </Button>
  );
}

export default CustomButton;
