import React from 'react';
import './SectionTitle.css';

const SectionTitle = ({text1,text2}) => {
  return (
    <div className="section-title">
        <span className='span-heading'>{text1} Products</span>
        <h3>Discover Our <span>{text2}</span></h3>
        <p>Explore the most {text1} Product that our customers love in <span className='span-heading'> All World</span></p>
  </div>
  )
}

export default SectionTitle