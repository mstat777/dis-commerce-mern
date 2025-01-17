import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLogged: false,
   email: "johndoe@johndoe.com",
   userID: 0,
   accountType: ""
}

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      signin: (state, action) => {
         state = {
            isLogged: true,
            email: action.payload.email,
            userID: action.payload.userID,
            accountType: action.payload.accountType
         }
      },
      signout: (state) => {
         state = {
            isLogged: false,
            email: "johndoe@johndoe.com",
            userID: 0,
            accountType: ""
         }
      },
   }
});

export const {
   signin,
   signout,
} = userSlice.actions;

export default userSlice.reducer;