"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
    },
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    ],
    following: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    ],
    bio: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
    },
    savedPosts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    notifications: Array(),
    seenNotifications: Array(),
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", userSchema);
