import { Request, Response } from "express";

import PostModel from "../models/Post";
import UserModel from "../models/User";

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostModel.find({})
      .populate("postedBy", "_id username")
      .populate("comments.postedBy", "_id username")
      .sort({ date: -1 });

    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

// @desc    Get a single post
// @route   GET /api/v1/posts/:postId
// @access  Public
const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

// @desc    Create a post
// @route   POST /api/v1/posts
// @access  Private
const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image, tags } = req.body;

    if (!title || !description || !image) {
      res.status(422);
      throw new Error("Please add all the fields");
    }

    const post = await PostModel.create({
      title,
      description,
      image,
      tags,
      postedBy: req.user,
    });

    res.status(201).json({
      message: "Post created successfully",
      result: post,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

// @desc    Get all posts by a user
// @route   GET /api/v1/posts/my-posts
// @access  Private
const getMyPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostModel.find({ postedBy: req.user?._id })
      .populate("postedBy", "_id name")
      .sort({ date: -1 });

    if (!posts) {
      res.status(404);
      throw new Error("No posts found");
    }
    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

// @desc    Like a post
// @route   PUT /api/v1/posts/like
// @access  Private
const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user?._id },
        $inc: { likesCount: 1 },
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

// @desc    Unlike a post
// @route   PUT /api/v1/posts/unlike
// @access  Private
const unlikePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user?._id },
        $inc: { likesCount: -1 },
      },
      { new: true }
    );

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

// @desc    Comment on a post
// @route   PUT /api/v1/posts/comment
// @access  Private
const commentPost = async (req: Request, res: Response): Promise<void> => {
  const comment = {
    comment: req.body.comment,
    postedBy: req.user?._id,
  };

  try {
    const post = await PostModel.findByIdAndUpdate(
      req.body.postId,
      {
        $push: {
          comments: comment,
        },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name Photo");

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/v1/posts/comment/:postId/:commentId
// @access  Private
const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: {
          comments: {
            _id: req.params.commentId,
          },
        },
      },
      {
        new: true,
      }
    ).populate("postedBy", "_id, name");

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

// @desc    Delete a post
// @route   DELETE /api/v1/posts/:postId
// @access  Private
const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findById(postId).populate("postedBy", "_id");

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
    // Check if the user who is deleting the post is the same user who created the post
    if (post.postedBy?._id.toString() !== req.user?._id.toString()) {
      res.status(200);
      throw new Error("You are not authorized to delete this post");
    }

    await PostModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
};

// @desc    Save a post
// @route   PUT /api/v1/posts/save
// @access  Private
const savePost = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the user is logged in
    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const post = await PostModel.findById(req.body.postId).populate(
      "postedBy",
      "_id name"
    );

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    const user = await UserModel.findById(req.body.userId);

    // Check if the user has already saved the post
    const isSaved = user?.savedPosts?.includes(post._id);

    if (isSaved) {
      res.status(400);
      throw new Error("Post already saved");
    }

    await UserModel.findByIdAndUpdate(
      req?.body.userId,
      {
        $push: { savedPosts: post._id },
      },
      { new: true } // to return the updated document
    );

    res.status(200).json({
      message: "Post saved successfully",
      savedPosts: user?.savedPosts,
      savePostsCount: user?.savedPosts?.length,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
};

// @desc    Usaved post
// @route   PUT /api/v1/posts/unsave
// @access  Private
const unsavePost = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the user is logged in
    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const user = await UserModel.findById(req.body.userId);

    const post = await PostModel.findById(req.body.postId).populate(
      "postedBy",
      "_id name"
    );

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    // Check if the user has already saved the post
    const isSaved = user?.savedPosts?.includes(post._id);

    if (isSaved) {
      res.status(400);
      throw new Error("Post already saved");
    }

    await UserModel.findByIdAndUpdate(
      req?.body.userId,
      {
        $pull: { savedPosts: post._id },
      },
      { new: true } // to return the updated document
    );

    res.status(200).json({
      message: "Post unsaved successfully",
      savedPosts: user?.savedPosts,
      savePostsCount: user?.savedPosts?.length,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
};

// @desc    Get saved posts
// @route   GET /api/v1/posts/saved-posts/ids/:id
// @access  Private
const getSavedPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // user id
    const user = await UserModel.findById(id)
      .populate("savedPosts", "_id title description image tags")
      .select("savedPosts");

    const savedPosts = await PostModel.find({ _id: { $in: user?.savedPosts } })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");

    res.status(200).json({savedPosts});
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
};

export {
  getPosts,
  getPost,
  createPost,
  getMyPosts,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
  deletePost,
  savePost,
  unsavePost,
  getSavedPosts,
};
