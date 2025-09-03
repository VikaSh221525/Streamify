import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuthUser from '../hooks/useAuthUser';
import useStreamToken from '../hooks/useStreamToken';
import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCallStateHooks, SpeakerLayout, StreamTheme, CallControls, name } from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css';
import toast from 'react-hot-toast';
import PageLoader from '../components/PageLoader';

const API_KEY = import.meta.env.VITE_STREAM_API_KEY

const CallPage = () => {
    
}

export default CallPage