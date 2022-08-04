import React from 'react'
import './Navbar.scss'
import brand from '../../assets/icons/brand.svg'
import LanguageDropdown from '../languageDropdown/LanguageDropdown'
import ThemeDropdown from '../themeDropdown/ThemeDropdown'
import { useNavigate } from 'react-router-dom'
import FontSizeSelector from '../fontsizeSelector/FontSizeSelector'
import dashboard_icon from '../../assets/icons/dashboard.png'

const Navbar = ({ handleLanguageChange, handleThemeChange, setFontSize, theme }) => {
    const navigate = useNavigate()
    return (
        <header className='app-nav'>
            <div className='play-nav'>
                <img src={brand} alt="Code play" onClick={() => navigate("/")} />
                <div className="nav-controls">
                    <LanguageDropdown handleLanguageChange={handleLanguageChange} />
                    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                    <FontSizeSelector setFontSize={setFontSize}/>
                </div>
            </div>
            <div className="acc">
                <img src={dashboard_icon} alt="Home" onClick={()=>navigate("/dashboard", { replace: true })}/>
            </div>
        </header>
    )
}

export default Navbar