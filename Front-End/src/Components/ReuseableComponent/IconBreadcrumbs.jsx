import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';



 function IconBreadcrumbs({productData}) {
  return (
    <div role="presentation" className='breadcrumb' >
      <Breadcrumbs aria-label="breadcrumb" >
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} />
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          href="#"
        >
          <WhatshotIcon sx={{ mr: 0.5 }}  />
          {productData.category}
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }}  />
          {productData.title}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export default IconBreadcrumbs