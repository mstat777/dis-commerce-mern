import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   msg: "",
   logMsg: "",
   errMsg: ""
}

export const msgSlice = createSlice({
   name: "messages",
   initialState,
   reducers: {
      setMsg: (state, action) => {
         state.msg = action.payload;
      },
      setLogMsg: (state, action) => {
         state.logMsg = action.payload;
      },
      setErrMsg: (state, action) => {
         state.errMsg = action.payload;
      },
      clearAllMsg: () => {
         return initialState;
      }
   }
});

export const {
   setMsg,
   setLogMsg,
   setErrMsg,
   clearAllMsg
} = msgSlice.actions;

export default msgSlice.reducer;