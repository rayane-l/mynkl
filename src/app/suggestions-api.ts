
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Donnees } from "../entities";
import { prepare } from "./token";

const apiUrl = process.env.NODE_ENV === 'production' ? 'https://mynkl.huma-num.fr' : "http://localhost:5000";


export const suggestionsAPI = createApi({
  reducerPath: "suggestionsAPI",
  tagTypes: ["suggestionsList"],
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl, prepareHeaders: prepare }),
  endpoints: (builder) => ({


    datasFromUser: builder.mutation<any, { baseurl: string, api_key: string, donnee: Donnees }>({
      query: (param) => ({
        url: "/data_deposited",
        method: "POST",
        body: param,
        invalideTags: ["suggestionsList"]

      }),
    }),
  })
});


export const { useDatasFromUserMutation } = suggestionsAPI;