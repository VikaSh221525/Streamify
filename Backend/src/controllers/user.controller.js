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
        if(myId.toString() === recipientId.toString()){
            return res.status(400).json({message: "You cannot send friend request to yourself"});
        }
        const recipient = await userModel.findById(recipientId);
        if(!recipient){
            return res.status(404).json({message: "Recipient user not found"});
        }

        // check if user is already a friend
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message: "You are already friends with this user"});
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

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        })
        res.status(201).json(friendRequest)

    }catch(err){
        console.log("Error in sending friend request", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function acceptFriendRequest(req, res) {
    try{
        const {id: requestId} = req.params;
        const friendRequest = await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({message: "Friend request not found"});
        }
        if(friendRequest.recipient.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "You are not authorized to accept this friend request"});
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        // update both users' friends list
        // add to set : adds an elements to an array if they do not already exists
        const sender = await userModel.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {friends: friendRequest.recipient}
        });
        const recipient = await userModel.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {friends: friendRequest.sender}
        });

        res.status(200).json({message: "Friend request accepted successfully"});

    }catch(err){
        console.log("Error in accepting friend request", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getMyFriendRequests(req, res){
    try{
        const incomingRequests = await FriendRequest.find({
            recipient: req.user._id,
            status: "pending",
        }).populate('sender', 'fullName profilePic nativeLanguage learningLanguage');
        
        const acceptedRequests = await FriendRequest.find({
            sender: req.user._id,
            status: "accepted",
        }).populate('recipient', 'fullName profilePic nativeLanguage learningLanguage');

        res.status(200).json({incomingRequests, acceptedRequests});
    }catch(err){
        console.log("Error in getting friend requests", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getOutgoingFriendRequests(req, res){
    try{
        const outgoingRequest = await FriendRequest.find({
            sender: req.user._id,
            status: "pending",
        }).populate('recipient', 'fullName profilePic nativeLanguage learningLanguage');

        res.status(200).json(outgoingRequest);

    }catch(err){
        console.log("Error in Outgoing friend requests", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}