import { configureStore } from "@reduxjs/toolkit";
// import {apiSlice}  from "./api/apiSlice";
// import authReducer from "../features/auth/redux/authSlice";

// import menuReducer from "../features/menu/redux/menuSlice";
// import { menuApiSlice } from "../features/menu/redux/menuApiSlice";
 import clientsApi  from '../features/home/redux/clientsAPI.js'; 
//  import { usersApi } from '../features/auth/redux/userAPI.js'; 
// import  cartReducer  from "../features/products/redux/cartSlice.js";

const store = configureStore({
  reducer: {
    //  [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authReducer,
    // cart: cartReducer,
    // menu: menuReducer,
    // [menuApiSlice.reducerPath]: menuApiSlice.reducer,
     [clientsApi.reducerPath]: clientsApi.reducer,
    // [usersApi.reducerPath]: usersApi.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientsApi.middleware),

    //    .concat(apiSlice.middleware),
    //   .concat(menuApiSlice.middleware)
    //   .concat(apiSlice.middleware, usersApi.middleware),

  devTools: true,
});





export default store;

