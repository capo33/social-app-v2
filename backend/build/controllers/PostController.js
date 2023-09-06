"use strict";
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
exports.getSavedPosts = exports.unsavePost = exports.savePost = exports.deletePost = exports.deleteComment = exports.commentPost = exports.unlikePost = exports.likePost = exports.getMyPosts = exports.createPost = exports.getPost = exports.getPosts = void 0;
var Post_1 = __importDefault(require("../models/Post"));
var User_1 = __importDefault(require("../models/User"));
// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
var getPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.find({})
                        .populate("postedBy", "_id username image")
                        .populate("comments.postedBy", "_id username")
                        .sort({ date: -1 })];
            case 1:
                posts = _a.sent();
                res.status(200).json(posts);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: error_1.message,
                    });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPosts = getPosts;
// @desc    Get a single post
// @route   GET /api/v1/posts/:postId
// @access  Public
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findById(req.params.postId)];
            case 1:
                post = _a.sent();
                if (!post) {
                    res.status(404);
                    throw new Error("Post not found");
                }
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: error_2.message,
                    });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPost = getPost;
// @desc    Create a post
// @route   POST /api/v1/posts
// @access  Private
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, image, tags, post, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, description = _a.description, image = _a.image, tags = _a.tags;
                if (!title || !description || !tags || !image) {
                    res.status(422);
                    throw new Error("Please add all the fields");
                }
                return [4 /*yield*/, Post_1.default.create({
                        title: title,
                        description: description,
                        image: image,
                        tags: tags,
                        postedBy: req.user,
                    })];
            case 1:
                post = _b.sent();
                res.status(201).json({
                    message: "Post created successfully",
                    post: post,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                if (error_3 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: error_3.message,
                    });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
// @desc    Get all posts by a user
// @route   GET /api/v1/posts/my-posts
// @access  Private
var getMyPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.find({ postedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id })
                        .populate("postedBy", "_id name")
                        .sort({ date: -1 })];
            case 1:
                posts = _b.sent();
                if (!posts) {
                    res.status(404);
                    throw new Error("No posts found");
                }
                res.status(200).json(posts);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                if (error_4 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: error_4.message,
                    });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMyPosts = getMyPosts;
// @desc    Like a post
// @route   PUT /api/v1/posts/like
// @access  Private
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(req.body.postId, {
                        $push: { likes: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id },
                        $inc: { likesCount: 1 },
                    }, { new: true })];
            case 1:
                post = _b.sent();
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                if (error_5 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: error_5.message,
                    });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.likePost = likePost;
// @desc    Unlike a post
// @route   PUT /api/v1/posts/unlike
// @access  Private
var unlikePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(req.body.postId, {
                        $pull: { likes: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id },
                        $inc: { likesCount: -1 },
                    }, { new: true })];
            case 1:
                post = _b.sent();
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                if (error_6 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: error_6.message,
                    });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unlikePost = unlikePost;
// @desc    Comment on a post
// @route   PUT /api/v1/posts/comment
// @access  Private
var commentPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, post, error_7;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                comment = {
                    comment: req.body.comment,
                    postedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(req.body.postId, {
                        $push: {
                            comments: comment,
                        },
                    }, {
                        new: true,
                    })
                        .populate("comments.postedBy", "_id name")
                        .populate("postedBy", "_id name Photo")];
            case 2:
                post = _b.sent();
                res.status(200).json(post);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _b.sent();
                if (error_7 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: error_7.message,
                    });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.commentPost = commentPost;
// @desc    Delete a comment
// @route   DELETE /api/v1/posts/comment/:postId/:commentId
// @access  Private
var deleteComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(req.params.postId, {
                        $pull: {
                            comments: {
                                _id: req.params.commentId,
                            },
                        },
                    }, {
                        new: true,
                    }).populate("postedBy", "_id, name")];
            case 1:
                post = _a.sent();
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                if (error_8 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: error_8.message,
                    });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteComment = deleteComment;
