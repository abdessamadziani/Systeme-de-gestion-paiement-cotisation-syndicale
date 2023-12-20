import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),

  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => `payments`,

    }),
    getPaymentById: builder.query({
      query: (paymentId) =>({
        url: `payments/${paymentId}`,
        method:"GET"
      })
    }),
    createPayment: builder.mutation({
      query: (newPayment) => ({
        url: "payments/create/",
        method: "POST",
        body: newPayment,
      }),
    }),
    updatePayment: builder.mutation({
      query: (body) =>({
        url: `payments/edit/${body.paymentId}`,
        method:"PUT",
        body: body,
      })
    }),
    deletePayment: builder.mutation({
      query: (paymentId) =>({
        url: `payments/delete/${paymentId}`,
        method:"DELETE"
      })
    }),

  }),
 
});

export default paymentsApi
export  const { useGetAllPaymentsQuery,useCreatePaymentMutation,useGetPaymentByIdQuery,useUpdatePaymentMutation,useDeletePaymentMutation } = paymentsApi;