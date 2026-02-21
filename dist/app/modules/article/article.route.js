"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRoutes = void 0;
const express_1 = require("express");
const article_controller_1 = require("./article.controller");
exports.ArticleRoutes = (0, express_1.Router)();
exports.ArticleRoutes.get("/", article_controller_1.ArticleController.getAllArticleFromDB);
exports.ArticleRoutes.get("/:id", article_controller_1.ArticleController.getSingleArticleFromDB);
exports.ArticleRoutes.get("/sync-news", article_controller_1.ArticleController.syncNews);
