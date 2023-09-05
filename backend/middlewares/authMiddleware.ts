import { Request, Response, NextFunction } from "express";

import { Secret } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";

import UserModel from "../models/User";
import { IPayload } from "../interfaces/authInterface";

// Auth middleware
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as Secret
      ) as IPayload;

      // Get user from the token
      const user = await UserModel.findById(decoded.id).select("-password");
        
      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  // Check if token exists
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { protect };
