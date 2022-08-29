import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Mobile.scss'
import brand from '../../assets/icons/brand.svg'

const Mobile = () => {
    const navigate = useNavigate();
    return (
        <div className="unavailable">
            <img src={brand} alt="" style={{padding: "20px 0px 40px 0px"}}/>
            <span className="text-mask">Trying to code in your mobile phone?</span>
            <span className="text-mask">Its coming to mobile devices soon.</span>
            <span className="text-mask">Stay tuned :)</span>
            <button onClick={()=>navigate(-1)}>Go Back</button>
        </div>
    )
}

export default Mobile