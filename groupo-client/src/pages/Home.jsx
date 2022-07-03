import React from 'react'
import Feed from '../componnents/Feed'
import { useContext } from 'react'; 
import DataContext from '../context/DataContext'; 


function Home() {
  const { searchResults, isLoading, fetchError} = useContext(DataContext);
  return (
      <main className='container-fluid min-vh-100  w-50 d-flex  flex-row justify-content-center align-items-center ' style={{height: "100%"}} >

            {isLoading && <>
            <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            </>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
        </main>
      
        
        
        
        
        
      
    
  )
}

export default Home