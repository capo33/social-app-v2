import axios from "axios";

import { POST_URL } from "../../../constants/constants";
import { IPostCreate } from "../../../interfaces/PostInterface";

// Get all posts
const getPosts = async () => {
  const response = await axios.get(POST_URL);
  return response.data;
};

// Get single post
const getPost = async (id: string) => {
  const response = await axios.get(`${POST_URL}/${id}`);
  return response.data;
};

// Create post
const createPost = async (formData: IPostCreate, token: string) => {
  const response = await axios.post(POST_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete post
const deletePost = async (postId: string, token: string) => {
  const response = await axios.delete(`${POST_URL}/delete-post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);

  return response.data;
};

// Like a post
const likePost = async (id: string, token: string) => {
  const rsponse = await axios.put(
    `${POST_URL}/like`,
    { postId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return rsponse.data;
};

// Unlike a post

const unlikePost = async (id: string, token: string) => {
  const rsponse = await axios.put(
    `${POST_URL}/unlike`,
    { postId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return rsponse.data;
};

// Comment on a post
const commentPost = async (comment: string, id: string, token: string) => {
  const rsponse = await axios.put(
    `${POST_URL}/comment`,
    { comment, postId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return rsponse.data;
};

// Delete a comment

const deleteComment = async (
  postId: string,
  commentId: string,
  token: string
) => {
  const rsponse = await axios.delete(
    `${POST_URL}/comment/${postId}/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(rsponse.data);

  return rsponse.data;
};

// My Posts

const myPosts = async (token: string) => {
  const response = await axios.get(`${POST_URL}/my-posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Saved Posts
const savePost = async (postId: string, userId: string, token: string) => {
  const response = await axios.put(
    `${POST_URL}/save`,
    { postId, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Unsaved Posts
const unsavePost = async (postId: string, userId: string, token: string) => {
  const response = await axios.put(
    `${POST_URL}/unsave`,
    { postId, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get saved posts
const getSavedPosts = async (userId: string, token: string) => {
  const response = await axios.get(`${POST_URL}/saved-posts/ids/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const postServices = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
  myPosts,
  savePost,
  unsavePost,
  getSavedPosts,
};

export default postServices;
