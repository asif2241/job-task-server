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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const article_model_1 = require("./article.model");
const getAllArticleFromDB = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, author, language, country, category, contentType } = filters;
    const query = {};
    // ✅ Date Filter
    if (startDate || endDate) {
        query.pubDate = {};
        if (startDate)
            query.pubDate.$gte = new Date(startDate);
        if (endDate)
            query.pubDate.$lte = new Date(endDate);
    }
    // ✅ Author (Case-insensitive partial match in array)
    if (author) {
        query.creator = { $regex: author, $options: "i" };
    }
    if (language)
        query.language = language;
    // ✅ Country
    if (country)
        query.country = country;
    // ✅ Category (AND logic: matches all categories in the list)
    if (category) {
        const categories = category.split(",").map(c => c.trim()); // trim যোগ করা সেফ
        query.category = { $all: categories };
    }
    if (contentType)
        query.contentType = contentType;
    return article_model_1.Article.find(query)
        .sort({ pubDate: -1 })
        .lean(); // Array type inference automically works here
});
const getSingleArticleFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return article_model_1.Article.findOne({ article_id: id }).lean();
});
exports.ArticleService = {
    getAllArticleFromDB,
    getSingleArticleFromDB
};
