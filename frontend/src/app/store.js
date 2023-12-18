import { configureStore } from "@reduxjs/toolkit";
// import {apiSlice}  from "./api/apiSlice";
// import authReducer from "../features/auth/redux/authSlice";

// import menuReducer from "../features/menu/redux/menuSlice";
// import { menuApiSlice } from "../features/menu/redux/menuApiSlice";
 import clientsApi  from '../features/home/redux/clientsAPI.js'; 
 import clientsReducer from "../features/home/redux/clientsSlice.js"
 import appartementsApi  from '../features/home/redux/appartementsAPI.js'; 
 import appartementsReducer from "../features/home/redux/appartementsAPI.js"

  import  paymentsApi  from '../features/home/redux/paymentsAPI.js'; 
// import  cartReducer  from "../features/products/redux/cartSlice.js";

const store = configureStore({
  reducer: {
    //  [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authReducer,
    appartements: appartementsReducer,
    clients: clientsReducer,  
     [clientsApi.reducerPath]: clientsApi.reducer,
     [appartementsApi.reducerPath]: appartementsApi.reducer,
     [paymentsApi.reducerPath]: paymentsApi.reducer,



  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientsApi.middleware)
      .concat(appartementsApi.middleware)
      .concat(paymentsApi.middleware),
      

    //    .concat(apiSlice.middleware),
    //   .concat(apiSlice.middleware, usersApi.middleware),

  devTools: true,
});





export default store;

