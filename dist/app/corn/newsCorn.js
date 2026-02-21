"use strict";
// import cron from "node-cron";
// import axios from "axios";
// import { Article } from "../modules/article/article.model";
// import dotenv from "dotenv";
// dotenv.config();
// export const newsCron = async () => {
//     // এই ফাংশনটি ডিফাইন করুন যা ডেটা ফেচ করবে
//      const fetchAndSave = async () => {
//         try {
//             console.log("Fetching news from NewsData.io...");
//             const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&language=en`);
//             const articles = response.data.results;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsCron = exports.fetchAndSaveNewsLogic = void 0;
//             if (articles && articles.length > 0) {
//                 for (const item of articles) {
//                     await Article.findOneAndUpdate(
//                         { article_id: item.article_id },
//                         { ...item, contentType: 'News' },
//                         { upsert: true, new: true }
//                     );
//                 }
//                 console.log(`${articles.length} Articles sync complete!`);
//             }
//         } catch (error: any) {
//             console.error("Fetch Error:", error.message);
//         }
//     };
//     // ১. সার্ভার চালু হওয়ার সাথে সাথে একবার রান হবে
//     await fetchAndSave();
//     // ২. এরপর প্রতি ৬ ঘণ্টা পর পর অটোমেটিক চলবে
//     cron.schedule('0 * * * *', fetchAndSave);
// };
// src/app/cron/newsCron.ts
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const article_model_1 = require("../modules/article/article.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// এই লজিকটি এখন আলাদাভাবে এক্সপোর্ট করা, যা কন্ট্রোলার থেকেও কল করা যাবে
const fetchAndSaveNewsLogic = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching news from NewsData.io...");
        const response = yield axios_1.default.get(`https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&language=en`);
        const articles = response.data.results;
        if (articles && articles.length > 0) {
            for (const item of articles) {
                yield article_model_1.Article.findOneAndUpdate({ article_id: item.article_id }, Object.assign(Object.assign({}, item), { contentType: 'News' }), { upsert: true, new: true });
            }
            console.log(`${articles.length} Articles sync complete!`);
            return articles.length;
        }
        return 0;
    }
    catch (error) {
        console.error("Fetch Error:", error.message);
        throw error;
    }
});
exports.fetchAndSaveNewsLogic = fetchAndSaveNewsLogic;
const newsCron = () => __awaiter(void 0, void 0, void 0, function* () {
    // ১. সার্ভার চালু হওয়ার সাথে সাথে একবার রান হবে (লোকাল ডেভেলপমেন্টের জন্য)
    yield (0, exports.fetchAndSaveNewsLogic)();
    // ২. এরপর প্রতি ঘণ্টায় অটোমেটিক চলবে (লোকাল সার্ভার চালু থাকলে)
    node_cron_1.default.schedule('0 * * * *', exports.fetchAndSaveNewsLogic);
});
exports.newsCron = newsCron;
