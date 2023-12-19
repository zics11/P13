import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './scenes/signIn/SignInSlice'
import userReducer from './scenes/user/UserSlice'


export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    user: userReducer,
  },
})

export default store
