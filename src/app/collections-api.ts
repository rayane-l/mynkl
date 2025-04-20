import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Collection, Metas } from "../entities";
import { ServerUrl } from "./server";
import { prepare } from "./token";
import { userAPI } from "./user-api";


export const collectionsAPI = createApi({
  reducerPath: "collectionsAPI",
  tagTypes: ["collectionsList", "oneCollection"],
  baseQuery: fetchBaseQuery({ baseUrl:  "", prepareHeaders: prepare }),
  endpoints: (builder) => ({

    getCollectionsDetail: builder.query<Collection, string>({
      query: (id) => ServerUrl("/collections/" + id),
      providesTags: ["collectionsList"]
    }),


    getDatasFromCollections: builder.query<any, {id: string, limit: number, page: number}>({
      query: (param) => ServerUrl(`/collections/${param.id}/datas?page=${param.page}&limit=${param.limit}`),
      providesTags: ["collectionsList"]
    }),

    deleteMetasCollectionDetail: builder.mutation<any, { id: string, body: Metas }>({
      query: (param) => ({
        url: ServerUrl("/collections/" + param.id + "/metadatas"),
        method: "DELETE",
        body: param.body
      }),
      invalidatesTags: ["collectionsList"]

    }),

    putStatusCollection: builder.mutation<Collection, { id: string, body: string }>({
      query: (param) => ({
        url: ServerUrl( "/collections/" + param.id + "/status/" + param.body),
        method: "PUT",
        body: param.body
      }),
      invalidatesTags: ["collectionsList"]
    }),

    postTitleMetaCollection: builder.mutation<any, { id: string, body: Metas }>({
      query: (param) => ({
        url: ServerUrl("/collections/" + param.id + "/metadatas"),
        method: "POST",
        body: param.body
      }),
      invalidatesTags: ["collectionsList"]
    }),

    postCollection: builder.mutation<Collection, Collection>({
      query: (body) => ({
        url: ServerUrl("/collections"),
        method: "POST",
        body
      }),
      invalidatesTags: ["collectionsList"],
      // async onQueryStarted(collection, { dispatch, queryFulfilled }) {

      //     // `updateQueryData` requires the endpoint name and cache key arguments,
      //     // so it knows which piece of cache state to update
      //     const patchResult = dispatch(
      //         userAPI.util.updateQueryData('getAllCollections', collection, draft => {
      //             // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
      //             Object.assign(draft, collection)


      //         })
      //     )
      //     try {
      //         await queryFulfilled
      //     } catch {
      //         patchResult.undo()
      //     }
      // }
    }),

    deleteCollection: builder.mutation<any, string>({
      query: (id) => ({
        url: ServerUrl(`/collections/${id}`),
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          userAPI.util.updateQueryData("getAllCollections", { page: 1 }, draft => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const post = draft.data.findIndex(data => data.identifier === id)
            if (post !== -1) {
              draft.data.splice(post, 1)
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }

    })
  })
});


export const { useGetCollectionsDetailQuery, useLazyGetCollectionsDetailQuery, useDeleteMetasCollectionDetailMutation, usePutStatusCollectionMutation, usePostTitleMetaCollectionMutation, usePostCollectionMutation, useDeleteCollectionMutation, useGetDatasFromCollectionsQuery, useLazyGetDatasFromCollectionsQuery } = collectionsAPI;