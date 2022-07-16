import React from 'react'
import './Navbar.scss'
import brand from '../../assets/icons/brand.svg'
import LanguageDropdown from '../languageDropdown/LanguageDropdown'
import ThemeDropdown from '../themeDropdown/ThemeDropdown'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ handleLanguageChange, handleThemeChange, theme }) => {
    const navigate = useNavigate()
    return (
        <header className='app-nav'>
            <div className='play-nav'>
                <img src={brand} alt="Code play" onClick={() => navigate("/")} />
                <div className="nav-controls">
                    <LanguageDropdown handleLanguageChange={handleLanguageChange} />
                    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                </div>
            </div>
            <div className="acc">
                <p></p>
            </div>
        </header>
    )
}

export default Navbar