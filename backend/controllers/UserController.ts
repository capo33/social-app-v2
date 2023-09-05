import { Request, Response } from "express";

import UserModel from "../models/User";
import PostModel from "../models/Post";
import { generateToken } from "../utils/generateToken";

// @desc    Get logged in user
// @route   GET /api/v1/users/me
// @access  Private
const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById(req.user?._id)
      .select("-password")
      .populate("followers", "_id name")
      .populate("following", "_id name");

    // Check if user exists
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Get user's posts
    const posts = await PostModel.find({ postedBy: req.user?._id })
      .populate("postedBy", "_id name")
      .exec();

    // Add posts to the user
    user?.set({ posts: posts });

    // Return user profile and posts
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/update-profile
// @access  Private
const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if user exists
    const user = await UserModel.findById(req.user?._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user?._id,
      { ...req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }
};

// @desc    Delete user profile
// @route   DELETE /api/v1/users/delete-user
// @access  Private
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if user exists
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Check if user is authorized to delete the user
    if (user?._id.toString() !== req.user?._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this user");
    }

    // Delete user
    await UserModel.findByIdAndDelete(req.user?._id);

    res.status(200).json({
      success: true,
      message: "Sad to see you go, user deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }
};

// @desc    Get user profile by id
// @route   GET /api/v1/users/:id
// @access  Public

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById(req.params.id)
      .select("-password")
      .populate("followers", "_id name")
      .populate("following", "_id name");

    // Check if user exists
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Get user's posts
    const posts = await PostModel.find({ postedBy: req.params.id })
      .populate("postedBy", "_id name")
      .exec();

    // Add posts to the user

    res.status(200).json({ user, posts });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }
};

// @desc    Follow a user
// @route   PUT /api/v1/users/follow
// @access  Private
const followUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // We are following this user now - so we add this user to our following list
    const user = await UserModel.findByIdAndUpdate(
      req.body.followId, // followId is the id of the user we want to follow
      {
        // we are adding the user id to the following array
        $push: { followers: req.user?._id },
      },
      { new: true }
    ).select("-password");

    // This user is following us now - so we add this user to our followers list
    const me = await UserModel.findByIdAndUpdate(
      req.user?._id,
      {
        $push: { following: req.body.followId },
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ user, me });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Unfollow a user
// @route   PUT /api/v1/users/unfollow
// @access  Private
const unfollowUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // We are unfollowing this user now - so we remove this user from our following list
    const user = await UserModel.findByIdAndUpdate(
      req.body.unfollowId, // unfollowId is the id of the user we want to unfollow
      {
        // we are removing the user id from the following array
        $pull: { followers: req.user?._id },
      },
      { new: true }
    ).select("-password");

    // This user is unfollowing us now - so we remove this user from our followers list
    const me = await UserModel.findByIdAndUpdate(
      req.user?._id,
      {
        $pull: { following: req.body.unfollowId },
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ user, me });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Send notifications
// @route   POST /api/v1/users/notifications
// @access  Private
const sendNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await UserModel.findById(req.body.userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const notification = user.notifications;

    notification.push({
      title: "New follower",
      description: `${user.username} started following you`,
      name: user.username,
      _id: user._id,
    });

    if (user.notifications.length > 1) {
      res.status(400);
      throw new Error("You have already sent a notification");
    }
    await UserModel.findByIdAndUpdate(
      user?._id,
      {
        notifications: notification,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Get all notifications
// @route   GET /api/v1/users/get-all-notifications
// @access  Private
const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // We are getting the seen notifications and the notifications from the user
    const seenNotifications = user.seenNotifications;

    // We make a copy of the notifications array
    const notifications = user.notifications;

    // We aer pushing all the notifications to the seen notifications array
    seenNotifications.push(...notifications);

    // Update user with new notifications array and seen notifications array and save
    // We are setting the notifications array to empty array because we have seen all the notifications and we dont want to see them again
    user.notifications = [];

    // now we are setting the seen notifications array to the notifications array because we have seen all the notifications and we dont want to see them again
    user.seenNotifications = notifications;

    // We are saving the user
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "All notifications marked as seen",
      data: {
        name: updatedUser.username,
        email: updatedUser.email,
        notifications: updatedUser.notifications,
        seenNotifications: updatedUser.seenNotifications,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Delete notification
// @route   DELETE /api/v1/users/notifications/:id
// @access  Private
const deleteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    user.notifications = [];
    user.seenNotifications = [];

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Notification deleted",
      data: {
        name: updatedUser.username,
        email: updatedUser.email,
        notifications: updatedUser.notifications,
        seenNotifications: updatedUser.seenNotifications,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export {
  getProfile,
  updateProfile,
  deleteUser,
  getUserById,
  followUser,
  unfollowUser,
  sendNotifications,
  getNotifications,
  deleteNotification,
};
