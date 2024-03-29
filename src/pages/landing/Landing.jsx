import React, { useContext, useEffect, useState } from 'react'
import './Landing.scss'
import brand from '../../assets/icons/brand.svg'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import code_space from '../../assets/images/code-space.png'
import dashboard from '../../assets/images/dashboard.png'
import cpp from "../../assets/icons/cpp.png"
import java from '../../assets/icons/java.png'
import python from '../../assets/icons/python.png'
import javascript from '../../assets/icons/javascript.png'
import swift from '../../assets/icons/swift.png'
import more from '../../assets/icons/more.png'
import insta from '../../assets/icons/insta.svg'
import linkedin from '../../assets/icons/linkedin.svg'
import github from '../../assets/icons/github.svg'
import { UserContext } from '../../contexts/UserContext'
import toast, { Toaster } from 'react-hot-toast';

const Landing = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

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
            transition={{ duration: 0.2 }}>
            <Toaster/>
            <header className={scrolled ? "darken" : null}>
                <img src={brand} alt="Code play" />
                {!user?
                    <button id='signup-btn' onClick={() => navigate("/auth")}>
                        Sign in
                    </button> :
                    <button id='signup-btn' onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </button>
                }
            </header>

            <main>
                <section className='hero-con'>
                    <div className="row">
                        <div className="desc">
                            <h1>Code Compilation <br />Made easy.</h1>
                            <p>
                                No need to install compilers anymore! Codeplay allows you to compile your code and run it on your browser.
                            </p>

                            <button onClick={() => {!user? navigate("/playground") : navigate("/dashboard")}}>
                                Start Coding Now
                            </button>
                        </div>
                    </div>
                </section>

                <section className='app-desc'>
                    <div className="container">
                        <div className="bar" style={{ margin: "0px auto" }}></div>
                        <h2>Customizable Code Spaces</h2>
                        <p>Are you a light or a dark theme user? We got you covered!<br />
                            Choose from an array of over 40+ themes seamlessly.</p>
                        <div className="img-con">
                            <img src={code_space} alt="" />
                        </div>

                    </div>
                </section>

                <section className='features-con'>
                    <div className="container">
                        <div className="row">
                            <div className="col1">
                                <div className="bar"></div>
                                <h3>Use Codeplay For</h3>
                                <p>Type your code effortlessly and compile it on the go.
                                    Codeplay supports over 40+ programming languages.
                                </p>
                                <button onClick={() => {!user? navigate("/playground") : navigate("/dashboard")}}>Lets Code!</button>
                            </div>
                            <div className="col2">
                                <ul>
                                    <li>
                                        <img src={cpp} alt="C++" />
                                        <p>C++</p>
                                    </li>

                                    <li>
                                        <img src={java} alt="Java" />
                                        <p>Java</p>
                                    </li>

                                    <li>
                                        <img src={python} alt="Python" />
                                        <p>Python</p>
                                    </li>

                                    <li>
                                        <img src={javascript} alt="JavaScript" />
                                        <p>JavaScript</p>
                                    </li>

                                    <li>
                                        <img src={swift} alt="Swift" />
                                        <p>Swift</p>
                                    </li>

                                    <li>
                                        <img src={more} alt="More.." />
                                        <p>Languages</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='app-desc'>
                    <div className="container">
                        <div className="bar" style={{ margin: "0px auto" }}></div>
                        <h2>Save & sync your codes across devices</h2>
                        <p>Never lose your code ever again! Codeplay automatically saves your code in the background.<br />
                            Sign in now to use this feature.</p>
                        <div className="img-con">
                            <img src={dashboard} alt="Dashboard" />
                        </div>

                    </div>
                </section>

                <section className='connect-con'>
                    <div className="container">
                        <div className="row" id='connecty'>
                            <div className="col2">
                                <h3>
                                    <div className="bar"></div>
                                    Development <br />is Still in <br />Progress</h3>
                                <p>Codeplay is currently in the alpha stage. I am planning to add more
                                    features soon. Raise an isssue to propose a new feature!
                                </p>
                                <div className="socials">
                                    <a href="https://www.instagram.com/codermav/" target="__blank">
                                        <img src={insta} alt="Instagram" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/anomic/" target="__blank">
                                        <img src={linkedin} alt="LinkedIn" />
                                    </a>
                                    <a href="https://github.com/anomic30" target="__blank">
                                        <img src={github} alt="Github" />
                                    </a>
                                </div>
                            </div>
                            <div className="col3">
                                <img src="https://user-images.githubusercontent.com/63467479/180267331-c55a7796-e611-4c17-8d69-afe546cbeff6.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </section>

                <footer>
                    &copy; 2022 Codeplay - Anom
                </footer>
            </main>
        </motion.div>
    )
}

export default Landing