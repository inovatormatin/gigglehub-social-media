import React from 'react'
import PostSection from './PostSection'
import Profile from './Profile'
import Suggestion from './Suggestion'

const Feed: React.FC = () => {
  return (
    <div className='sticky top-0 max-w-6xl m-auto h-screen flex flex-row over overflow-hidden'>
      {/* Profile Section */}
      <div className='flex-1 z-1 basis-1/4 m-2 h-full overflow-y-auto scrollbar-none'><Profile /></div>
      {/* Feed Section */}
      <div className='flex-2 z-1 basis-2/3 my-2 h-full overflow-y-auto scrollbar-none'><PostSection /></div>
      {/* Suggestion Section */}
      <div className='flex-1 z-1 basis-1/3 m-2 h-full overflow-y-auto scrollbar-none'><Suggestion /></div>
    </div>
  )
}

export default Feed