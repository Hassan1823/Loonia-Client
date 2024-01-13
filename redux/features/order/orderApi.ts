import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({
        productId,
        payment_info,
        hrefNumbers,
        hrefNames,
        hrefPrices,
      }) => ({
        url: `create-order`,
        body: {
          productId,
          payment_info,
          hrefNumbers,
          hrefNames,
          hrefPrices,
        },
        method: `POST`,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
