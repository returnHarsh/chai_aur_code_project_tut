import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // url of cloudinary
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true })

// creating a custom methods 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// again creating a custom method
userSchema.methods.generateAccessToken = async function () {
   return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// custome code for generating the refresh token
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
         _id: this._id,
         email: this.email,
         username: this.username,
         fullname: this.fullname
     },
         process.env.REFRESH_TOKEN_SECRET,
         {
             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
         }
     )
 }

// this will run everytime just before the data is going to save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model("User", userSchema)
export default User