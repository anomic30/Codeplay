import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing'
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Notfound from './pages/404/Notfound';
import { useEffect, useState } from 'react';
import { magic } from './utils/magic';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      return isLoggedIn
        ? magic.user.getMetadata().then((userData) => setUser(userData))
        : setUser({ user: null });
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Routes>
            <Route path="*" element={<Notfound />} />
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
