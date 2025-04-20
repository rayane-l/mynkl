import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Collection, Donnees, DonneeUpdated, Files, Metas, UploadFiles } from "../entities";
import { ServerUrl } from "./server";
import { prepare } from "./token";
import { userAPI } from "./user-api";


export const donneesAPI = createApi({
  reducerPath: "donneesAPI",
  tagTypes: ["donneesList"],
  baseQuery: fetchBaseQuery({ baseUrl: "", prepareHeaders: prepare }),
  endpoints: (builder) => ({

    getDonneesDetail: builder.query<Donnees, string>({
      query: (id) => ServerUrl("/datas/" + id),
      providesTags: ["donneesList"]
    }),


    getCollectionsFromDonnee: builder.query<Collection[], string>({
      query: (id) => ServerUrl(`/datas/${id}/collections`),
      providesTags: ["donneesList"]

    }),


    deleteDonneeFromCollection: builder.mutation<any, { id: string, body: Collection[] }>({
      query: (param) => ({
        url: ServerUrl(`/datas/${param.id}/collections`),
        method: "DELETE",
        body: param.body
      }),
      invalidatesTags: ["donneesList"]

    }),


    postDonneeinCollection: builder.mutation<any, { id: string, body: string[] }>({
      query: (param) => ({
        url: ServerUrl(`/datas/${param.id}/collections`),
        method: "POST",
        body: param.body
      }),
      invalidatesTags: ["donneesList"]
    }),


    putDonneeStatus: builder.mutation<Donnees, string>({
      query: (id) => ({
        url: ServerUrl(`/datas/${id}/status/published`),
        method: "PUT",
        body: id
      }),
      invalidatesTags: ["donneesList"],

    }),


    postDonnee: builder.mutation<Donnees, Donnees>({
      query: (body) => ({
        url: ServerUrl("/datas"),
        method: "POST",
        body
      }),
      invalidatesTags: ["donneesList"],
      // async onQueryStarted(id, { dispatch, queryFulfilled }) {

      //   // try {
      //   //   const { currentData }: any = await queryFulfilled
      //   //   console.log(currentData);

      //   //   const patchResult = dispatch(
      //   //     userAPI.util.updateQueryData('getAllDonnees', { page: 1 }, draft => {
      //   //       // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
      //   //       const post = draft.data.findIndex(data => data.identifier === currentData.payload.id)
      //   //       if (post == -1) {
      //   //         draft.data.push(id)
      //   //         console.log(draft.data);
      //   //         console.log(id.identifier);
      //   //         console.log(post);
      //   //       }
      //   //     })
      //   //   )
      //   // } catch (error) {
      //   //   console.log(error);

      //   // }

      //   // `updateQueryData` requires the endpoint name and cache key arguments,
      //   // so it knows which piece of cache state to update
      //   const patchResult = dispatch(
      //     userAPI.util.updateQueryData('getAllDonnees', {page: 1}, draft => {
      //       // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
      //       const post = draft.data.findIndex(data => data.identifier === id.identifier)


      //       if (post == -1){
      //         draft.data.push(id)
      //         console.log(draft.data);
      //         console.log(id);
      //         console.log(post); 
      //       }


      //     })
      //   )
      //   try {
      //    const  {currentData}:any =  await queryFulfilled
      //     dispatch(
      //     userAPI.util.updateQueryData('getAllDonnees', {page: 1}, draft => {
      //       // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
      //       const post = draft.data.findIndex(data => data.identifier === currentData.payload.id )


      //       if (post == -1){
      //         id.identifier = currentData.payload.id
      //         draft.data.push(id)

      //       }


      //     })
      //   )


      //   } catch {
      //     patchResult.undo()
      //   }
      // }
    }),
    deleteDonne: builder.mutation<any, string>({
      query: (id) => ({
        url: ServerUrl(`/datas/${id}`),
        method: "DELETE",

      }),
      invalidatesTags: ["donneesList"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          userAPI.util.updateQueryData("getAllDonnees", { page: 1 }, draft => {
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
    }),

    updateDonnee: builder.mutation<any, { id: string, body: DonneeUpdated }>({
      query: (param) => ({
        url: ServerUrl(`/datas/${param.id}`),
        method: "PUT",
        body: param.body
      }),
      invalidatesTags: ["donneesList"]
    }),


    // partie metadatas
    postMetadataDonnees: builder.mutation<Metas, { id: string, body: Metas }>({
      query: (param) => ({
        url: ServerUrl(`/datas/${param.id}/metadatas`),
        method: "POST",
        body: param.body
      }),
      invalidatesTags: ["donneesList"]
    }),

    deleteMetadataDonnees: builder.mutation<any, { id: string, body: Metas }>({
      query: (param) => ({
        url: ServerUrl(`/datas/${param.id}/metadatas`),
        method: "DELETE",
        body: param.body
      }),
      invalidatesTags: ["donneesList"]
    }),


    // partie media
    getDonneesMedia: builder.query<Donnees, string>({
      query: (id) => ServerUrl(`/datas/${id}?content-disposition=inline`),
      providesTags: ["donneesList"]
    }),

    deleteDonneesMedia: builder.mutation<Donnees, { id: string, body: string }>({
      query: (param) => ({
        url: ServerUrl(`/datas/${param.id}/files/${param.body}`),
        method: "DELETE",
        body: param.body
      }),
      invalidatesTags: ["donneesList"]
    }),


    postMediaUpload: builder.mutation<Record<string, unknown>, FormData>({
      query: (param) => ({
        url: ServerUrl("/datas/uploads"),
        method: "POST",
        body: param,
        headers: { "Content-Type": undefined }
      }),
    }),


    postMedia: builder.mutation<Files, { id: string, body: UploadFiles }>({
      query: (param) => ({
        url: ServerUrl(`/datas/${param.id}/files`),
        method: "POST",
        body: param.body
      }),
      invalidatesTags: ["donneesList"]
    }),

    searchDonnees: builder.query<any, { q: string, fq: string, facet: string, page: number }>({
      query: (param) => ({
        url: ServerUrl(`/search?q=${param.q}&fq=${param.fq}&facet=${param.facet}&order=relevance&page=${param.page}&size=25`),
        method: "GET",
      })
    })
  })
});


export const { useGetDonneesDetailQuery, useLazyGetDonneesDetailQuery, useGetCollectionsFromDonneeQuery, useLazyGetDonneesMediaQuery,
  usePostMediaUploadMutation, useDeleteDonneeFromCollectionMutation, usePostDonneeinCollectionMutation, usePutDonneeStatusMutation,
  useDeleteDonneesMediaMutation, usePostMetadataDonneesMutation, useDeleteMetadataDonneesMutation,
  usePostMediaMutation, usePostDonneeMutation, useDeleteDonneMutation, useUpdateDonneeMutation, useSearchDonneesQuery } = donneesAPI;