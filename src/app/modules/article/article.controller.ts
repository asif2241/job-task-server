import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ArticleService } from "./article.service";
import { fetchAndSaveNewsLogic } from "../../corn/newsCorn";

const getAllArticleFromDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await ArticleService.getAllArticleFromDB(query)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "All Articles retrived successfully",
        data: result,
    })
})

const getSingleArticleFromDB = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        const result = await ArticleService.getSingleArticleFromDB(id as string);

        //   if (!result) {
        //     return sendResponse(res, {
        //       success: false,
        //       statusCode: 404,
        //       message: "Article not found",
        //       data: null,
        //     });
        //   }

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Article retrieved successfully",
            data: result,
        });
    }
);

// controllers/article.controller.ts
export const syncNews = async (req: Request, res: Response) => {
    try {
        // এখানে আপনার newsCron-এর ভেতরের লজিকটি কল করুন
        await fetchAndSaveNewsLogic();
        res.status(200).json({ message: "Sync successful" });
    } catch (error) {
        res.status(500).json({ error: "Sync failed" });
    }
};

export const ArticleController = {
    getAllArticleFromDB,
    getSingleArticleFromDB,
    syncNews
};