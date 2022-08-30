import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.scss';
import Dashoard from './dashboard';
import Login from './login';
import Signup from './signup';


function App() {


  const token = localStorage.getItem('token')

  if (token) {

    
    return (
      <div >
        <Router>
          <Routes>
          <Route path="/dashboard" element={<Dashoard />} />
            <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    );
  } else {
    return (
      <div >
        <Router>
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
          </Routes>
        </Router>
      </div>

    );
  }

}

export default App;
