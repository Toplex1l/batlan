import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email:"",
  token:"",
  isAdmin:""
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
      state.isAdmin = action.payload.isAdmin
    },
    getUser:(state) => {
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser, getUser } = userReducer.actions

export default userReducer.reducer;