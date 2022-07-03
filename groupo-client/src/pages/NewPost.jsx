import React from 'react';
import { useContext, useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import DataContext from '../context/DataContext'; 
import api from '../Api/getAxios';

function NewPost() {
    const { posts, setPosts} = useContext(DataContext);
    
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postAttachment, setPostAttachment] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e,uuid) => {
    e.preventDefault();
    try {
      const newPost = new FormData()

      newPost.append("title", postTitle)
      newPost.append("content", postContent)
      newPost.append("attachment", postAttachment)
      console.log({"NewPost: ": newPost})

      const response = await api.post('/message/new/e45d08fb-3d00-4972-bc3f-ecc391530fa3',newPost,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }})      
    const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostContent('');
      navigate('/');
      console.log(response)
    } catch (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
    }
  }

  
  return (
   <main className="container h-100 m-6  ">
            <h2>New Post</h2>
            <form className= " formNewPost m-auto bd-highlight  row justify-content-center my-3  p-3" onSubmit={handleSubmit} encType="multipart/form-data">

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
                
                <button className='btn btn-danger mt-5' type="submit">Submit</button>
            </form>
        </main>
  )
}

export default NewPost