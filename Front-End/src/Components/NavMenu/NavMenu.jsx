import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const NavbarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#f9f9f9',
});

const NavbarTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .MuiTab-root': {
    color: '#333', 
    fontWeight: 'bold',
  },
  '& .MuiTab-root.Mui-selected': {
    color: '#007bff', 
  },
  '& .MuiTab-root.Mui-disabled': {
    color: '#ccc', 
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#007bff', 
  },
});

export default function NavMenu() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <NavbarContainer>
      <NavbarTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Home" component={Link} to="/" />
        <Tab label="Shopping" component={Link} to="/shopping" />
        <Tab label="Category" component={Link} to="/category" />
        <Tab label="Product" component={Link} to="/product" />
        <Tab label="Pages" component={Link} to="/pages" />
        <Tab label="Blog" component={Link} to="/blog" />
        <Tab label="Contact" component={Link} to="/contact" />
      </NavbarTabs>
    </NavbarContainer>
  );
}
