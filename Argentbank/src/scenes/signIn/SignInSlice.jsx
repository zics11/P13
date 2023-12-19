import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postUserLogin = createAsyncThunk( 'signIn/postUserLogin' , async () => {
    return await (async () => {
        const response = await fetch('localhost:3001/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify({ email: username, password: password }),
        });
        return await response.json();
    })()
})

export const SignInSlice = createSlice({
    name: 'Signin',
    initialState: {
    },
    reducers: {},

    }
})