/* eslint-disable @typescript-eslint/no-explicit-any */
import app from "./app"
import { Server } from "http"
import mongoose from "mongoose";
import { newsCron } from "./app/corn/newsCorn";
// import { connectRedis } from "./app/config/redis.config";
import dotenv from "dotenv";
dotenv.config();
let server: Server;

const startServer = async () => {
    try {

        await mongoose.connect(process.env.DB_URL as string);
        console.log("connected to DB!");

        newsCron();
        console.log("Cron Jobs Initialized!");

        server = app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port 5000`);
        })
    } catch (err) {
        console.log(err);
    }

}

(async () => {
    await startServer()

})()