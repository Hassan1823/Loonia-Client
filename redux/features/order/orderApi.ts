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
    addToCart: builder.mutation({
      query: ({ productId, hrefNumbers, hrefNames, hrefPrices }) => ({
        url: `product-order`,
        method: `POST`,
        body: {
          productId,
          hrefNumbers,
          hrefNames,
          hrefPrices,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useAddToCartMutation } = orderApi;
