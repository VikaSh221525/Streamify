import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import HomePage from '../pages/HomePage'
import NotificationPage from '../pages/NotificationPage'
import OnboardingPage from '../pages/OnboardingPage'
import ChatPage from '../pages/ChatPage'
import CallPage from '../pages/CallPage'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios'

const Mainroute = () => {
    const {data: authData, isLoading, error} = useQuery({
        queryKey: ['authUser'],
        queryFn: async () =>{
            const res = await axiosInstance.get('/auth/me');
            return res.data;
        },
        retry: false,
    });
    const authUser = authData?.user
    return (
        <>
            <Routes>
                <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/login'/>} />
                <Route path='login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>} />
                <Route path='signup' element={!authUser ? <SignUpPage/> : <Navigate to='/'/>} />
                <Route path='notification' element={authUser ? <NotificationPage/> : <Navigate to='/login'/>} />
                <Route path='onboarding' element={authUser ? <OnboardingPage/> : <Navigate to='/login'/>} />
                <Route path='chat' element={authUser ? <ChatPage/> : <Navigate to='/login'/>} />
                <Route path='call' element={authUser ? <CallPage/> : <Navigate to='/login'/>} />
            </Routes>
        </>
    )
}

export default Mainroute