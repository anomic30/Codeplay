import React from 'react'
import './Navbar.scss'
import brand from '../../assets/icons/brand.svg'

const Navbar = () => {
    return (
        <header>
            <img src={brand} alt="Code play" onClick={() => navigate("/")} />
        </header>
    )
}

export default Navbar