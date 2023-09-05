import { Document, Types } from "mongoose";

export type NotificationType = {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  name: string;
};

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  answer: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  bio: string;
  notifications: NotificationType[];
  seenNotifications: NotificationType[];
  image: string;
  savedPosts: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
