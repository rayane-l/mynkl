import { RootState } from "./store";

export const prepare = (headers: Headers, { getState }: any) => {
  const api_key = (getState() as RootState).auth.api_key
  // const token = localStorage.getItem('token') doesn(t work)

  if (api_key) {
    headers.set("x-api-key", api_key)
  }
  return headers
};

