import React from 'react'

/*import HomeIcon from '@mui/icons-material/Home';*/
import Feed from '../componnents/Feed'


function Home({posts}) {
  return (
      <main className='home container-fluid justify-content-center'>

         {posts.length ? (
          <Feed posts={posts}/>
         ):(
          <p style={{marginTop:"2rem"}}>
            No Posts to display </p>
         )}
       

      </main>
        
        
        
        
        
      
    
  )
}

export default Home