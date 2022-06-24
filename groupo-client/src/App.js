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

  const [posts, setPosts] = useState([])
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = { title: postTitle,  content: postContent };
      console.log({"NewPost: ": newPost})
      const response = await api.post('/message/new/e45d08fb-3d00-4972-bc3f-ecc391530fa3',newPost)      
    
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
