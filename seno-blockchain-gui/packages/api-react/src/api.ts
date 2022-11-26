import { createApi } from '@reduxjs/toolkit/query/react';
import senoLazyBaseQuery from './senoLazyBaseQuery';

export const baseQuery = senoLazyBaseQuery({});

export default createApi({
  reducerPath: 'senoApi',
  baseQuery,
  endpoints: () => ({}),
});
