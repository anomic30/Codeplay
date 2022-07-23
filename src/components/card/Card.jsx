import React from 'react'
import './Card.scss'
import kebab from '../../assets/icons/kebab.svg'

const Card = () => {
    return (
        <div className='card-con'>
            <div className="options">
                <img src={kebab} alt="" />
            </div>
            <div className="sub-con">
                <div className="lang-icon">
                    <img src="https://img.icons8.com/ios/64/23F7ED/c-plus-plus.png" />
                </div>
                <div className="file-info">
                    <p className='file-name'>Fibonacci.cpp</p>
                    <p className='lines'>Total lines: <span>45</span></p>
                </div>
                <div className="file-hist">
                    <p>Edited: <span>Today</span></p>
                    <p>Created: <span>14th Jul</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card