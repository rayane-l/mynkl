import { createSlice } from "@reduxjs/toolkit"


export interface ColorState {

    filter_url: string

}

export const colorSlice = createSlice({
  name: "colorS",
  initialState: { filter_url: "" } as ColorState,
  reducers: {
    setUrl(state, { payload }) {
      state.filter_url = payload
    },
  }
})

export const { setUrl } = colorSlice.actions

export default colorSlice.reducer
