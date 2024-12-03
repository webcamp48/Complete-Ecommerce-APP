import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';


const ReadOnlyRating = ({ value, starColor = '#1976d2' }) => {
  return (
    <div>
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        sx={{ color: starColor }} 
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </div>
  );
};

export default ReadOnlyRating;
