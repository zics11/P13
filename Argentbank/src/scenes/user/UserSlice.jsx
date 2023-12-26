import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { getState }) => {
    const token = getState().signIn.token
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du profil')
    }
    return await response.json()
  }
)

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { getState }) => {
    const token = getState().signIn.token
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du profil')
    }

    return await response.json()
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    body: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.body = action.payload.body
        localStorage.setItem('userProfile', JSON.stringify(action.payload.body)) // Stocker les données du profil dans localStorage
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.body = action.payload.body
        localStorage.setItem('userProfile', JSON.stringify(action.payload.body))
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer
