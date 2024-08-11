import mongoose from "mongoose";

export const ConnectDB = async()=>{

    try{
        const connectionInatance = await mongoose.connect(process.env.MONGO_CONNECT_URI);
        console.log("MONGO DB conncted " , connectionInatance.connection.host);
    }catch(err){
        console.log("MONGO DB connection FAILED " , err.message);
        process.exit(1);
    }

}