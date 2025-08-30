import userModel from "../models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../db/stream.db.js";

export async function registerUser(req, res) {
    try {
        const { fullName, email, password } = req.body;
        const isUserExist = await userModel.findOne({ email })
        if (isUserExist) {
            res.status(400).json({ message: "user already exists" })
        }

        const idx = Math.floor(Math.random() * 100) + 1;  //generate a no. between 1 to 100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ fullName, email, password: hashPassword, profilePic: randomAvatar });

        // Create user in STREAM as WELL
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            });
            console.log(`Stream user created successfully for ${newUser.fullName}`);
        }catch(err){
            console.log("Error in creating stream user", err);
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        res.cookie("token", token, {
            httpOnly: true,  //prevent XSS attack
            secure: process.env.NODE_ENV === "production", //cookie only works in https
            sameSite: "strict",  //prevent CSRF attack
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            message: "user created successfully",
            newUser: {
                email: newUser.email,
                fullName: newUser.fullName,
                _id: newUser._id,
            }
        })

    } catch (err) {
        console.log("Error in register user", err);
        res.status(500).json({ message: "Internal server error" })
    }
}
export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid Email or Password" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,  //prevent XSS attack
            secure: process.env.NODE_ENV === "production", //cookie only works in https
            sameSite: "strict",  //prevent CSRF attack
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Login successfull",
            user: {
                email: user.email,
                _id: user._id,
                fullName: user.fullName
            }
        })
    } catch (err) {
        console.log("Error in login user", err);
        res.status(500).json({ message: "Internal server error" })
    }
}
export async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successfull" })
}

export async function onboard(req, res){
    try{
        const userId = req.user._id;
        const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body;

        const updateduser = await userModel.findByIdAndUpdate(userId, {
            fullName, bio, nativeLanguage, learningLanguage, location, isOnboarded: true
        }, {new:true})
        if(!updateduser){
            return res.status(404).json({message: "User not found"})
        }

        // Update user in STREAM as WELL
        try{
            await upsertStreamUser({
                id: updateduser._id.toString(),
                name: updateduser.fullName,
                image: updateduser.profilePic || "",
            })
            console.log(`stream user updated successfully for ${updateduser.fullName}`);
        }catch(err){
            console.log("Error in updating stream user", err.message);
        }

        res.status(200).json({
            message: "User onboarded successfully",
            user: updateduser
        })

    }catch(err){
        console.log("Error in onboard user", err);
        res.status(500).json({message: "Internal server error"})
    }
}
