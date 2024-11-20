import React, { useState } from 'react'
import { PostForm, TailButton, ScrollingFeed } from '../../components';
import logo from '../../assets/images/logo.png'
import { ArrowSquareIn } from '@phosphor-icons/react';
const PostSection: React.FC = () => {
  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowAddPostModal(false)
  }; // handle on click close modal

  const handleOpenModal = () => {
    setShowAddPostModal(true)
  } // handle on click open modal

  return (
    <div>
      {/* Header */}
      <header className='shadow p-2 mb-2 relative bg-gray-100 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-between'>
        {/* logo */}
        <section className='flex items-center'>
          <img
            className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-2'
            src={logo}
            loading='lazy'
            alt='GiggleHub'
          />
          <h1 className='text-lg font-semibold'>GiggleHub</h1>
        </section>
        {/* Add button */}
        <TailButton
          label='Post'
          icon={<ArrowSquareIn />}
          size='xs'
          color='blue'
          onClick={handleOpenModal}
        />
      </header>
      {/* Scroll Post list*/}
      <ScrollingFeed />
      {/* Modal to add post */}
      <PostForm
        handleCloseModal={handleCloseModal}
        showAddPostModal={showAddPostModal}
      />
    </div>
  )
}

export default PostSection;

