
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Collection, Donnees, User } from "../entities";
import { ServerUrl } from "./server";
import { prepare } from "./token";

export const userAPI =
  createApi({

    reducerPath: "userAPI",
    tagTypes: ["userList", "OneUser"],

    baseQuery: fetchBaseQuery({ baseUrl: "", prepareHeaders: prepare }),
    endpoints: (builder) => ({

      getLoginUser: builder.query<User, void>({
        query: () => ServerUrl("/users/me"),
        providesTags: ["userList"]
      }),

      putApiKey: builder.mutation<User, void>({
        query: (body) => ({
          url: ServerUrl("/users/me/apikey"),
          method: "PUT",
          body
        }),
        invalidatesTags: ["userList"]
      }),


      getAllCollections: builder.query<{ data: Collection[] }, { page: number }>({
        query: (param) => ({
          url: ServerUrl("/users/collections/editable"),
          method: "POST",
          provideTags: ["OneUser"],
          body: {
            "limit": 50,
            "page": param.page

          }
        })
      }),


      getAllDonnees: builder.query<{ data: Donnees[] }, { page: number }>({
        query: (param) => ({
          url: ServerUrl("/users/datas/editable"),
          method: "POST",
          providesTags: ["OneUser"],
          body: {
            "limit": 50,
            "page": param.page

          }

        })

      }),

      getDonneesDepositor: builder.query<{ data: Donnees[] }, void>({
        query: () => ({
          url: ServerUrl("/users/datas/deposited"),
          method: "POST",
          providesTags: ["OneUser"],
          body: {
            "limit": 100,
          }
        })
      })
    })
  })

export const { useGetLoginUserQuery, useLazyGetLoginUserQuery,
  usePutApiKeyMutation, useGetAllCollectionsQuery, useGetAllDonneesQuery, useGetDonneesDepositorQuery } = userAPI;

