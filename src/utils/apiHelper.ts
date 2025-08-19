'use server'

import { cookies } from "next/headers";

// lib/api-client.ts
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache; // e.g., "no-store" for SSR
  next?: NextFetchRequestConfig; // for revalidation in Next.js
  authenticate?: boolean; // whether to include auth token
}

interface ApiError {
  success?: boolean;
  status: number;
  message: string;
  details?: unknown;
}

export type ApiResult<T> = { data?: T; error?: ApiError, success?: boolean };

export async function api<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<ApiResult<TResponse>> {
  const {
    method = "GET",
    body,
    headers = {},
    cache,
    next,
    authenticate = false,
  } = options;

  let token;
  if (authenticate) {
    // Read token from server-side cookie
    const cookieToken = (await cookies()).get("token")?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method,
      credentials: authenticate ? 'include' : 'same-origin',
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next,
    });

    console.log('res', res)
    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!res.ok) {
      let error: ApiError = {
        status: res.status,
        message: res.statusText,
      };

      if (isJson) {
        try {
          const errData = await res.json();
          error = {
            status: res.status,
            message: errData.message || res.statusText,
            details: errData,
            success: errData.success,
          };
        } catch {
          // ignore parsing errors
        }
      }

      return { error };
    }

    if (isJson) {
      try {
        const data = await res.json() as TResponse;
        return { data, success: true };
      } catch {
        return {
          error: {
            status: res.status,
            message: "Failed to parse JSON response",
          },
        };
      }
    }

    return { data: {} as TResponse, success: false };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      error: {
        status: err?.status || 500,
        message: err?.message || "Network or server error",
        details: err,
        success: err?.success,
      },
    };
  }
}
