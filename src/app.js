import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config({path : "../.env"});

const app = express();
app.use(cookieParser());
app.use(cors({
    origin : "*",
    credentials : true
}))
app.use(express.json({limit : "10mb"}));
app.use(express.urlencoded({extended : true , limit : "10mb"}));
app.use(express.static("public"));

// configuring the cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:  process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_API_SECRET,
});


// routes import
import userRouter from "./routes/user.routes.js"
app.use("/users" , userRouter);



export {app};