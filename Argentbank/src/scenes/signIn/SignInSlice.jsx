// src/slices/signInSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const postUserLogin = createAsyncThunk(
  'signIn/postUserLogin',
  async ({ email, password }) => {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      throw new Error('Erreur de connexion')
    }
    return await response.json()
  }
)

const initialState = {
  user: null,
  token: null,
  error: null,
}

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('authToken') // Supprimer le token du localStorage
      localStorage.removeItem('userProfile')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserLogin.fulfilled, (state, action) => {
        state.token = action.payload.body.token
        localStorage.setItem('authToken', action.payload.body.token) // Stocker le token dans localStorage
      })
      .addCase(postUserLogin.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})
export const { logout } = signInSlice.actions

export default signInSlice.reducer
