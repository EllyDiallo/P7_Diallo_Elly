import React from 'react'


function NewPost({
  handleSubmit, postTitle, setPostTitle, postContent, setPostContent, setPostAttachment
}) {
  return (
   <main className="container   h-100 m-6  ">
            <h2>New Post</h2>
            <form className= " m-auto bd-highlight  row justify-content-center my-3 " onSubmit={handleSubmit} encType="multipart/form-data">

              <div className="col-5">
                <label className='form-label' htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="form-control"
                />
              </div>
              <div className="col-6">
                <label className='form-label' htmlFor="attachment">Image:</label>
                <input
                    id="attachment"
                    type="file"
                    name='attachment'
                    className="form-control"
                    
                    onChange={(e) => setPostAttachment(e.target.files[0])}
                    
                    
                />
              </div>
              <div className="col-9">

                <label  className='form-label' htmlFor="postContent">Post:</label>
                <textarea
                    id="postContent"
                    required
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="form-control"
                />
              </div>
                
                <button className='btn btn-primary mt-5' type="submit">Submit</button>
            </form>
        </main>
  )
}

export default NewPost