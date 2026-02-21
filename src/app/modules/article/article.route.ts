import { Router } from "express";
import { ArticleController } from "./article.controller";

export const ArticleRoutes = Router()

ArticleRoutes.get("/", ArticleController.getAllArticleFromDB);
ArticleRoutes.get("/:id", ArticleController.getSingleArticleFromDB);
ArticleRoutes.get("/sync-news", ArticleController.syncNews);