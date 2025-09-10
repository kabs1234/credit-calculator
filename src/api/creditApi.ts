import { BASE_URL } from '../const';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Credit, CreditRequest, Credits } from '../types/types';

export const creditApi = createApi({
  reducerPath: 'creditApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCredits: build.query<Credits, void>({
      query: () => 'loans',
    }),
    createCredit: build.mutation<Credit, CreditRequest>({
      query: (credit) => {
        return {
          url: 'loans',
          method: 'POST',
          body: credit,
        };
      },
    }),
    deleteCredit: build.mutation<Credit, number>({
      query: (id) => {
        return {
          url: `loans/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetCreditsQuery,
  useCreateCreditMutation,
  useDeleteCreditMutation,
} = creditApi;
