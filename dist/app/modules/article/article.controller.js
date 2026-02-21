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
exports.ArticleController = exports.syncNews = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const article_service_1 = require("./article.service");
const newsCorn_1 = require("../../corn/newsCorn");
const getAllArticleFromDB = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield article_service_1.ArticleService.getAllArticleFromDB(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "All Articles retrived successfully",
        data: result,
    });
}));
const getSingleArticleFromDB = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield article_service_1.ArticleService.getSingleArticleFromDB(id);
    //   if (!result) {
    //     return sendResponse(res, {
    //       success: false,
    //       statusCode: 404,
    //       message: "Article not found",
    //       data: null,
    //     });
    //   }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Article retrieved successfully",
        data: result,
    });
}));
// controllers/article.controller.ts
const syncNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // এখানে আপনার newsCron-এর ভেতরের লজিকটি কল করুন
        yield (0, newsCorn_1.fetchAndSaveNewsLogic)();
        res.status(200).json({ message: "Sync successful" });
    }
    catch (error) {
        res.status(500).json({ error: "Sync failed" });
    }
});
exports.syncNews = syncNews;
exports.ArticleController = {
    getAllArticleFromDB,
    getSingleArticleFromDB,
    syncNews: exports.syncNews
};
