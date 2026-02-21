import { Article } from "./article.model";
import { IArticle, INewsFilters } from "./article.interface";

const getAllArticleFromDB = async (
    filters: INewsFilters
): Promise<IArticle[]> => {

    const {
        startDate,
        endDate,
        author,
        language,
        country,
        category,
        contentType
    } = filters;

    const query: Record<string, any> = {};
    // ✅ Date Filter
    if (startDate || endDate) {
        query.pubDate = {};
        if (startDate) query.pubDate.$gte = new Date(startDate);
        if (endDate) query.pubDate.$lte = new Date(endDate);
    }

    // ✅ Author (Case-insensitive partial match in array)
    if (author) {
        query.creator = { $regex: author, $options: "i" };
    }

    if (language) query.language = language;

    // ✅ Country
    if (country) query.country = country;

    // ✅ Category (AND logic: matches all categories in the list)
    if (category) {
        const categories = category.split(",").map(c => c.trim()); // trim যোগ করা সেফ
        query.category = { $all: categories };
    }

    if (contentType) query.contentType = contentType;

    return Article.find(query)
        .sort({ pubDate: -1 })
        .lean(); // Array type inference automically works here
};

const getSingleArticleFromDB = async (
    id: string
): Promise<IArticle | null> => {
    return Article.findOne({ article_id: id }).lean();
};

export const ArticleService = {
    getAllArticleFromDB,
    getSingleArticleFromDB
};