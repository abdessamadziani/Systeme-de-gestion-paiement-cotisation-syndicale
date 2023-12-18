import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




  const ownersApi = createApi({
  reducerPath: "ownersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),

  endpoints: (builder) => ({
    getAllOwners: builder.query({
      query: () => `owners`,

    }),
    
    createOwner: builder.mutation({
      query: (newClient) => ({
        url: "owners/create/",
        method: "POST",
        body: newClient,
      }),
    }),


  }),
});

export default ownersApi
export  const { useGetAllOwnersQuery, useCreateOwnerMutation} = ownersApi;