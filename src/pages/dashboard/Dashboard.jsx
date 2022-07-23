import React, { useContext } from 'react'
import './Dashboard.scss'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { magic } from '../../utils/magic';
import brand from '../../assets/icons/brand.svg'
import user_icon from '../../assets/icons/user.svg'
import Card from '../../components/card/Card';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const logout = () => {
        magic.user.logout().then(() => {
            setUser({ user: null });
            window.localStorage.removeItem("didToken");
            navigate('/');
        })
    }
    return (
        <div className='dashboard-con'>
            <header>
                <img src={brand} alt="Code play" onClick={() => navigate("/")} />
                <div className="logout-box">
                    <img src={user_icon} alt="User" />
                    <button onClick={logout}>Logout</button>
                </div>

            </header>

            <p>Your Codes</p>
            <section className='my-codes'>
                <Card />
                <Card />
                <Card />
                <Card/>
            </section>
        </div>
    )
}

export default Dashboard