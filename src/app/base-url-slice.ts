import { createSlice } from "@reduxjs/toolkit"


export interface BaseURLState {

  server_url?: string | null
}


export const slice = createSlice({
  name: "base",
  initialState: { server_url: "https://api.nakala.fr" } as BaseURLState,
  reducers: {
    setBase:
      (state, { payload: server_url }
      ) => {
        state.server_url = server_url
        sessionStorage.setItem("server_url", server_url!)
      },

    changeUrl: (
      state) => {
      state.server_url = "https://api.nakala.fr"
      sessionStorage.setItem("server_url", "https://api.nakala.fr" )
    },
  },

})


export const { setBase, changeUrl } = slice.actions
export default slice.reducer
