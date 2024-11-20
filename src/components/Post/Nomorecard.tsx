import React from 'react'
import { CalendarCheck } from '@phosphor-icons/react'

// This component will come up at the end or when user dont have any post to see
const Nomorecard: React.FC = () => {
    return (
        <div className='mb-4 min-h-48 relative flex flex-col items-center justify-center text-slate-600 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden'>
            <div className='my-3'>
                <CalendarCheck size={32} />
            </div>
            <h1 className='text-xl font-bold'>You’re all caught up!</h1>
            <h1 className='text-lg font-medium'>You’ve seen all posts from the last 10 days.</h1>
            <h1 className='text-sm font-medium mt-2'>Tips: Follow more people to get new post.</h1>
        </div>
    )
}

export default Nomorecard