import Home from "./pages/Home";
import About from "./pages/About"; 
import Missing from "./pages/Missing";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";

import Footer from "./componnents/Footer";
import Header from "./componnents/Header";
import Nav from "./componnents/Nav";

import api from './Api/getAxios';

import { useState, useEffect } from "react";

import {
 Routes, Route, useNavigate} from "react-router-dom";



import './styles/main.css';


function App() {

  const [posts, setPosts] = useState([{
    "id": Number,
    "uuid": "",
    "userId": Number,
    "title": "",
    "content": "",
    "attachment": "",
    "likes": Number,
    "createdAt": "",
    "updatedAt": "",
    "user": {
      "username": "",
      "picture": "",
      "uuid": ""
    }}])
  const [search, setSearch ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate();

  
  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    
    navigate("/");
  }
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get('/messages');
        
        setPosts(response.data)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`)
        }
        
      }
    }
      fetchPost();
  },[])

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.content).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    
    const newPost = { id, title: postTitle, content: postContent };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostContent('');
    navigate('/');
    console.log(postTitle + ' ' + postContent)
  }


  return (
    <>
    

    
      <Header title={"Groupomania"}/>
      <Nav search={search} setSearch={setSearch}/>
      
      <div className="containerMain">
          <Routes>
                    <Route exact path="/" element={<Home posts={searchResults}/>}/>
                    <Route path='/post' element={<NewPost 
                                                    handleSubmit={handleSubmit}
                                                    postTitle={ postTitle} setPostTitle={ setPostTitle}
                                                    postContent={ postContent} setPostContent={ setPostContent}
                                                  />}
                  />
                    
                    <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
                      
                    
                    <Route path='/about' element={<About/>}/>
                    <Route path='*' element={<Missing/>}/>

                    
          </Routes>
      </div>  
      <Footer/>
  </>  
  );
}

export default App;
