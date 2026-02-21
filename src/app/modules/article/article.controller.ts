import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ArticleService } from "./article.service";

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

export const ArticleController = {
    getAllArticleFromDB,
    getSingleArticleFromDB,
};