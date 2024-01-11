// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserProfile, updateUserProfile } from './UserSlice'
import { logout } from '../signIn/SignInSlice'
import '../../styles/Index.css'
import logo from '../../assets/argentBankLogo.png'
import userCircle from '../../assets/circle-user-solid.svg'
import signOutIcon from '../../assets/right-from-bracket-solid.svg'

function User() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => !!state.signIn.token) // Remplacez 'auth.token' par le chemin approprié dans votre store
  const profile = useSelector((state) => state.user.body)
  const [isEditing, setIsEditing] = useState(false)
  const [editedFirstName, setEditedFirstName] = useState('')
  const [editedLastName, setEditedLastName] = useState('')

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Error') // Redirige vers la page d'erreur
    }
  }, [isLoggedIn, navigate])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedFirstName(profile.firstName)
    setEditedLastName(profile.lastName)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSubmitEdit = () => {
    dispatch(
      updateUserProfile({
        firstName: editedFirstName,
        lastName: editedLastName,
      })
    )
    setIsEditing(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/sign-in')
  }

  return (
    <div className="body">
      <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div className="main-nav-user">
          <a className="main-nav-item" href="">
            <img className="" src={userCircle} alt="User icon" />
            {profile ? <p>{profile.firstName}</p> : <div>Loading...</div>}
          </a>
          <a className="main-nav-item" onClick={handleLogout}>
            <img className="" src={signOutIcon} alt="User icon" />
            <p>Sign Out</p>
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          {isEditing ? (
            <div className="edit">
              <h1>Welcome back</h1>
              <div className="edit-input">
                <input
                  type="text"
                  value={editedFirstName}
                  onChange={(e) => setEditedFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={editedLastName}
                  onChange={(e) => setEditedLastName(e.target.value)}
                />
              </div>
              <div className="edit-input">
                <button onClick={handleSubmitEdit} className="edit-button">
                  Valider
                </button>
                <button onClick={handleCancel} className="edit-button">
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1>Welcome back, {profile?.firstName}</h1>
              <button className="edit-button" onClick={handleEdit}>
                Edit Name
              </button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  )
}

export default User
