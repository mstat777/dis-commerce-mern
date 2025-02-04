import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import msgReducer from "./slices/messages";

const store = configureStore({
   reducer: {
      user: userReducer,
      messages: msgReducer,
   }
});

export { store };