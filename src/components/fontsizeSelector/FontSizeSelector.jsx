import React from 'react'
import './FontSizeSelector.scss'

const FontSizeSelector = ({setFontSize}) => {
  return (
    <div className='size-con'>
        <span>Font Size:</span>
        <input type="number" defaultValue={14} onChange={(e)=>{setFontSize(e.target.value)}}/>
    </div>
  )
}

export default FontSizeSelector