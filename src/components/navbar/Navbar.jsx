import React from 'react'
import './Navbar.scss'
import brand from '../../assets/icons/brand.svg'
import LanguageDropdown from '../languageDropdown/LanguageDropdown'

const Navbar = ({ handleLanguageChange }) => {
    return (
        <header>
            <img src={brand} alt="Code play" onClick={() => navigate("/")} />
            <LanguageDropdown handleLanguageChange={handleLanguageChange}/>
        </header>
    )
}

export default Navbar