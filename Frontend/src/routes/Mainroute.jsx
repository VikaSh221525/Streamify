import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import HomePage from '../pages/HomePage'
import NotificationPage from '../pages/NotificationPage'
import OnboardingPage from '../pages/OnboardingPage'
import ChatPage from '../pages/ChatPage'
import CallPage from '../pages/CallPage'

const Mainroute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='signup' element={<SignUpPage/>} />
                <Route path='notification' element={<NotificationPage/>} />
                <Route path='onboarding' element={<OnboardingPage/>} />
                <Route path='chat' element={<ChatPage/>} />
                <Route path='call' element={<CallPage/>} />
            </Routes>
        </>
    )
}

export default Mainroute