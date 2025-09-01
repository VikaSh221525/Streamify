import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import HomePage from '../pages/HomePage'
import NotificationPage from '../pages/NotificationPage'
import OnboardingPage from '../pages/OnboardingPage'
import ChatPage from '../pages/ChatPage'
import CallPage from '../pages/CallPage'
import PageLoader from '../components/PageLoader'
import useAuthUser from '../hooks/useAuthUser'

const Mainroute = () => {

    const { isLoading, authUser } = useAuthUser();
    const isAuthenticated = Boolean(authUser)
    const isOnboarded = authUser?.isOnboarded

    if (isLoading) return <PageLoader />
    return (
        <>
            <Routes>
                <Route path='/' element={isAuthenticated && isOnboarded ? (
                    <HomePage />
                ) : (
                    <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )} />
                <Route path='login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={
                    isOnboarded ? '/' : '/onboarding'} />} />

                <Route path='signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={
                    isOnboarded ? '/' : '/onboarding'}
                />} />
                <Route path='notification' element={isAuthenticated ? <NotificationPage /> : <Navigate to='/login' />} />
                <Route path='onboarding' element={isAuthenticated ? (
                    !isOnboarded ? (
                        <OnboardingPage />
                    ) : (
                        <Navigate to='/' />
                    )
                ) : (<Navigate to='/login' />)} />
                <Route path='chat' element={isAuthenticated ? <ChatPage /> : <Navigate to='/login' />} />
                <Route path='call' element={isAuthenticated ? <CallPage /> : <Navigate to='/login' />} />
            </Routes>
        </>
    )
}

export default Mainroute