import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import postServices from "./postServices";
import { IPost, IPostCreate } from "../../../interfaces/PostInterface";

interface PostState {
  posts: IPost[];
  savedPosts: IPost[];
  post: IPost;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: PostState = {
  posts: [],
  savedPosts: [],
  post: {
    _id: "",
    title: "",
    description: "",
    image: "",
    likes: [],
    tags: [],
    comments: [],
    postedBy: {
      _id: "",
      username: "",
      image: "",
    },
    createdAt: 0,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all posts
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postServices.getPosts();

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// get post by id
export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await postServices.getPost(id);

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// create post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    {
      formData,
      token,
      toast,
    }: {
      formData: IPostCreate;
      token: string;
      toast: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postServices.createPost(formData, token);
      toast.success(response.message);
      return response;
    } catch (error: unknown | any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// delete post

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (
    { postId, token, toast }: { postId: string; token: string; toast: any },
    thunkAPI
  ) => {
    try {
      const response = await postServices.deletePost(postId, token);
      toast.success(response?.message);
      thunkAPI.dispatch(getAllPosts());

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// like post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const response = await postServices.likePost(postId, token);
      thunkAPI.dispatch(getAllPosts());

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// unlike post
export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const response = await postServices.unlikePost(postId, token);
      thunkAPI.dispatch(getAllPosts());

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// comment post

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async (
    {
      comment,
      postId,
      token,
    }: { comment: string; postId: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await postServices.commentPost(comment, postId, token);
      thunkAPI.dispatch(getAllPosts());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// uncomment post

export const deleteCommentPost = createAsyncThunk(
  "posts/deleteCommentPost",
  async (
    {
      postId,
      commentId,
      token,
    }: { postId: string; commentId: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await postServices.deleteComment(
        postId,
        commentId,
        token
      );
      thunkAPI.dispatch(getAllPosts());
      console.log("response", response);

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// my posts

export const myPosts = createAsyncThunk(
  "posts/myPosts",
  async (token: string, thunkAPI) => {
    try {
      const response = await postServices.myPosts(token);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Save post
export const savePost = createAsyncThunk(
  "posts/savePost",
  async (
    {
      postId,
      userId,
      token,
    }: { postId: string; userId: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await postServices.savePost(postId, userId, token);
      thunkAPI.dispatch(getAllPosts());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Unsave post
export const unsavePost = createAsyncThunk(
  "posts/unsavePost",
  async (
    {
      postId,
      userId,
      token,
    }: { postId: string; userId: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await postServices.unsavePost(postId, userId, token);
      thunkAPI.dispatch(getAllPosts());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get saved posts
export const getSavedPosts = createAsyncThunk(
  "posts/getSavedPosts",
  async ({ userId, token }: { userId: string; token: string }, thunkAPI) => {
    try {
      const response = await postServices.getSavedPosts(userId, token);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all posts
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload;
    });
    builder.addCase(getAllPosts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // get post by id
    builder.addCase(getPostById.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getPostById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post = payload;
    });
    builder.addCase(getPostById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // delete a post
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload.data;
    });
    builder.addCase(createPost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // delete a post
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload.data;
    });
    builder.addCase(deletePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // like a post
    builder.addCase(likePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: IPost) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(likePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // unlike a post
    builder.addCase(unlikePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unlikePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: IPost) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(unlikePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // comment a post
    builder.addCase(commentPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(commentPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: IPost) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(commentPost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // delete a comment
    builder.addCase(deleteCommentPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCommentPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: IPost) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(deleteCommentPost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // my posts
    builder.addCase(myPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(myPosts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload.data;
    });
    builder.addCase(myPosts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // save post
    builder.addCase(savePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(savePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: IPost) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }
        return post;
      });
      state.savedPosts = newdata;
    });
    builder.addCase(savePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // unsave post
    builder.addCase(unsavePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unsavePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: IPost) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }
        return post;
      });
      state.savedPosts = newdata;
    });
    builder.addCase(unsavePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export default postSlice.reducer;
