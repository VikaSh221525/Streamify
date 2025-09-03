import { LoaderIcon } from 'lucide-react'
import React from 'react'

const ChatLoader = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center p-4'>
            <LoaderIcon className='size-10 animate-spin text-primary'/>
            <p className='mt-4 text-center text-lg font-mono'>
                Connecting to chat...
            </p>
        </div>
    )
}

export default ChatLoader