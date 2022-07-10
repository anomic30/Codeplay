import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing'
import Signup from './pages/signup/Signup';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
