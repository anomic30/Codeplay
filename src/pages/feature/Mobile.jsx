import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Mobile.scss'

const Mobile = () => {
    const navigate = useNavigate();
    return (
        <div className="unavailable">
            <span className="text-mask">Coming to mobile devices soon!</span>
            <button onClick={()=>navigate(-1)}>Go Back</button>
        </div>
    )
}

export default Mobile