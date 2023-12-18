import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    clients: []
  };
  
  export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
      addClient: (state, action) => {
        state.clients.push(action.payload);
         console.log("**************************************")
    console.log("done")
    console.log("**************************************")
      },
      // other reducers...
    },
  });

    export const {addClient} = clientsSlice.actions;
    export default clientsSlice.reducer




