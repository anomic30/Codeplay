import React, { useState } from 'react'
import './Signup.scss'
import brand from '../../assets/icons/brand.png'
import rocket_men from '../../assets/images/rocket-men.png'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className='signup-con'>
            <header>
                <img src={brand} alt="Code play" onClick={()=>navigate("/")}/>
            </header>

            <section>
                <div className="left-con">
                    <img src={rocket_men} alt="" />
                </div>
                <div className="right-con">
                    <h2>Get started!</h2>
                    <div className="desc">
                        <p>Codeplay is Free Forever.</p>
                        <p>No Credit Card Required.</p>
                    </div>
                    <br />
                    {!showLogin? <input type="text" placeholder='Your Name' />: null}
                    <input type="text" placeholder='Your Email' />

                    <button>
                        {showLogin? "Login": "Sign Up"}
                    </button>
                    <p className='mini-text'>Already have an account? <span style={{ color: "#3de8e7" }} onClick={()=>setShowLogin(!showLogin)}>{showLogin? "Sign up": "Login"}</span></p>
                </div>
            </section>


        </div>
    )
}

export default Signup