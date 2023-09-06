"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.getNotifications = exports.sendNotifications = exports.unfollowUser = exports.followUser = exports.getUserById = exports.deleteUser = exports.updateProfile = exports.getProfile = void 0;
var User_1 = __importDefault(require("../models/User"));
var Post_1 = __importDefault(require("../models/Post"));
// @desc    Get logged in user
// @route   GET /api/v1/users/me
// @access  Private
var getProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, posts, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)
                        .select("-password")
                        .populate("followers", "_id name")
                        .populate("following", "_id name")];
            case 1:
                user = _c.sent();
                // Check if user exists
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                return [4 /*yield*/, Post_1.default.find({ postedBy: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id })
                        .populate("postedBy", "_id name")
                        .exec()];
            case 2:
                posts = _c.sent();
                // Add posts to the user
                user === null || user === void 0 ? void 0 : user.set({ posts: posts });
                // Return user profile and posts
                res.status(200).json(user);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                if (error_1 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: "Something went wrong",
                        error: error_1.message,
                    });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProfile = getProfile;
// @desc    Update user profile
// @route   PUT /api/v1/users/update-profile
// @access  Private
var updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)];
            case 1:
                user = _c.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                return [4 /*yield*/, User_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, __assign({}, req.body), { new: true }).select("-password")];
            case 2:
                updatedUser = _c.sent();
                res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    updatedUser: updatedUser,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                if (error_2 instanceof Error) {
                    res.status(400).json({
                        success: false,
                        message: "Something went wrong",
                        error: error_2.message,
                    });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProfile = updateProfile;
// @desc    Delete user profile
// @route   DELETE /api/v1/users/delete-user
// @access  Private
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                return [4 /*yield*/, User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)];
            case 1:
                user = _e.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                // Check if user is authorized to delete the user
                if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
                    res.status(401);
                    throw new Error("Not authorized to delete this user");
                }
                // Delete user
                return [4 /*yield*/, User_1.default.findByIdAndDelete((_c = req.user) === null || _c === void 0 ? void 0 : _c._id)];
            case 2:
                // Delete user
                _e.sent();
                return [4 /*yield*/, Post_1.default.deleteMany({ postedBy: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id })];
            case 3:
                _e.sent();
                res.status(200).json({
                    success: true,
                    message: "Sad to see you go, user deleted successfully",
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _e.sent();
                if (error_3 instanceof Error) {
                    res.status(400).json({
                        success: false,
                        message: "Something went wrong",
                        error: error_3.message,
                    });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
// @desc    Get user profile by id
// @route   GET /api/v1/users/:id
// @access  Public
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, posts, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById(req.params.id)
                        .select("-password")
                        .populate("followers", "_id name")
                        .populate("following", "_id name")];
            case 1:
                user = _a.sent();
                // Check if user exists
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                return [4 /*yield*/, Post_1.default.find({ postedBy: req.params.id })
                        .populate("postedBy", "_id name")
                        .exec()];
            case 2:
                posts = _a.sent();
                // Add posts to the user
                res.status(200).json({ user: user, posts: posts });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                if (error_4 instanceof Error) {
                    res.status(400).json({
                        success: false,
                        message: "Something went wrong",
                        error: error_4.message,
                    });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
// @desc    Follow a user
// @route   PUT /api/v1/users/follow
// @access  Private
var followUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, notification, guest, me, error_5;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                return [4 /*yield*/, User_1.default.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)];
            case 1:
                user = _d.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                notification = user.notifications;
                notification.push({
                    title: "New follower",
                    description: "".concat(user.username, " started following you"),
                    name: user.username,
                    _id: user._id,
                });
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req.body.followId, {
                        $push: {
                            followers: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
                            notifications: {
                                _id: user === null || user === void 0 ? void 0 : user._id,
                                title: "New follower",
                                description: "".concat(user === null || user === void 0 ? void 0 : user.username, " started following you"),
                                name: user === null || user === void 0 ? void 0 : user.username,
                            },
                        },
                    }, { new: true })];
            case 2:
                guest = _d.sent();
                return [4 /*yield*/, User_1.default.findByIdAndUpdate((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, {
                        $push: {
                            following: req.body.followId,
                        },
                    }, { new: true }).select("-password")];
            case 3:
                me = _d.sent();
                res.status(200).json({ guest: guest, me: me });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _d.sent();
                if (error_5 instanceof Error) {
                    res.status(400).json({
                        success: false,
                        error: error_5.message,
                    });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.followUser = followUser;
// @desc    Unfollow a user
// @route   PUT /api/v1/users/unfollow
// @access  Private
var unfollowUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, notification, guest, me, error_6;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                return [4 /*yield*/, User_1.default.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)];
            case 1:
                user = _d.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                notification = user.notifications;
                notification = [];
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req.body.unfollowId, {
                        $pull: { followers: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id },
                        // notifications: notification,
                    }, { new: true })];
            case 2:
                guest = _d.sent();
                return [4 /*yield*/, User_1.default.findByIdAndUpdate((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, {
                        $pull: { following: req.body.unfollowId },
                    }, { new: true }).select("-password")];
            case 3:
                me = _d.sent();
                res.status(200).json({ guest: guest, me: me });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _d.sent();
                if (error_6 instanceof Error) {
                    res.status(400).json({
                        success: false,
                        error: error_6.message,
                    });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.unfollowUser = unfollowUser;
// @desc    Send notifications
// @route   POST /api/v1/users/notifications
// @access  Private
var sendNotifications = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, notification, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById(req.body.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                notification = user.notifications;
                notification.push({
                    _id: user._id,
                    title: "New follower",
                    description: "".concat(user.username, " started following you"),
                    name: user.username,
                });
                if (user.notifications.length > 1) {
                    res.status(400);
                    throw new Error("You have already sent a notification");
                }
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
                        notifications: notification,
                    }, { new: true })];
            case 2:
                _a.sent();
                res.status(201).json({
                    success: true,
                    message: "Notification sent successfully",
                });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                if (error_7 instanceof Error) {
                    res.status(400).json({
                        success: false,
                        error: error_7.message,
                    });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendNotifications = sendNotifications;
// @desc    Get all notifications
// @route   GET /api/v1/users/get-all-notifications
// @access  Private
var getNotifications = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, seenNotifications, notifications, error_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                seenNotifications = user.seenNotifications;
                notifications = user.notifications;
                // We aer pushing all the notifications to the seen notifications array
                seenNotifications.push.apply(seenNotifications, notifications);
                // Update user with new notifications array and seen notifications array and save
                // We are setting the notifications array to empty array because we have seen all the notifications and we dont want to see them again
                user.notifications = [];
                // now we are setting the seen notifications array to the notifications array because we have seen all the notifications and we dont want to see them again
                user.seenNotifications = notifications;
                // We are saving the user
                return [4 /*yield*/, user.save()];
            case 2:
                // We are saving the user
                _b.sent();
                res.status(200).json({
                    success: true,
                    message: "All notifications marked as seen",
                });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _b.sent();
                if (error_8 instanceof Error) {
                    res.status(400).json({
                        success: false,
                        error: error_8.message,
                    });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getNotifications = getNotifications;
// @desc    Delete notification
// @route   DELETE /api/v1/users/notifications/:id
// @access  Private
var deleteNotification = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser, error_9;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                user.notifications = [];
                user.seenNotifications = [];
                return [4 /*yield*/, user.save()];
            case 2:
                updatedUser = _b.sent();
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
                return [3 /*break*/, 4];
            case 3:
                error_9 = _b.sent();
                if (error_9 instanceof Error) {
                    res.status(400).json({
                        success: false,
                        error: error_9.message,
                    });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteNotification = deleteNotification;
