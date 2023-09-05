import { Router } from "express";

import * as PostController from "../controllers/PostController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", PostController.getPosts);
router.get("/:postId", PostController.getPost);
router.post("/", protect, PostController.createPost);
router.get("/my-posts", protect, PostController.getMyPosts);
router.get("/saved-posts/ids/:id", protect, PostController.getSavedPosts);
router.put("/save", protect, PostController.savePost);
router.put("/unsave", protect, PostController.unsavePost);
router.put("/like", protect, PostController.likePost);
router.put("/unlike", protect, PostController.unlikePost);
router.put("/comment", protect, PostController.commentPost);
router.delete(
  "/comment/:postId/:commentId",
  protect,
  PostController.deleteComment
);
router.delete("/delete-post/:postId", protect, PostController.deletePost);

export default router;
