import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email:"",
  token:"",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
    },
    getUser:(state) => {
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser, getUser } = userSlice.actions

export default userSlice.reducer;