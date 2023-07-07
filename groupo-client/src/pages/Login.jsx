import React from 'react';
import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../Api/getAxios';
import AuthContext from '../context/authContext';
const LOGIN_URL = "/users/login";



const Login = () => {

  const { auth, setAuth } = useContext(AuthContext);

  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
    console.log(auth);

  }, []);

  useEffect(() => {
    console.log(success)
  }, [success]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);




  const handlesubmit = async (e, success) => {
    e.preventDefault();
    try {
      const response = await api.post(LOGIN_URL,
        JSON.stringify({ email, password: pwd }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",

        }
      })
      console.log(response.data);

      const { userUuid, userName, token, isAdmin, bio, picture, posts } = response.data;




      const authObject = { userUuid, token, isAdmin, userName, bio, picture, posts };

      console.log(authObject);

      setAuth(authObject);

      console.log(auth);

      setSuccess(true);
      setTimeout(() => navigate('/'), 2500);




    } catch (err) {
      if (!err.response) {
        setErrMsg('acune reponse du server');
      } else if (err.response?.status === 400) {
        setErrMsg('Identifiants ou Mot de passe manquant')
      } else if (err.response?.status === 401) {
        setErrMsg('accès refusé')
      } else {
        setErrMsg('La connexion a échoué')
      }
      errRef.current.focus();
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      setTimeout(() => navigate('/register'), 2500);
    }

  }

  return (
    <>
      {success ? (
        <section>
          <h1>Vous êtes connecté</h1>
          <br />
          <span className='line'>
            <p><Link to="/">Acceuil</Link></p>
          </span>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
          <h1>Connection</h1>
          <form className='formRegister' onSubmit={handlesubmit}>
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required />

            <label htmlFor="pwd">Mot de passe</label>
            <input
              type="password"
              id="pwd"
              autoComplete='off'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required />
            <button type='submit'>Se connecter</button>
          </form>
          <p> Pas encore de compte ? <br /></p>
          <span className='line'>
            {<p><Link to="/register">Créer vous un compte</Link></p>}
          </span>


        </section>)}
    </>
  )



}

export default Login