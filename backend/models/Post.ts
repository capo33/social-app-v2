import { Schema, model } from "mongoose";

import { IPost } from "../interfaces/postInterface";

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "no photo",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        comment: {
          type: String,
        },
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const PostModel = model<IPost>("Post", PostSchema);

export default PostModel;
