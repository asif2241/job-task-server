"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
// article.model.ts
const mongoose_1 = require("mongoose");
const articleSchema = new mongoose_1.Schema({
    article_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    pubDate: {
        type: Date,
        required: true,
    },
    image_url: {
        type: String
    },
    source_id: {
        type: String
    },
    source_url: {
        type: String
    },
    source_icon: {
        type: String
    },
    creator: {
        type: [String],
        default: []
    },
    keywords: {
        type: [String],
        default: []
    },
    category: {
        type: [String],
        required: true,
    },
    country: {
        type: [String],
        required: true
    },
    language: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        enum: ['News', 'Blog', 'Press Release', 'Podcast'],
        default: 'News'
    }
}, {
    timestamps: true,
    versionKey: false
});
// মঙ্গোডিবিতে টেক্সট সার্চ করার জন্য টাইটেল এবং কন্টেন্টে ইনডেক্স করা হলো
articleSchema.index({ title: 'text', content: 'text' });
exports.Article = (0, mongoose_1.model)("Article", articleSchema);
