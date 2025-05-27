import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import TOTPLogin from './components/TOTPLogin'
import Dashboard from './components/Dashboard'
import EnrollTOTP from './components/TOTPEnroll'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/enroll-totp" element={<EnrollTOTP />} />
        <Route path="/mfa-login" element={<TOTPLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
