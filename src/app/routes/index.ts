import { Router } from "express";
import { ArticleRoutes } from "../modules/article/article.route";

export const router = Router()

const moduleRoutes = [
    {
        path: "/article",
        route: ArticleRoutes
    }

]


moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})