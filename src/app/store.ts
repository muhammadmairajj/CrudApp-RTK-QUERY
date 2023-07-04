import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {apiSlice} from "../features/api/apiSlice";
import {photoSlice} from "../features/photoapi/photoSlice";
import { posts } from "../services/posts";

export const store = configureStore({
  reducer: {
    [apiSlice?.reducerPath]: apiSlice?.reducer,
    [photoSlice?.reducerPath]: photoSlice?.reducer,
    [posts?.reducerPath]: posts?.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice?.middleware)
      .concat(photoSlice?.middleware)
      .concat(posts?.middleware ),
});

setupListeners(store?.dispatch);
