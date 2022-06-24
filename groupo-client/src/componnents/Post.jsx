import React from 'react' 
import {Link} from 'react-router-dom';


function Post({post}) {
  const date = {
   day: `${new Date(post.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', year: "numeric", month: "long", day: "numeric"})}`,
   time: `${new Date(post.createdAt).toLocaleDateString('fr-FR', { hour: "2-digit", minute: "2-digit"})}`,
   
  }
  return (
    <div className="card post"  style={{width:"18rem", margin: "0.4rem"}}>
        <img src={`../${post.attachment}`}  className="card-img-top" alt="..."></img>
        <div className="card-body">
            <Link to={`/post/${post.id}`}>
                <h2 className='card-title'>{post.title}</h2>
            </Link>
            <p className='postDate'>{ "Posté le " + date.day }<br/>{ "à " + date.time.slice(12,-3) + "h" + date.time.slice(15)}</p>
            <p className="card-text">
                 {(post.content).length <= 25 ? post.content 
                                              : `${(post.content).slice(0,25)}...`}
            </p>
            
        </div>
    </div>
    
    
  )
}

export default Post