import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: "/api/users",
        params,
      }),
      providesTags: ["User"],
    }),
    getProfile: build.query({
      query: (params) => ({
        url: "/api/profile",
        params,
      }),
      providesTags: ["User"],
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `/api/users/${id}`,
      }),
      providesTags: ["User"],
    }),
    signUpUser: build.mutation({
      query: (body) => ({
        url: "/api/users/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    singInUser: build.mutation({
      query: (body) => ({
        url: "/api/users/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/users/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetProfileQuery,
  useSignUpUserMutation,
  useSingInUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
