import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeDocumentsApi = createApi({
  reducerPath: "employeeDocumentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["EmployeeDocument"],
  endpoints: (builder) => ({
    // Employee's own documents
    getMyDocuments: builder.query({
      query: () => "/employee-documents/mine",
      providesTags: ["EmployeeDocument"],
    }),

    // FormData: file (required), fileName (optional), category (optional)
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/employee-documents",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["EmployeeDocument"],
    }),

    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/employee-documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmployeeDocument"],
    }),

    // Admin — every employee's documents, employee field populated with name/email
    getAllDocumentsAdmin: builder.query({
      query: () => "/employee-documents/admin",
      providesTags: ["EmployeeDocument"],
    }),
  }),
});

export const {
  useGetMyDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useGetAllDocumentsAdminQuery,
} = employeeDocumentsApi;