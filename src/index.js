import express from "express";
import {ConnectDB} from "./db/db_connection.js";
import dotenv from "dotenv";
dotenv.config({path : "../.env"});

const app = express();

ConnectDB();


const PORT = process.env.PORT;

app.listen(PORT , ()=>{
    console.log("server online");
})