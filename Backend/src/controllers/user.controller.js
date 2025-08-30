import FriendRequest from "../models/FriendRequest.model.js";
import userModel from "../models/User.model.js";


export async function getRecommendedUsers(req, res){
    try{
        const currentUserId = req.user._id;
        const currentuser = await userModel.findById(currentUserId);

        const recommendedUsers = await userModel.find({
            $and: [
                {_id: {$ne: currentUserId}},  //exclude current user
                {_id: {$nin: currentuser.friends}}, //exclude current user's friends
                {isOnboarded: true}
            ]
        })
        res.status(200).json(recommendedUsers)

    }catch(err){
        console.log("Error in getting recommended users", err.message);
        res.status(500).json({message: "Internal server error"})
    }

}
export async function getMyFriends(req, res){
    try{
        const user = await userModel.findById(req.user._id).select("friends").populate('friends', 'fullName profilePic nativeLanguage learningLanguage');
        res.status(200).json(user.friends)

    }catch(err){
        console.log("Error in getting friends", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}

