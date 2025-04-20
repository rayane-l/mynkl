import { createSlice } from "@reduxjs/toolkit"


export interface AuthState {

    api_key?: string | null
    

}


export const slice = createSlice({
  name: "auth",
  initialState: { api_key: null } as AuthState,
  reducers: {
    setApiKey:
            (state, { payload: api_key}
            ) => {
              state.api_key = api_key
              sessionStorage.setItem("api_key",api_key!)  
            },

    logout: (
      state) => {
      state.api_key = null;
      sessionStorage.removeItem("api_key")
    },
  },

})


export const { setApiKey, logout } = slice.actions
export default slice.reducer
