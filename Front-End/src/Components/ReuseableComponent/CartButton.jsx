import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function CartButton({ itemCount = 0}) {
  return (
    <IconButton aria-label="cart" >
      <Badge badgeContent={itemCount} color='primary'>
        <ShoppingCartIcon  style={{color:"#fff"}}/>
      </Badge>
    </IconButton>
  );
}

export default CartButton;
