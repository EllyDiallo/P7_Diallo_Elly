import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import api from '../Api/getAxios';
import AuthContext from '../context/authContext';



function PostPage() {

  const { posts, setPosts } = useContext(DataContext);
  const { auth } = useContext(AuthContext);

  const { uuid } = useParams();
  const post = posts.find(post => (post.uuid).toString() === uuid)
  const date = {
    day: `${new Date(post.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', year: "numeric", month: "long", day: "numeric" })}`,
    time: `${new Date(post.createdAt).toLocaleDateString('fr-FR', { hour: "2-digit", minute: "2-digit" })}`,

  }
  const sourceImage = post.attachment.split('public')
  const navigate = useNavigate();
  const handlePostDelete = async (uuid) => {

    switch (auth.userUuid) {
      case uuid:
        try {
          await api.delete(`message/delete/${uuid}`)
        }
        catch (err) {
          console.log(err)
        }
        break;
      default: break;
    }
    const postsList = posts.filter(post => post.uuid !== uuid);
    setPosts(postsList);

    navigate("/");

  }



  return (
    <main className='edit d-flex  justify-content-center align-items-center h-50 d-flex p-6 w-50'>
      <article className='post'>
        {post &&
          <>
            <h2 className='text-center'>{post.title.toUpperCase()}</h2>
            <img src={`${sourceImage[1]}`} className="card-img-top" alt={` ${post.title}`}></img>
            <p className="postDate">{"Posté le " + date.day}<br />{"à " + date.time.slice(12, -3) + "h" + date.time.slice(15)}</p>
            <p className="postContent">{post.content}</p>
            <button className=' btn btn-dark btn-outline-danger' onClick={() => handlePostDelete(post.uuid)}>
              Delete Post
            </button>
            <Link to={`/edit/${post.uuid}`}><button className="btn btn-outline-danger btn-warning">Edit Post</button></Link>
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