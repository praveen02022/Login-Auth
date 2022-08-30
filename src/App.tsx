import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.scss';
import Dashoard from './dashboard';
import Login from './login';
import Signup from './signup';

const token = localStorage.getItem('token')
function App() {

  return (


    <div >
      <Router>
        {<Routes>
          token? <Route path="/dashboard" element={<Dashoard />} />:
          <Route path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup/>} />
        </Routes>}

      </Router>

    </div>

  );
}

export default App;
