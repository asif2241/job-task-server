import cookieParser from "cookie-parser"
import express, { Request, Response, urlencoded } from "express"

import cors from "cors"
import { router } from "./app/routes"



const app = express()




app.use(cookieParser())
app.use(express.json())
app.set("trust proxy", 1);
app.use(urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000", "https://parcel-delivery-client-b5a6.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))



app.use("/api/v1", router)
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Parcel Delivery System Backend"
    })
})



export default app