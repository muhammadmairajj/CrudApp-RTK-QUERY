import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Posts} from "./types";

// fetchBaseQuery: A small wrapper around the [fetch] (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
//  API that aims to simplify requests.

export const posts = createApi({
  reducerPath: "posts", // reducerPath is a unique key that defines where the Redux store will store the cache.
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  tagTypes: ["Posts"],
  // baseQuery: The base query used by each endpoint to request data. Here as its value, we passed fetchBaseQuery,
  // which allows us to build a query by just providing the base URL.
  endpoints: (builder) => ({
    // endPoint: The set of operations that we want to perform against the server.
    getAllPosts: builder.query<Posts[], void>({
      query: () => ({
        url: "posts",
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
    getPostById: builder.query<Posts, number>({
      // 2nd Method with return
      query: (postId: number) => {
        console.log("PostId", postId);
        return {
          url: `posts/${postId}`,
          method: "GET",
        };
      },
      // 1st Method without return
      // query: (postId: number) => ({
      //   url: `posts/${postId}`,
      //   method: "GET",
      // }),
    }),
    updatePost: builder.mutation<Posts, any>({
      query: (updatePostData) => {
        console.log("Update Post: ", updatePostData);
        const { id, ...data } = updatePostData;
        console.log("Actual Update Post: ", data);
        return {
          url: `posts/${id}`,
          method: "PUT",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation<Posts, {id: number}>({
      query: (id) => {
        // console.log("deleteId", id);
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (newPost) => {
       console.log("Create Post: ", newPost)
       return {
        url: `posts`,
        method: 'POST',
        body: newPost,
        headers: {
         'Content-type': 'application/json; charset=UTF-8',
        }
       }
      },
      invalidatesTags: ["Posts"],
     }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreatePostMutation
} = posts;

// https://blog.openreplay.com/fetching-data-in-redux-using-rtk-query/
