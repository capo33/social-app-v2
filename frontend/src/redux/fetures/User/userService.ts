import axios from "axios";

import { USER_URL } from "../../../constants/constants";
import { IUpdateUser } from "../../../interfaces/UserInterface";

// get user profile
const getUserProfile = async (token: string) => {
  const response = await axios.get(`${USER_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// update user profile
const updateUserProfile = async (formData: IUpdateUser, token: string) => {
  const response = await axios.put(`${USER_URL}/update-profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// get user profile by id
const getUserProfileById = async (id: string) => {
  const response = await axios.get(`${USER_URL}/user/${id}`);
  return response.data;
};

// follow a user
const followUser = async (followId: string, userId: string, token: string) => {
  const response = await axios.put(
    `${USER_URL}/follow/`,
    {
      followId,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// unfollow a user

const unfollowUser = async (unfollowId: string, userId: string, token: string) => {
  const response = await axios.put(
    `${USER_URL}/unfollow/`,
    {
      unfollowId,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const userService = {
  getUserProfile,
  updateUserProfile,
  getUserProfileById,
  followUser,
  unfollowUser,
};

export default userService;
