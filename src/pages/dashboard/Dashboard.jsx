import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { magic } from '../../utils/magic';
import './Dashboard.scss'

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
            <h1>This is the dashboard</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard