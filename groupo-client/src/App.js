import Home from "./pages/Home";
import About from "./pages/About"; 
import Missing from "./pages/Missing";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import Register from "./pages/Register";

import EditPost from "./componnents/editPost";
import Footer from "./componnents/Footer";
import Header from "./componnents/Header";
import Nav from "./componnents/Nav";

import  { DataProvider } from "./context/DataContext";
import { Routes, Route } from "react-router-dom"; 

import './styles/main.css';


function App() {

  return (
    <>
      <Header title={"Groupomania"}/>
      <DataProvider>    
        <Nav/>     
        <div className="containerMain d-flex  min-vh-100 w-100 h-100 flex-column justify-content-center align-items-center">
            <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route path='/post' element={<NewPost/>}/>
                    <Route path="/edit/:uuid" element={<EditPost/>}/>
                    <Route path='/post/:uuid' element={<PostPage/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='*' element={<Missing/>}/>                      
            </Routes>
        </div>  
      </DataProvider>
      <Footer/>
  </>  
  );
}

export default App;