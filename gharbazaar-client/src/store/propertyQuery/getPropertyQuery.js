import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { filterProperties, getPropertyById as getMockPropertyById, getTopRatedProperties, mockProperties } from "../../data/mockProperties";

// Custom base query with mock data fallback
const baseQueryWithFallback = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  // If API fails or baseURL is not set, use mock data
  if (result.error || !import.meta.env.VITE_BASE_URL) {
    console.log("⚠️ Using mock data - API unavailable");
    return { data: null, error: result.error, useMock: true };
  }

  return result;
};

export const getProperty = createApi({
  reducerPath: "getProperty",
  baseQuery: baseQueryWithFallback,

  tagTypes: ["Bookmark", "Property", "view", "PropertyStatus","Bookmark1"],

  endpoints: (builder) => ({
    getProperties: builder.query({
      queryFn: async (arg, api) => {
        try {
          console.log('🔍 getProperties: Attempting API call...');
          const result = await baseQueryWithFallback(`/top-rated`, api, {});
          
          if (result.error || result.useMock) {
            console.log('✅ getProperties: Using mock data');
            const mockData = getTopRatedProperties();
            console.log('📦 Mock properties count:', mockData.length);
            console.log('📦 Mock properties:', mockData);
            return { data: mockData };
          }
          
          console.log('✅ getProperties: Using API data');
          return { data: result.data };
        } catch (error) {
          console.log('❌ getProperties: Error, falling back to mock data', error);
          const mockData = getTopRatedProperties();
          console.log('📦 Mock properties count:', mockData.length);
          return { data: mockData };
        }
      },
      providesTags: ["Property", "Bookmark"],
    }),

    getPropertiesCategories: builder.query({
      query: ({ type }) => `/category?type=${type}`,
    }),

    getOffers: builder.query({
      query: () => `/offers`,
    }),

    getTopRatesPropertyById: builder.query({
      queryFn: async (arg, api) => {
        try {
          console.log('🔍 getTopRatesPropertyById called with:', arg);
          
          const baseQuery = baseQueryWithFallback;
          const params = new URLSearchParams({
            page: arg.page || 1,
            limit: 8,
          });
          if (arg.type && arg.type !== "all") params.append("type", arg.type);
          if (arg.city && arg.city !== "all") params.append("city", arg.city);
          
          const result = await baseQuery(
            `/getTopRateByType?${params.toString()}`,
            api,
            {}
          );

          if (result.error || result.useMock) {
            console.log('✅ Using mock data for filtering');
            const mockData = filterProperties({
              type: arg.type,
              city: arg.city,
              page: arg.page || 1,
              limit: 8,
            });
            console.log('📦 Filtered mock data:', mockData);
            return { data: mockData };
          }

          console.log('✅ Using API data');
          return { data: result.data };
        } catch (error) {
          console.log('❌ Error in getTopRatesPropertyById, using mock:', error);
          const mockData = filterProperties({
            type: arg.type,
            city: arg.city,
            page: arg.page || 1,
            limit: 8,
          });
          console.log('📦 Fallback mock data:', mockData);
          return { data: mockData };
        }
      },
      providesTags: ["Bookmark1"],
    }),

    getPropertiesByCategory: builder.query({
      queryFn: async (arg, api) => {
        try {
          const { type, city, page = 1 } = arg;
          const result = await baseQueryWithFallback(
            `/getPropertyBycategory?type=${type}&city=${city}&page=${page}&limit=8`,
            api,
            {}
          );
          
          if (result.error || result.useMock) {
            return {
              data: filterProperties({ type, city, page, limit: 8 }),
            };
          }
          return { data: result.data };
        } catch (error) {
          const { type, city, page = 1 } = arg;
          return {
            data: filterProperties({ type, city, page, limit: 8 }),
          };
        }
      },

      serializeQueryArgs: ({ queryArgs }) => {
        const { type, city } = queryArgs;
        return { type, city };
      },

      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) return newItems;
        currentCache.data.push(...newItems.data);
        currentCache.hasNextPage = newItems.hasNextPage;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getPropertyById: builder.query({
      queryFn: async (arg, api) => {
        try {
          console.log('🔍 getPropertyById called with ID:', arg.id);
          
          const result = await baseQueryWithFallback(
            `/getPropertyById/${arg.id}`,
            api,
            {}
          );
          
          if (result.error || result.useMock) {
            console.log('✅ Using mock property by ID');
            const mockProp = getMockPropertyById(arg.id);
            console.log('📦 Mock property:', mockProp);
            // Return same structure as API: { data: { data: property } }
            return { data: { data: mockProp } };
          }
          
          console.log('✅ Using API property');
          return { data: result.data };
        } catch (error) {
          console.log('❌ Error in getPropertyById, using mock:', error);
          const mockProp = getMockPropertyById(arg.id);
          console.log('📦 Fallback mock property:', mockProp);
          return { data: { data: mockProp } };
        }
      },
      providesTags: ["Property", "view", "Bookmark"],
    }),

    getBookmark: builder.query({
      query: () => ({
        url: "/getbookmark",
        method: "GET",
      }),
      providesTags: ["Bookmark"],
    }),

    // ✅ ONLY CHANGE: removed "Property" from invalidatesTags
    toggleBookmark: builder.mutation({
      query: (propertyId) => ({
        url: "/bookmark",
        method: "POST",
        body: { propertyId },
      }),
      invalidatesTags: ["Bookmark", "Bookmark1"],
    }),

    updateview: builder.mutation({
      query: (propertyId) => ({
        url: `/view/${propertyId}`,
        method: "POST",
      }),
      invalidatesTags: ["view"],
    }),
    getPendingProperty: builder.query({
      query: () => ({
        url: "/pendingProperty",
        method: "GET",
      }),

      providesTags: ["PropertyStatus"],
    }),

    updateStatusProperty: builder.mutation({
      query: ({ propertyId, status, rejectionReason }) => ({
        url: `/updateProperty/${propertyId}`,
        method: "PUT",

        body: {
          status,
          rejectionReason,
        },
      }),

      invalidatesTags: ["PropertyStatus"],
    }),
  }),
});

export const {
  useGetPropertyByIdQuery,
  useGetPropertiesQuery,
  useGetPropertiesCategoriesQuery,
  useGetOffersQuery,
  useGetTopRatesPropertyByIdQuery,
  useGetPropertiesByCategoryQuery,
  useToggleBookmarkMutation,
  useGetBookmarkQuery,
  useUpdateviewMutation,
  useGetPendingPropertyQuery,
  useUpdateStatusPropertyMutation,
} = getProperty;
