import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  const appartementsApi = createApi({
  reducerPath: "appartementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),

  endpoints: (builder) => ({
    getAllAppartements: builder.query({
      query: () => `appartements`,

    }),
    getAppartementNumberByBuilding: builder.query({
      query: (buildingName) =>({
        url: `appartements/roomNumber/${buildingName}`,
        method:"GET"
      })
  }),
  getOwnerByAppartementNumber: builder.query({
    query: (roomNumber) =>({
      url: `appartements/owner/${roomNumber}`,
      method:"GET"
    })
}),
getAppartementById: builder.query({
  query: (appartementId) =>({
    url: `appartements/${appartementId}`,
    method:"GET"
  })
}),

    createAppartement: builder.mutation({
      query: (newAppartement) => ({
        url: "appartements/create/",
        method: "POST",
        body: newAppartement,
      }),
    }),
    updateAppartement: builder.mutation({
      query: (body) =>({
        url: `appartements/edit/${body.appartementId}`,
        method:"PUT",
        body: body,
      })
    }),
    deleteAppartement: builder.mutation({
      query: (appartementId) =>({
        url: `appartements/delete/${appartementId}`,
        method:"DELETE"
      })
    }),

  }),
});

export default appartementsApi
export  const { useGetAllAppartementsQuery,useCreateAppartementMutation,useGetAppartementNumberByBuildingQuery,useGetOwnerByAppartementNumberQuery,useGetAppartementByIdQuery,useUpdateAppartementMutation,useDeleteAppartementMutation} = appartementsApi;