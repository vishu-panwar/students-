import { getAdvertisement } from "./getAdvertismentQuery";

export const advertisementAdminApi = getAdvertisement.injectEndpoints({
  endpoints: (builder) => ({
    // All banners, including inactive — for the admin management screen
    getAllAdvertisementsAdmin: builder.query({
      query: () => ({ url: "/advertisement/admin", method: "GET" }),
      providesTags: ["Advertisement"],
      // Normalize response — backend may return { advertisements: [] } or { data: [] } or []
      transformResponse: (response) => {
        const list = Array.isArray(response)
          ? response
          : response?.advertisements ?? response?.data ?? [];
        return { advertisements: list };
      },
    }),

    // FormData: image (file, required), title, link
    createAdvertisementAdmin: builder.mutation({
      query: (formData) => ({
        url: "/createAdvertisement",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Advertisement"],
    }),

    // { id, formData } — formData may include a replacement image
    updateAdvertisementAdmin: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/advertisement/admin/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Advertisement"],
    }),

    deleteAdvertisementAdmin: builder.mutation({
      query: (id) => ({
        url: `/advertisement/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Advertisement"],
    }),

    // order: [{ id, order }, ...]
    reorderAdvertisementsAdmin: builder.mutation({
      query: (order) => ({
        url: "/advertisement/admin/reorder",
        method: "PATCH",
        body: { order },
      }),
      invalidatesTags: ["Advertisement"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllAdvertisementsAdminQuery,
  useCreateAdvertisementAdminMutation,
  useUpdateAdvertisementAdminMutation,
  useDeleteAdvertisementAdminMutation,
  useReorderAdvertisementsAdminMutation,
} = advertisementAdminApi;