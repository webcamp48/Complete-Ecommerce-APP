import React from 'react'

const ChipBadge = ({ background = "#f54337", text = 'Sale'}) => {
  return (
    <span className='chip-badges' style={{ background : background}}>{text}</span>
  )
}

export default ChipBadge;