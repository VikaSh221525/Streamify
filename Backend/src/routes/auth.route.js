import express from 'express'
import { registerUser, loginUser, logoutUser, onboard } from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/signup', registerUser)
router.post('/login', loginUser)

// we use post method here because we are clearing the cookie Updating server side
router.post('/logout', logoutUser)

router.post('/onboarding', protectRoute, onboard)
router.get('/me', protectRoute, (req,res) => {
    res.status(200).json({user: req.user})
})

export default router;