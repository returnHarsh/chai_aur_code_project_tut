
import { app } from "./app.js";
import {ConnectDB} from "./db/db_connection.js";
import dotenv from "dotenv";
dotenv.config({path : "../.env"});

const PORT = process.env.PORT || 8000 ;

ConnectDB().then((res)=>{
    console.log("database successfully connected");
    app.listen(PORT , ()=>{
        console.log("server online on PORT " , PORT);
    })
}).catch(err=>console.log('Database connection error ' , err.message));

