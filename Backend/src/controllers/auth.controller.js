import userModel from "../models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export async function registerUser(req, res){
    const {fullName, email, password} = req.body;
    const isUserExist = await userModel.findOne({email})
    if(isUserExist){
        res.status(400).json({message: "user already exists"})
    }

    const idx = Math.floor(Math.random()*100)+1;  //generate a no. between 1 to 100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({fullName, email, password: hashPassword, profilePic:randomAvatar});

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,  //prevent XSS attack
        secure: process.env.NODE_ENV === "production", //cookie only works in https
        sameSite: "strict",  //prevent CSRF attack
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
        message: "user created successfully",
        newUser:{
            email: newUser.email,
            fullName: newUser.fullName,
            _id: newUser._id,
        }
    })

}
export async function loginUser(req, res){
    res.send("login Route")
}
export async function logoutUser(req, res){
    res.send("logout Route")
}
