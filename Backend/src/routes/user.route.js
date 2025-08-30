import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { acceptFriendRequest, getMyFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';
const router = express.Router();
// apply middleware to all routes
router.use(protectRoute)
// endpoints => recommended users and friends
router.get('/', getRecommendedUsers);
router.get('/friends', getMyFriends);

router.post('/friend-request/:id', sendFriendRequest)
router.put('/friend-request/:id/accept', acceptFriendRequest)

router.get('/friend-requests', getMyFriendRequests);
router.get('/outgoing-friend-requests', getOutgoingFriendRequests);


export default router;