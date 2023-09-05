import { IPost } from "./PostInterface";

export type NotificationType = {
  _id?: string;
  title: string;
  description: string;
  name: string;
};

export interface IUser {
  message: string;
  token: string;
  username: string;
  email: string;
  password: string;
  _id?: string;
  image?: string;
  followers?: string[];
  following?: string[];
  bio: string;
  notifications?: NotificationType[];
  seenNotifications?: NotificationType[];
  createdAt?: Date;
}

export interface IUserProfileData {
  user: IUser;
  posts: IPost[];
}

export interface IUpdateUser {
  username: string;
  email: string;
  bio: string;
  image?: string;
}
