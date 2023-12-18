import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    appartements: []
  };
  
  export const appartementsSlice = createSlice({
    name: 'appartements',
    initialState,
    reducers: {
      addAppartement: (state, action) => {
        state.appartements.push(action.payload);
         console.log("**************************************")
    console.log("done")
    console.log("**************************************")
      },
      // other reducers...
    },
  });

    export const {addAppartement} = appartementsSlice.actions;
    export default appartementsSlice.reducer




