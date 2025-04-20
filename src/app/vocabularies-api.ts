import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { License } from "../entities";
import { ServerUrl } from "./server";
import { prepare } from "./token";


export const vocabulariesAPI = createApi({
  reducerPath: "vocabulariesAPI",
  tagTypes: ["vocabulariesList"],
  baseQuery: fetchBaseQuery({ baseUrl: "", prepareHeaders: prepare }),
  endpoints: (builder) => ({

    getVocabLicenses: builder.query<License[], void>({
      query: () => ServerUrl("/vocabularies/licenses"),
      providesTags: ["vocabulariesList"]
    }),

    getVocabType: builder.query<string[], void>({
      query: () => ServerUrl("/vocabularies/datatypes"),
      providesTags: ["vocabulariesList"]
    }),


  })
});


export const { useGetVocabLicensesQuery, useGetVocabTypeQuery } = vocabulariesAPI;