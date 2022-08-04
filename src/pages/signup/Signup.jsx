import React, { useContext, useEffect, useState } from 'react'
import './Signup.scss'
import brand from '../../assets/icons/brand.svg'
import rocket_men from '../../assets/images/rocket-men.png'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { magic } from '../../utils/magic';
import { motion } from 'framer-motion';
import Axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && user.issuer && navigate('/dashboard');
    }, [user, navigate]);

    const handleAuth = async () => {
        try {
            // setDisabled(true);

            // Trigger Magic link to be sent to user
            let didToken = await magic.auth.loginWithMagicLink({ email });

            // Validate didToken with server
            const res = await Axios.post(`${import.meta.env.VITE_APP_SERVER}/login`, {},
                { headers: { Authorization: `Bearer ${didToken}` } }
            );

            if (res.status === 200) {
                // Set the UserContext to the now logged in user
                let userMetadata = await magic.user.getMetadata();
                await setUser(userMetadata);
                let newDidToken = await magic.user.getIdToken({ lifespan: 24 * 60 * 60 * 7 });
                window.localStorage.setItem("didToken", newDidToken);
                console.log(userMetadata);
                navigate('/dashboard');

                const resp = await Axios.post(`${import.meta.env.VITE_APP_SERVER}/register`,
                    { magic_id: userMetadata.issuer, email: userMetadata.email },
                    { headers: { Authorization: `Bearer ${newDidToken}` } }
                )
                if (resp.status === 200) {
                    console.log(resp.data);
                }
            }
        } catch (error) {
            // setDisabled(false);
            console.log(error);
        }
    }

    const animationConfiguration = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <motion.div className='signup-con'
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
        >
            <header>
                <img src={brand} alt="Code play" onClick={() => navigate("/")} />
            </header>

            <section>
                <motion.div className="left-con">
                    <img src={rocket_men} alt="" />
                </motion.div>
                <div className="right-con">
                    <h2>Get started!</h2>
                    <div className="desc">
                        <p>Codeplay is Free Forever.</p>
                        <p>No Credit Card Required.</p>
                    </div>
                    <br />
                    <input type="text" placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} />

                    {/* <button onClick={handleAuth}>
                        Login
                    </button> */}
                </div>
            </section>

        </motion.div>
    )
}

export default Signup