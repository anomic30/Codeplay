import React, { useState } from 'react'
import './Landing.scss'
import brand from '../../assets/icons/brand.png'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()

    //darken the header when scrolled down
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    window.addEventListener('scroll', handleScroll);

    return (
        <div className='landing-con'>
            <header className={scrolled? "darken": null}>
                <img src={brand} alt="Code play" />
                <button id='signup-btn' onClick={()=>navigate("/auth")}>
                    Sign up
                </button>
            </header>

            <main>
                <section className='hero-con'>
                    <div className="row">
                        <div className="desc">
                            <h1>Code Compilation <br/>Made easy.</h1>
                            <p>
                                No need to install compilers anymore! Codeplay allows you to compile your code and run it on your browser.
                                Sync your code across multiple devices and share it with your friends.
                            </p>

                            <button>
                                Start Coding Now
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Landing