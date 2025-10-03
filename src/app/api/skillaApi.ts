import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CallsResponse,
  GetCallsParams,
  GetRecordParams,
} from "../../shared/types/api.types";

const BASE_URL = "https://api.skilla.ru";
const API_TOKEN = "testtoken";

export const skillaApi = createApi({
  reducerPath: "skillaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Получить список звонков
    getCalls: builder.query<CallsResponse, GetCallsParams>({
      query: (params) => ({
        url: "/mango/getList",
        method: "POST",
        params,
      }),
    }),

    // Получить запись звонка
    getRecord: builder.query<Blob, GetRecordParams>({
      query: (params) => ({
        url: "/mango/getRecord",
        method: "POST",
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const { useGetCallsQuery, useGetRecordQuery } = skillaApi;
