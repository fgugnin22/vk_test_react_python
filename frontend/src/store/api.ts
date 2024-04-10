import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_ROOT_URL }),
  tagTypes: [],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({})
});

export { Api };
