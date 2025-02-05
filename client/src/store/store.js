import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import msgReducer from "./slices/messages";
import adminDataReducer from "./slices/adminData";

const store = configureStore({
   reducer: {
      user: userReducer,
      messages: msgReducer,
      adminData: adminDataReducer
   }
});

export { store };