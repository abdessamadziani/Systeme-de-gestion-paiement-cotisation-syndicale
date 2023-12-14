import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  const ownersApi = createApi({
  reducerPath: "ownersApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),

  endpoints: (builder) => ({
    getAllOwners: builder.query({
      query: () => `owners`,

    }),
  }),
});

export default ownersApi
export  const { useGetAllOwnersQuery } = ownersApi;