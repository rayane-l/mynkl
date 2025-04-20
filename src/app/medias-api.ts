import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerUrl } from "./server";
import { prepare } from "./token";


export const mediasAPI = createApi({
  reducerPath: "mediasAPI",
  tagTypes: ["mediasList"],
  baseQuery: fetchBaseQuery({ baseUrl: "", prepareHeaders: prepare }),
  endpoints: (builder) => ({


    getMediaFiles: builder.query<any, string>({
      query: (id) => ServerUrl(`/embed/${id}`),
      providesTags: ["mediasList"]
    }),

    downloadFiles: builder.query<Blob, { dataId: string, filesId: string }>({
      query: (param) => ({
        url: ServerUrl(`/data/${param.dataId}/${param.filesId}?content-disposition=attachment`),
        method: "GET",
        responseHandler: ((response) => response.blob()),
        

      }),
      providesTags: ["mediasList"]
    }),

  })
});

// https://apitest.nakala.fr/data/10.34847/nkl.c39a86mt/05a971d430812dd6f57a2e152445155acf94cae3?content-disposition=attachment
// https://apitest.nakala.fr/data/10.34847/nkl.c39a86mt/05a971d430812dd6f57a2e152445155acf94cae3?content-disposition=attachment

export const { useLazyGetMediaFilesQuery, useLazyDownloadFilesQuery } = mediasAPI;