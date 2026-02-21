"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const article_route_1 = require("../modules/article/article.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/article",
        route: article_route_1.ArticleRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
