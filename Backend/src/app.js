import express from 'express'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import cookieParser from 'cookie-parser';
import path from 'path'
import cors from 'cors';
const app = express();

const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  //allow frontend to send the cookie
}))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/chat', chatRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(_dirname, '../Frontend', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(_dirname, '../Frontend', 'dist', 'index.html'));
    })
}

export default app;