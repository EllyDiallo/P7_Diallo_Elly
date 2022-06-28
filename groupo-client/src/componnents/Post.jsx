import React from 'react' 
import {Link} from 'react-router-dom';



function Post({post}) {
  const date = {
   day: `${new Date(post.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', year: "numeric", month: "long", day: "numeric"})}`,
   time: `${new Date(post.createdAt).toLocaleDateString('fr-FR', { hour: "2-digit", minute: "2-digit"})}`,
   
  }
 
  return (
    <Link  to={`/post/${post.uuid}`}>
      <div className="card post"  style={{width:"25rem", margin: "1rem"}}>
          <img src={`../../../server/${post.attachment}`}  className="card-img-top" alt="..."></img>
          <div className="card-body">
              
                  <h2 className='card-title'>{post.title.toUpperCase()}</h2>
              
              <p className='postDate' style={{color:'blue'}}>{ "Posté le " + date.day }<br/>{ "à " + date.time.slice(12,-3) + "h" + date.time.slice(15)}</p>
              <p className="card-text" style={{color:'black'}}>
                  {(post.content).length <= 25 ? post.content 
                                                : `${(post.content).slice(0,25)}...`}
              </p>
              
          </div>
      </div>
    </Link>
    
    
  )
}

export default Post