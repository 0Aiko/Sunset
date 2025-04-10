import { getUserToken } from "@/lib/actions/getUserToken";
import { PossibleErrorResult } from "@/lib/hooks/api/types";
import { kyInstance } from "@/lib/services/fetcher";
import { Options } from "ky";

const poster = async <T>(url: string, options?: Options) => {
  const token = await getUserToken();

  const result = await kyInstance
    .post<T>(url, {
      ...options,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    .then(async (res) => {
      const contentType = res?.headers?.get("content-type");

      if (
        contentType != null &&
        contentType?.indexOf("application/json") !== -1
      ) {
        try {
          return await res.json();
        } catch {
          return null;
        }
      } else {
        return res;
      }
    });

  if (!result) {
    throw new Error("Unknown error");
  }

  return result as T;
};

export default poster;
