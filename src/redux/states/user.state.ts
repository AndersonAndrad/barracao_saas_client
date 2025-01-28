import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
  name: 'user',
  initialState: {
    data: {},
    loged: false
  },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload
    },
    setIsLogged: (state, action) => {
      state.loged = action.payload
    }
  }
})

export const { addUser, setIsLogged } = userSlicer.actions;

export const userState = userSlicer.reducer;