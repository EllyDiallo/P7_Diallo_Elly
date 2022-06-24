import React from 'react'
import Post from './Post'

function Feed({posts}) {
  return (
    <section className='feed  ' >
        {posts.map( (posts) => (
            <Post key={posts.id} post={posts}/>
        ))}
    </section>
  )
}

export default Feed