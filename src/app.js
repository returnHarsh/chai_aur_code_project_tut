import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors({
    origin : "*",
    credentials : true
}))
app.use(express.json({limit : "10mb"}));
app.use(express.urlencoded({extended : true , limit : "10mb"}));
app.use(express.static("public"));


export {app};