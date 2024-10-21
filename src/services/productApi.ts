// src/services/productApi.ts
 import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => `products`,  // Fetch all products at once
    }),
  }),
});

export const { useGetProductsQuery } = productApi;




