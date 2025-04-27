import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   data: {}
}

export const adminDataSlice = createSlice({
   name: "adminData",
   initialState,
   reducers: {
      setData: (state, action) => {
         state.data = action.payload;
      },
      clearData: () => {
         return initialState;
      }
   }
});

export const {
   setData,
   clearData
} = adminDataSlice.actions;

export default adminDataSlice.reducer;