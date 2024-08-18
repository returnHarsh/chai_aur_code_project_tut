import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


const uploadOnCloudinary = async(localFilePath)=>{
    try{
        console.log("localpath is " , localFilePath);
        if(!localFilePath) return null;

        // uploading the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {resource_type : "auto"})

        // file is successfully uploaded so we have to delete the file from the server using the localpath of file
        fs.unlinkSync(localFilePath);

        // file has been successfully uploaded
        console.log("file uploaded on cloudinary " , response);
        return response;
    }catch(err){
        console.log("inside the cloudinary error block")
        fs.unlink(localFilePath) // remove the locally saved temporary file as the upload got failed
        return null;
    }

}

export {uploadOnCloudinary};