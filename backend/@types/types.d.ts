import { Types } from "mongoose";
import * as express from "express";

declare global {
  namespace Express {
    export interface Request {
      user: {
        _id: Types.ObjectId;
       } | null;
    }
  }
}
