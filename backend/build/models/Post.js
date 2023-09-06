"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: "no photo",
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            comment: {
                type: String,
            },
            postedBy: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    postedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    tags: [
        {
            type: String,
        },
    ],
}, { timestamps: true });
var PostModel = (0, mongoose_1.model)("Post", PostSchema);
exports.default = PostModel;
