import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

const labels = {
  0.5: 'Useless',
  1: 'Poor',
  1.5: 'Ok',
  2: 'Fair',
  2.5: 'Average',
  3: 'Good',
  3.5: 'Very Good',
  4: 'Great',
  4.5: 'Excellent',
  5: 'Outstanding',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const HoverRating = () => {
  const [value, setValue] = useState(2.5);
  const [hover, setHover] = useState(-1);

  return (
    <div>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
};

export default HoverRating;
