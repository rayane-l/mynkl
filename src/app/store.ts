import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import baseURL from "./base-url-slice";
import colorS from "./color-slice";
import { collectionsAPI } from "./collections-api";
import { donneesAPI } from "./donnees-api";
import { mediasAPI } from "./medias-api";
import { userAPI } from "./user-api";
import { vocabulariesAPI } from "./vocabularies-api";
import { suggestionsAPI } from "./suggestions-api"


export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [collectionsAPI.reducerPath]: collectionsAPI.reducer,
    [donneesAPI.reducerPath]: donneesAPI.reducer,
    [mediasAPI.reducerPath]: mediasAPI.reducer,
    [vocabulariesAPI.reducerPath]: vocabulariesAPI.reducer,
    [suggestionsAPI.reducerPath]: suggestionsAPI.reducer,

    auth: authSlice,
    base: baseURL,
    colorS: colorS,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(userAPI.middleware,
      collectionsAPI.middleware, donneesAPI.middleware, mediasAPI.middleware,
      vocabulariesAPI.middleware, suggestionsAPI.middleware),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;