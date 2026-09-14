import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getAdvertisement = createApi({
  reducerPath: "getAdvertisement",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Advertisement"],
  endpoints: (builder) => ({
    getAdvertisement: builder.query({
      query: () => `/getAdvertisement`,
      providesTags: ["Advertisement"],
    }),
  }),
});

export const { useGetAdvertisementQuery } = getAdvertisement;