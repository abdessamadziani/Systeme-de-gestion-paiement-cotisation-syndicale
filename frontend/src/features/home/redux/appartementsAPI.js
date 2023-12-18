import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  const appartementsApi = createApi({
  reducerPath: "appartementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),

  endpoints: (builder) => ({
    getAllAppartements: builder.query({
      query: () => `appartements`,

    }),
    createAppartement: builder.mutation({
      query: (newAppartement) => ({
        url: "appartements/create/",
        method: "POST",
        body: newAppartement,
      }),
    }),

  }),
});

export default appartementsApi
export  const { useGetAllAppartementsQuery,useCreateAppartementMutation} = appartementsApi;