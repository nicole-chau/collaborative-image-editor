import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import SignUp from './components/user/SignUp'
import LogIn from './components/user/LogIn'
import HomePage from './components/HomePage'
import Edit from './components/Edit'

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  </Router>
)

export default App
