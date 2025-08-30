import express from 'express'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/chat', chatRoutes)

export default app;