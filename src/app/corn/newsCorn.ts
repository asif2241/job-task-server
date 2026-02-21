import cron from "node-cron";
import axios from "axios";
import { Article } from "../modules/article/article.model";
import dotenv from "dotenv";
dotenv.config();
export const newsCron = async () => {
    // এই ফাংশনটি ডিফাইন করুন যা ডেটা ফেচ করবে
    const fetchAndSave = async () => {
        try {
            console.log("Fetching news from NewsData.io...");
            const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&language=en`);
            const articles = response.data.results;

            if (articles && articles.length > 0) {
                for (const item of articles) {
                    await Article.findOneAndUpdate(
                        { article_id: item.article_id },
                        { ...item, contentType: 'News' },
                        { upsert: true, new: true }
                    );
                }
                console.log(`${articles.length} Articles sync complete!`);
            }
        } catch (error: any) {
            console.error("Fetch Error:", error.message);
        }
    };

    // ১. সার্ভার চালু হওয়ার সাথে সাথে একবার রান হবে
    await fetchAndSave();

    // ২. এরপর প্রতি ৬ ঘণ্টা পর পর অটোমেটিক চলবে
    cron.schedule('0 */6 * * *', fetchAndSave);
};