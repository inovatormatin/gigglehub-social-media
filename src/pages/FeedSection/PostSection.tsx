import React from 'react'
import { PostForm, ScrollingFeed } from '../../components';

const PostSection: React.FC = () => {
  return (
    <div>
      {/* Scroll Post list*/}
      <ScrollingFeed />
      {/* Modal to add post */}
      <PostForm />
    </div>
  )
}

export default PostSection;

