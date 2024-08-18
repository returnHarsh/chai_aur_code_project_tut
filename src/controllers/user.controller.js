import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary_file_upload.js"

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;
    console.log(req.body)


    if ([fullname, email, username, password].some((filed) => (!filed || filed?.trim() === ""))) {
        throw new ApiError(404, "All fields required");
    }

    const exsistedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (exsistedUser) throw new ApiError(409, "User with email or username is already exists please login");
 
    const avatarLocalPath = req.files.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path || "";

    if (!avatarLocalPath) throw new ApiError(404, "Avatar Image is required");

    // uploading the avatar and coverImage to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    let coverImage = ""
    if(coverImageLocalPath){
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    if (!avatar) throw new ApiError(404, "Avatar Image is requires");

    const user = await User.create({
        fullname, email, avatar: avatar.url, coverImage: coverImage?.url || "", username: username.toLowerCase(), password
    })

    const isUserCreated = await User.findById(user._id)
    if(!isUserCreated) throw new ApiError("404" , "User not created , please try again")

    return res.status(201).json(new ApiResponse(200 , isUserCreated , "User created successfully"))
})

export { registerUser }