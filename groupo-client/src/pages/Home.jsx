import React from 'react'

/*import HomeIcon from '@mui/icons-material/Home';*/
import Feed from '../componnents/Feed'


function Home({posts, isLoading, fetchError}) {
  return (
      <main className='container-fluid min-vh-100 d-flex  flex-row justify-content-center align-items-center ' style={{height: "100%"}} >

            {isLoading && <>
            <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            </>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className="statusMsg">No posts to display.</p>)}
        </main>
      
        
        
        
        
        
      
    
  )
}

export default Home