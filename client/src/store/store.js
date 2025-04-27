import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import msgReducer from "./slices/messages";
import adminDataReducer from "./slices/adminData";
import cartReducer from "./slices/cart";

const store = configureStore({
   reducer: {
      user: userReducer,
      messages: msgReducer,
      adminData: adminDataReducer,
      cart: cartReducer,
   }
});

export { store };