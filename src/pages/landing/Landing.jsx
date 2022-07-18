import React, { useState } from 'react'
import './Landing.scss'
import brand from '../../assets/icons/brand.svg'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

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

    const animationConfiguration = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    window.addEventListener('scroll', handleScroll);

    return (
        <motion.div className='landing-con'
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}>
            
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

                            <button onClick={()=>navigate("/playground")}>
                                Start Coding Now
                            </button>
                        </div>
                    </div>
                </section>

                <section className='app-desc'>
                    
                </section>
            </main>
        </motion.div>
    )
}

export default Landing