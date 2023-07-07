import React from 'react';
import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../context/authContext';
import Post from '../componnents/Post';
const PROFILE_URL = "/user";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  const { userUuid, bio, userName, picture, token, isadmin, posts } = auth








  return (
    <><section className='profile-container'>
      <h1> {userName}<br /></h1>

      <span>Ma présentation</span><br />
      <img src={` ${picture}`} className="card-img-top" alt="profil" />
      <section className='feed d-flex w-50 min-vh-100 flex-column justify-content-center align-items-center ' >
        {posts.map((post) => (
          <Post key={post.uuid} post={post} />
        ))}
      </section>


    </section>
      <section className='feed-container'>

      </section>
    </>
  )
}

export default Profile