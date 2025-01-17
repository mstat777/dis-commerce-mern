import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
//import productReducer from "./slices/product";

const store = configureStore({
   reducer: {
      user: userReducer,
      //product: productReducer,
   }
});

export { store };