// @desc    Delete a post
// @route   DELETE /api/v1/posts/:postId
// @access  Private
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                postId = req.params.postId;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Post_1.default.findById(postId).populate("postedBy", "_id")];
            case 2:
                post = _c.sent();
                if (!post) {
                    res.status(404);
                    throw new Error("Post not found");
                }
                // Check if the user who is deleting the post is the same user who created the post
                if (((_a = post.postedBy) === null || _a === void 0 ? void 0 : _a._id.toString()) !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
                    res.status(200);
                    throw new Error("You are not authorized to delete this post");
                }
                return [4 /*yield*/, Post_1.default.findByIdAndDelete(postId)];
            case 3:
                _c.sent();
                res.status(200).json({ message: "Post deleted successfully" });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                if (err_1 instanceof Error)
                    res.status(500).json({ message: err_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
// @desc    Save a post
// @route   PUT /api/v1/posts/save
// @access  Private
var savePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, user, isSaved, error_9;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                // Check if the user is logged in
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                return [4 /*yield*/, Post_1.default.findById(req.body.postId).populate("postedBy", "_id name")];
            case 1:
                post = _c.sent();
                if (!post) {
                    res.status(404);
                    throw new Error("Post not found");
                }
                return [4 /*yield*/, User_1.default.findById(req.body.userId)];
            case 2:
                user = _c.sent();
                isSaved = (_a = user === null || user === void 0 ? void 0 : user.savedPosts) === null || _a === void 0 ? void 0 : _a.includes(post._id);
                if (isSaved) {
                    res.status(400);
                    throw new Error("Post already saved");
                }
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req === null || req === void 0 ? void 0 : req.body.userId, {
                        $push: { savedPosts: post._id },
                    }, { new: true } // to return the updated document
                    )];
            case 3:
                _c.sent();
                res.status(200).json({
                    message: "Post saved successfully",
                    savedPosts: user === null || user === void 0 ? void 0 : user.savedPosts,
                    savePostsCount: (_b = user === null || user === void 0 ? void 0 : user.savedPosts) === null || _b === void 0 ? void 0 : _b.length,
                });
                return [3 /*break*/, 5];
            case 4:
                error_9 = _c.sent();
                if (error_9 instanceof Error)
                    res.status(400).json({ message: error_9.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.savePost = savePost;
// @desc    Usaved post
// @route   PUT /api/v1/posts/unsave
// @access  Private
var unsavePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, post, error_10;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                // Check if the user is logged in
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                return [4 /*yield*/, User_1.default.findById(req.body.userId)];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, Post_1.default.findById(req.body.postId).populate("postedBy", "_id name")];
            case 2:
                post = _b.sent();
                if (!post) {
                    res.status(404);
                    throw new Error("Post not found");
                }
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req === null || req === void 0 ? void 0 : req.body.userId, {
                        $pull: { savedPosts: post._id },
                    }, { new: true } // to return the updated document
                    )];
            case 3:
                _b.sent();
                res.status(200).json({
                    message: "Post unsaved successfully",
                    savedPosts: user === null || user === void 0 ? void 0 : user.savedPosts,
                    savePostsCount: (_a = user === null || user === void 0 ? void 0 : user.savedPosts) === null || _a === void 0 ? void 0 : _a.length,
                });
                return [3 /*break*/, 5];
            case 4:
                error_10 = _b.sent();
                if (error_10 instanceof Error)
                    res.status(400).json({ message: error_10.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.unsavePost = unsavePost;
// @desc    Get saved posts
// @route   GET /api/v1/posts/saved-posts/ids/:id
// @access  Private
var getSavedPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, savedPosts, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, User_1.default.findById(id)
                        .populate("savedPosts", "_id title description image tags")
                        .select("savedPosts")];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, Post_1.default.find({ _id: { $in: user === null || user === void 0 ? void 0 : user.savedPosts } })
                        .populate("postedBy", "_id name")
                        .populate("comments.postedBy", "_id name")];
            case 2:
                savedPosts = _a.sent();
                res.status(200).json({ savedPosts: savedPosts });
                return [3 /*break*/, 4];
            case 3:
                error_11 = _a.sent();
                if (error_11 instanceof Error)
                    res.status(400).json({ message: error_11.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSavedPosts = getSavedPosts;
