"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PostController = __importStar(require("../controllers/PostController"));
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = (0, express_1.Router)();
router.get("/", PostController.getPosts);
router.get("/:postId", PostController.getPost);
router.post("/", authMiddleware_1.protect, PostController.createPost);
router.get("/my-posts", authMiddleware_1.protect, PostController.getMyPosts);
router.get("/saved-posts/ids/:id", authMiddleware_1.protect, PostController.getSavedPosts);
router.put("/save", authMiddleware_1.protect, PostController.savePost);
router.put("/unsave", authMiddleware_1.protect, PostController.unsavePost);
router.put("/like", authMiddleware_1.protect, PostController.likePost);
router.put("/unlike", authMiddleware_1.protect, PostController.unlikePost);
router.put("/comment", authMiddleware_1.protect, PostController.commentPost);
router.delete("/comment/:postId/:commentId", authMiddleware_1.protect, PostController.deleteComment);
router.delete("/delete-post/:postId", authMiddleware_1.protect, PostController.deletePost);
exports.default = router;
