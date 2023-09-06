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
var UserController = __importStar(require("../controllers/UserController"));
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = (0, express_1.Router)();
router.get("/profile", authMiddleware_1.protect, UserController.getProfile);
router.get("/get-all-notifications", authMiddleware_1.protect, UserController.getNotifications);
router.get("/user/:id", UserController.getUserById);
router.put("/update-profile", authMiddleware_1.protect, UserController.updateProfile);
router.put("/follow", authMiddleware_1.protect, UserController.followUser);
router.put("/unfollow", authMiddleware_1.protect, UserController.unfollowUser);
router.post("/notifications", authMiddleware_1.protect, UserController.sendNotifications);
router.delete("/delete-all-notifications", authMiddleware_1.protect, UserController.deleteNotification);
router.delete("/delete-profile", authMiddleware_1.protect, UserController.deleteUser);
exports.default = router;
