import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),

  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => `payments`,

    }),
  }),
});

export default paymentsApi
export  const { useGetAllPaymentsQuery } = paymentsApi;