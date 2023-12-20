import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




  const ownersApi = createApi({
  reducerPath: "ownersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),

  endpoints: (builder) => ({
    getAllOwners: builder.query({
      query: () => `owners`,

    }),
    getOwnerById: builder.query({
      query: (ownerId) =>({
        url: `owners/${ownerId}`,
        method:"GET"
      })
    }),
    
    createOwner: builder.mutation({
      query: (newClient) => ({
        url: "owners/create/",
        method: "POST",
        body: newClient,
      }),
    }),
    updateOwner: builder.mutation({
      query: (body) =>({
        url: `owners/edit/${body.ownerId}`,
        method:"PUT",
        body: body,
      })
    }),
    deleteOwner: builder.mutation({
      query: (ownerId) =>({
        url: `owners/delete/${ownerId}`,
        method:"DELETE"
      })
    }),


  }),
});

export default ownersApi
export  const { useGetAllOwnersQuery, useCreateOwnerMutation,useGetOwnerByIdQuery,useUpdateOwnerMutation,useDeleteOwnerMutation} = ownersApi;