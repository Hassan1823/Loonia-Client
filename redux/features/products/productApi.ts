import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "add-product",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllProducts: builder.query({
      query: (data) => ({
        url: "get-products",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `get-product/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getSubCategoriesProducts: builder.query({
      query: (id) => ({
        url: `products-by-sub/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getProductCards: builder.query({
      query: ({ productId, payment_info }) => ({
        url: `product-card`,
        method: "GET",
        credentials: "include" as const,
        body: { productId, payment_info },
      }),
    }),

    // ! get main type products
    getMainTypeProducts: builder.query({
      query: ({ type, prevLimit, limit }) => ({
        url: `/main-type-products/${type}/${prevLimit}/${limit}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetSubCategoriesProductsQuery,
  useGetProductCardsQuery,
  useGetMainTypeProductsQuery,
} = productApi;
