import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.scss';
import Login from './login';
import Signup from './signup';

function App() {
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

export default App;
