import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';
const router = express.Router();
// apply middleware to all routes
router.use(protectRoute)
// endpoints => recommended users and friends
router.get('/', getRecommendedUsers);
router.get('/friends', getMyFriends);
router.post('/friend-request/:id', sendFriendRequest)

export default router;