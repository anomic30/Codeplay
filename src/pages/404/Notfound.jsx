import React from 'react'
import './Notfound.scss'
import brand from '../../assets/icons/brand.png'
import { useNavigate } from 'react-router-dom';
import error from '../../assets/images/error.svg'

const Notfound = () => {
    const navigate = useNavigate();

    return (
        <div className='notfound-con'>
            <header>
                <img src={brand} alt="Code play" onClick={() => navigate("/")} />
            </header>

            <section>
                <img className="error-img" src={error} alt="404 Not Found!" />
                <p>Oops! Looks like you are lost in space.</p>
                <p>Let's head back
                    <span onClick={() => navigate("/")} style={{ color: "#3de8e7", cursor: "pointer" }}> home</span>
                    .</p>
            </section>

        </div>
    )
}

export default Notfound