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

export async function sendFriendRequest(req, res){
    try{
        const myId = req.user._id;
        const {id : recipientId} = req.params;

        // multiple checks
        // prevent sending req to yourself
        if(myId === recipientId){
            return res.status(400).json({message: "You cannot send friend request to yourself"});
        }
        const recipient = await userModel.findById(recipientId);
        if(!recipient){
            return res.status(404).json({message: "Recipient user not found"});
        }

        // check if user is already a friend
        if(recipient.friendRequests.includes(myId)){
            return res.status(400).json({message: "Friend are already friends with this user"});
        }

        // check if req already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                {sender: myId, recipient: recipientId},
                {sender: recipientId, recipient: myId}
            ],
        })
        if(existingRequest){
            return res.status(400).json({message: "Friend request already exists"});
        }

        const friendRequest = new FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        })
        res.status(201).json({message: "Friend request sent successfully", friendRequest})

    }catch(err){
        console.log("Error in sending friend request", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}

