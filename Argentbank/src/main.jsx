import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './scenes/index/Index'
import SignIn from './scenes/signin/SignIn'
import User from './scenes/user/User'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/index" element={<Index />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
