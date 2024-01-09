// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postUserLogin } from './SignInSlice'
import '../../styles/Index.css'
import logo from '../../assets/argentBankLogo.png'
import { NavLink } from 'react-router-dom'
import userCircle from '../../assets/circle-user-solid.svg'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.signIn.token)
  const error = useSelector((state) => state.signIn.error)

  useEffect(() => {
    if (token) {
      navigate('/user')
    }
  }, [token, navigate])

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberEmail')
    if (storedEmail) {
      setEmail(storedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rememberMe) {
      localStorage.setItem('rememberEmail', email)
    } else {
      localStorage.removeItem('rememberEmail')
    }
    dispatch(postUserLogin({ email, password }))
  }

  return (
    <div className='body'>
      <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <NavLink to="/sign-in" className="main-nav-item">
            <img className="" src={userCircle} alt="User icon" />
            Sign In
          </NavLink>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <img className="" src={userCircle} alt="User icon" />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          {error && <div className="error-message">Erreur: {error}</div>}
        </section>
      </main>{' '}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  )
}

export default SignIn
