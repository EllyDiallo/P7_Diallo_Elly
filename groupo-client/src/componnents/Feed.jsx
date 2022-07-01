import React from 'react'
import Post from './Post'

function Feed({posts}) {
  return (
    <section className='feed d-flex w-50 min-vh-100 flex-column justify-content-center align-items-center ' >
        {posts.map( (post) => (
            <Post key={post.uuid} post={post}/>
        ))}
    </section>
  )
}

export default Feed