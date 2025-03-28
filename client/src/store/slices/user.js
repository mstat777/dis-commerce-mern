import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLogged: false,
   email: "johndoe@johndoe.com",
   id: 0,
   roles: ""
}

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      signin: (action) => {
         console.log(action.payload);
         return {
            isLogged: true,
            email: action.payload.email,
            id: action.payload.id,
            roles: action.payload.roles
         }
      },
      signout: () => {
         return initialState;
      },
   }
});

export const {
   signin,
   signout,
} = userSlice.actions;

export default userSlice.reducer;