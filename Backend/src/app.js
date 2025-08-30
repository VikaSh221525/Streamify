import express from 'express'
const app = express();

app.use(express.json())

app.get('/api/auth/signup', (req,res) => {
    res.send("SignUp Route")
})
app.get('/api/auth/login', (req,res) => {
    res.send("signIn Route")
})
app.get('/api/auth/logout', (req,res) => {
    res.send("Logout Route")
})

export default app;