import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `get-all-users`,
        method: `GET`,
        credentials: `include` as const,
      }),
    }),
    //     ~ get all orders
    getOrders: builder.query({
      query: () => ({
        url: `get-all-orders`,
        method: `GET`,
        credentials: `include` as const,
      }),
    }),

    // ~ get all notifications
    getNotifications: builder.query({
      query: () => ({
        url: `get-all-notifications`,
        method: `GET`,
        credentials: `include` as const,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetOrdersQuery, useGetNotificationsQuery } =
  adminApi;
