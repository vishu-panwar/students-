import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkkyc = createApi({
  reducerPath: "checkkyc",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["KYC"],

  endpoints: (builder) => ({

    checkkyc: builder.query({

      query: () => ({
        url: "/kycverify",
        method: "GET",
      }),
      providesTags: ["KYC"]
    }),
   getkycPending: builder.query({
  query: ({ status = "Pending", page = 1, limit = 5 }) => ({
    url: "/kycpending",
    method: "GET",
    params: { status, page, limit }, // Passes parameters dynamically as ?status=...&page=...&limit=...
  }),
  providesTags: ["KYC"]
}),
     updatekyc: builder.mutation({

      query: ({id,status,rejectionReason}) => ({
        url: `/update-status/${id}`,
        method: "PUT",
        body:{
          status,
          rejectionReason
        }
      }),

      invalidatesTags:["KYC"]

    }),
    submitKyc: builder.mutation({
  query: (formData) => ({
    url: "/submit",
    method: "POST",
    body: formData,
  }),
  invalidatesTags: ["KYC"],
}),
  }),
});

export const { useCheckkycQuery,useGetkycPendingQuery,useUpdatekycMutation,useSubmitKycMutation} = checkkyc;