# 🚀 Streamify

A modern, real-time chat application built with the MERN stack and Stream Chat API. Connect with friends, send messages, and enjoy seamless communication in a beautiful, responsive interface.

## ✨ Features

- **Real-time Messaging** - Instant chat powered by Stream Chat API
- **User Authentication** - Secure JWT-based auth with bcrypt encryption
- **Friend System** - Send/accept friend requests and manage connections
- **User Onboarding** - Smooth user registration and profile setup
- **Responsive Design** - Works perfectly on desktop and mobile
- **Production Ready** - Optimized build with static file serving

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stream Chat** - Real-time messaging service
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Stream Chat React** - Chat UI components

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Stream Chat account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VikaSh221525/Streamify.git
   cd Streamify
   ```

2. **Install dependencies**
   ```bash
   npm run build
   ```

3. **Environment Setup**
   
   Create `.env` file in the `Backend` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
Streamify/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middlewares/     # Custom middleware
│   │   ├── routes/          # API routes
│   │   ├── db/              # Database configuration
│   │   └── app.js           # Express app setup
│   ├── server.js            # Server entry point
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities and configs
│   │   └── ...
│   ├── dist/                # Built frontend files
│   └── package.json
└── package.json             # Root package.json
```

## 🔧 Development

### Running in Development Mode

**Backend** (Terminal 1):
```bash
cd Backend
npm run server
```

**Frontend** (Terminal 2):
```bash
cd Frontend
npm run dev
```

### Building for Production

```bash
npm run build
```

This will:
- Install dependencies for both frontend and backend
- Build the React app for production
- Create optimized static files in `Frontend/dist`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/onboarding` - Complete user profile
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get recommended users
- `GET /api/users/friends` - Get user's friends
- `POST /api/users/friend-request/:id` - Send friend request
- `PUT /api/users/friend-request/:id/accept` - Accept friend request
- `GET /api/users/friend-requests` - Get incoming friend requests
- `GET /api/users/outgoing-friend-requests` - Get outgoing requests

### Chat
- `GET /api/chat/token` - Get Stream Chat token

## 🚀 Deployment

The app is configured for easy deployment on platforms like:

- **Render** ⭐ (Recommended)
- **Railway**
- **Heroku**
- **Vercel**

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Stream Chat](https://getstream.io/) for the amazing chat API
- [MongoDB](https://www.mongodb.com/) for the database
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework

---

**Made with ❤️ by [VikaSh221525](https://github.com/VikaSh221525)**

⭐ Star this repo if you found it helpful!