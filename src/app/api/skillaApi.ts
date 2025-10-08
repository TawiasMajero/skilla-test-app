import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type {
  CallsResponse,
  GetCallsParams,
  GetRecordParams,
} from "../../shared/types/api.types";

const BASE_URL = "https://api.skilla.ru";
const API_TOKEN = "testtoken";

const objectUrlMap = new Map<string, string>();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${API_TOKEN}`);
    return headers;
  },
});

// Кастомный baseQuery — логирует входящие запросы и ответы/ошибки.
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    try {
      // Логируем параметры запроса (method/url/body/params)
      try {
        const previewArgs = {
          ...(typeof args === "string" ? { url: args } : args),
        };
        console.info("[skillaApi] request:", previewArgs);
      } catch (e) {
        // Показываем ошибку сериализации — полезно при дебаге
        console.info("[skillaApi] request (unserializable):", e);
      }

      const result = await rawBaseQuery(args, api, extraOptions);

      if (result.error) {
        console.error("[skillaApi] response error:", result.error);
        return result;
      }

      const data = result.data;
      if (data instanceof Blob) {
        console.info("[skillaApi] response (Blob):", { type: data.type, size: data.size });
      } else {
        console.info("[skillaApi] response:", data);
      }

      return result;
    } catch (err) {
      console.error("[skillaApi] unexpected error:", err);
      throw err;
    }
  };

export const skillaApi = createApi({
  reducerPath: "skillaApi",
  baseQuery,
  endpoints: (builder) => ({
    // Получить список звонков
    getCalls: builder.query<CallsResponse, GetCallsParams>({
      query: (params) => ({
        url: "/mango/getList",
        method: "POST",
        params,
      }),
    }),


    getRecord: builder.query<{ size: number; type: string } | null, GetRecordParams>({
      query: (params) => ({
        url: "/mango/getRecord",
        method: "POST",
        params,
        responseHandler: (response: Response) => response.blob(),
      }),
      async transformResponse(blob: Blob) {
        try {
          if (!blob || blob.size === 0) return null;
          const type = blob.type || "audio/mpeg";
          return { size: blob.size, type };
        } catch (err) {
          console.error("[skillaApi] transformResponse getRecord error:", err);
          return null;
        }
      },
    }),
    getRecordUrl: builder.query<string | null, GetRecordParams>({
  async queryFn(params, api, extraOptions) {
        try {
          const recordId = params.record;
          if (!recordId) return { data: null };

          if (objectUrlMap.has(recordId)) {
            return { data: objectUrlMap.get(recordId)! };
          }

          const raw = await rawBaseQuery(
            {
              url: "/mango/getRecord",
              method: "POST",
              params,
              responseHandler: (response: Response) => response.blob(),
            },
            api,
            extraOptions
          );

          if (raw.error) return { error: raw.error };

          const blob = raw.data as Blob;
          if (!blob || blob.size === 0) return { data: null };

          const normalizeMime = (type: string) => {
            if (!type) return "audio/mpeg";
            const t = type.toLowerCase();
            if (t === "audio/mpeg3" || t === "audio/x-mpeg3" || t === "audio/x-mpeg") return "audio/mpeg";
            if (t.startsWith("audio/")) return t;
            return "audio/mpeg";
          };

          const normalizedType = normalizeMime(blob.type);
          const correctedBlob = blob.type === normalizedType ? blob : new Blob([blob], { type: normalizedType });

          const objectUrl = URL.createObjectURL(correctedBlob);
          objectUrlMap.set(recordId, objectUrl);

          return { data: objectUrl };
        } catch (err) {
          console.error("[skillaApi] getRecordUrl queryFn error:", err);
          return { error: { status: 'CUSTOM_ERROR', data: String(err) } as unknown as FetchBaseQueryError };
        }
      },
      async onCacheEntryAdded(arg, { cacheEntryRemoved }) {
        try {
          await cacheEntryRemoved;
          const recordId = arg.record;
          const url = objectUrlMap.get(recordId);
          if (url) {
            try {
              URL.revokeObjectURL(url);
            } catch {
              // ignore
            }
            objectUrlMap.delete(recordId);
          }
        } catch {
          // ignore
        }
      },
    }),
  }),
});

export const { useGetCallsQuery, useGetRecordQuery, useGetRecordUrlQuery } = skillaApi;
