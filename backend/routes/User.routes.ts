import { Router } from "express";

import * as UserController from "../controllers/UserController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", protect, UserController.getProfile);
router.get("/get-all-notifications", protect, UserController.getNotifications);
router.get("/user/:id", UserController.getUserById);
router.put("/update-profile", protect, UserController.updateProfile);
router.put("/follow", protect, UserController.followUser);
router.put("/unfollow", protect, UserController.unfollowUser);
router.post("/notifications", protect, UserController.sendNotifications);
router.delete(
  "/delete-all-notifications",
  protect,
  UserController.deleteNotification
);

export default router;
