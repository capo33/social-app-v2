import {  Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  likes: Types.ObjectId[];
  comments: [
    {
      comment: string;
      postedBy: Types.ObjectId;
    }
  ];
  postedBy: Types.ObjectId;
  tags: string[];
}
