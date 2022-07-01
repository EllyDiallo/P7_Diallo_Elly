import React from 'react'
import {useParams, Link} from 'react-router-dom';



function PostPage({posts, handleDelete}){
  const {uuid} = useParams();
  const post = posts.find(post => (post.uuid).toString() === uuid)
  const date = {
   day: `${new Date(post.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', year: "numeric", month: "long", day: "numeric"})}`,
   time: `${new Date(post.createdAt).toLocaleDateString('fr-FR', { hour: "2-digit", minute: "2-digit"})}`,
   
  }
  
  return (
    <main className='PostPage d-flex justify-content-between'>
      <article className='post'>
        {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{ "Posté le " + date.day }<br/>{ "à " + date.time.slice(12,-3) + "h" + date.time.slice(15)}</p>
                        <p className="postBody">{post.content}</p>
                        <button onClick={() => handleDelete(post.uuid)}>
                            Delete Post
                        </button>
                         <Link to={`/edit/${post.uuid}`}><button className="btn-dark btn-outline-danger">Edit Post</button></Link>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
      </article>

    </main>
  )
}

export default PostPage