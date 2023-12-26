import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './scenes/signIn/SignInSlice'
import userReducer from './scenes/user/UserSlice'

const preloadedUserProfile = localStorage.getItem('userProfile')

const preloadedState = {
  signIn: {
    token: localStorage.getItem('authToken') || null,
    user: null,
    error: null,
  },
  user: {
    body: preloadedUserProfile ? JSON.parse(preloadedUserProfile) : null,
    error: null,
  },
}

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    user: userReducer,
  },
  preloadedState,
})

export default store
