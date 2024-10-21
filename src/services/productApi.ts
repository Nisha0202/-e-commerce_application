// src/services/productApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => `products?limit=${limit}&page=${page}`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;

