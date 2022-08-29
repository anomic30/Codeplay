import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.scss'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { magic } from '../../utils/magic'
import brand from '../../assets/icons/brand.svg'
import user_icon from '../../assets/icons/user.svg'
import logout_icon from '../../assets/icons/logout.svg'
import Card from '../../components/card/Card'
import add_btn from '../../assets/icons/add.png'
import cross from '../../assets/icons/cross.png'
import 'react-responsive-modal/styles.css'
import { v4 as uuidv4 } from 'uuid';
// import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion'
import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const [isVisible, setVisible] = useState(false);
    const [fileName, setFileName] = useState('');
    const [codes, setCodes] = useState([]);

    useEffect(() => {
        if (!user) {
            toast(`Please login to access the dashboard!`, {
                icon: '⚠️',
                style: {
                    borderRadius: '5px',
                    background: '#1a1a1e',
                    color: '#a9acbb',
                },
            });
            navigate('/');
        }
    }, [navigate, user])

    useEffect(() => {
        async function getCodes() {
            try {
                const res = await Axios.get(`${import.meta.env.VITE_APP_SERVER}/getCodes`, { headers: { Authorization: "Bearer " + window.localStorage.getItem('didToken') } });
                setCodes(res.data.codes);
                window.localStorage.setItem("theme", JSON.stringify(res.data.theme));
                console.log(res.data.codes);
            } catch (err) {
                console.log(err);
                if (err.response.status === 401) {
                    toast(`Session expired! Please login again.`, {
                        icon: '⚠️',
                        style: {
                            borderRadius: '5px',
                            background: '#1a1a1e',
                            color: '#a9acbb',
                        },
                    });
                    magic.user.logout().then(() => {
                        window.localStorage.removeItem("didToken");
                        setUser(null);
                        navigate('/');
                        // window.location.reload();
                    })
                }
            }
        }
        getCodes();
    }, [])

    const logout = () => {
        magic.user.logout().then(() => {
            window.localStorage.removeItem("didToken");
            setUser(null);
            toast(`Successfully logged out!`, {
                icon: '✅',
                style: {
                    borderRadius: '5px',
                    background: '#1a1a1e',
                    color: '#a9acbb',
                },
            });
            navigate('/');
        })
    }

    const handleCreateFile = async () => {
        if (fileName.length <= 0) {
            return;
        }
        const code_id = uuidv4();
        const postObj = {
            code_id: code_id,
            code: '',
            language: {},
            file_name: fileName,
            total_lines: 0,
            last_edited: new Date().toISOString(),
            created_at: new Date().toISOString(),
        }
        try {
            const resp = await Axios.post(`${import.meta.env.VITE_APP_SERVER}/createFile`,
                postObj,
                { headers: { Authorization: "Bearer " + window.localStorage.getItem('didToken') } }
            );
            if (resp.status === 200) {
                navigate(`/playground`, { state: postObj });
            }
        } catch (err) {
            console.log(err);
        }
        console.log(user);
    }

    return (
        <motion.div className='dashboard-con'>
            <Toaster />
            <header>
                <img src={brand} alt="Code play" onClick={() => navigate("/")} />
                <div className="logout-box">
                    <Tippy content="Logout" placement="left"><img src={logout_icon} alt="logout" onClick={logout} /></Tippy>
                </div>

            </header>

            
            {codes.length > 0? <><p>Your Codes</p><section className='my-codes'>
                {codes.map((code, idx) => {
                    return <Card key={idx} props={code} setCodes={setCodes} />
                })}
            </section></>: <p>Create a file by clicking the add button at the bottom to save your code.</p>}

            <Tippy content="Add new code" placement="left"><img src={add_btn} alt="Add" className='round-btn' onClick={() => setVisible(true)} /></Tippy>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgb(0 0 0 / 75%)",
                            zIndex: 10000,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                    >
                        <div className="create-file">
                            <div className="create-file-header">
                                <h2>Create File</h2>
                                <img src={cross} alt="Close" onClick={() => setVisible(false)} />
                            </div>
                            <div className="create-file-body">
                                <input type="text"
                                    placeholder='Name your file'
                                    onChange={(e) => setFileName(e.target.value)}
                                />
                            </div>
                            <div className="create-file-btn">
                                <button onClick={handleCreateFile}>Create</button>
                                <button onClick={() => setVisible(false)}>Cancel</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Dashboard