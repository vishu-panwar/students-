// ⚠️ Adjust this import to point at YOUR base api slice — the same one that
// `useGetAdvertisementQuery` (in getAdvertismentQuery.js) injects into, so
// cache tags/invalidation work across both files.
import { apiSlice } from "../apiSlice"; // <-- update this path

export const heroBannerAdminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // List all banners (active + inactive) for the admin panel
    getAllHeroBannersAdmin: builder.query({
      query: () => ({ url: "/hero-banners/admin", method: "GET" }),
      providesTags: ["HeroBanner"],
    }),

    // Create — expects FormData: image (file), title, link
    createHeroBanner: builder.mutation({
      query: (formData) => ({
        url: "/hero-banners/admin",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["HeroBanner", "Advertisement"],
    }),

    // Update — expects { id, formData } where formData may or may not include a new image
    updateHeroBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/hero-banners/admin/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["HeroBanner", "Advertisement"],
    }),

    deleteHeroBanner: builder.mutation({
      query: (id) => ({
        url: `/hero-banners/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HeroBanner", "Advertisement"],
    }),

    // order: [{ id, order }, ...]
    reorderHeroBanners: builder.mutation({
      query: (order) => ({
        url: "/hero-banners/admin/reorder",
        method: "PATCH",
        body: { order },
      }),
      invalidatesTags: ["HeroBanner", "Advertisement"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllHeroBannersAdminQuery,
  useCreateHeroBannerMutation,
  useUpdateHeroBannerMutation,
  useDeleteHeroBannerMutation,
  useReorderHeroBannersMutation,
} = heroBannerAdminApi;

// Note: make sure "HeroBanner" and "Advertisement" are registered in your
// base apiSlice's `tagTypes` array, and that getAdvertismentQuery.js's
// getAdvertisement endpoint has `providesTags: ["Advertisement"]` so the
// public Hero carousel refetches automatically after admin changes.