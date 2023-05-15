import React from 'react';
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/


/*const REGISTER_URL = '/register';*/


const Register = () => {
  const userRef = useRef();
  const errRef = useRef();


  const admiSecretCode = 'power';

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [isAdmin, setIsAdmin] = useState(0);
  const [codeAdmi, setCodeAdmi] = useState(false);
  const [secretword, setsecretword] = useState('');
  const [errMsgAdmi, setErrMsgadmi] = useState('');


  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    console.log("isAdmin : " + isAdmin);
    setCodeAdmi(!codeAdmi);
    console.log("input disponible ?  " + codeAdmi);
  }, [isAdmin]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const resultRegexEmail = EMAIL_REGEX.test(email);
    console.log(email);
    setValidEmail(resultRegexEmail);
  }, [email]);

  useEffect((e, codeAdmi) => {

    console.log("secretCode: " + secretword + "  input ouvert ? " + codeAdmi);

  }, [secretword])

  const handleCode = async (e) => {
    e.preventDefault();


    if (secretword === admiSecretCode) {
      console.log(secretword + " et " + admiSecretCode)
      console.log(codeAdmi + " vérif id")
      setCodeAdmi(true);
      console.log(codeAdmi + " vérif id apres")


    }
    setErrMsgadmi('veuillez entrer votre code');
    console.log(codeAdmi);

  }

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    console.log(v1 + v2 + v3);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Entrée invalide");
      return;
    }
    console.log(user, pwd, email);
    setSuccess(true);
  }



  return (
    <>
      {success ? (
        <section>
          <h1>Success.!</h1>
          <p><Link to="/signUp">Connexion</Link></p>
        </section>

      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p >
          <h1>Création de votre espace Groupomania</h1>
          <form className='formRegister' onSubmit={handleSubmit}>

            <label htmlFor="username">
              Nom d'utilisateur:
              <span className={validName ? "valid" : "hide"}>
                <CheckOutlinedIcon />
              </span>
            </label>
            <input type="text"
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)} />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              < InfoOutlinedIcon />
              4 à 24 caractères.<br />
              Doit commencer par une lettre.<br />
              Lettre, nombre, underscores, hyphens autortisés.
            </p>

            <label htmlFor="email">
              Adresse mail:
              <span className={validEmail ? "valid" : "hide"}>
                <CheckOutlinedIcon />
              </span>
            </label>
            <input type="text"
              id='email'
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)} />
            <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
              < InfoOutlinedIcon />
              Doit contenir un mot suivis de "@" suivis de .com ou point.fr.<br />
            </p>

            <label htmlFor="password">
              mot de passe:
              <span className={validPwd ? "valid" : "hide"}>
                <CheckOutlinedIcon />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <CancelOutlinedIcon />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              < InfoOutlinedIcon />
              Doit inclure des lettres majuscules et minuscules, un chiffre et un caractère spécial.<br />
              Caractères spéciaux autorisés: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              confirmation du mot de passe:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <CheckOutlinedIcon />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <CancelOutlinedIcon />
              </span>

            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <CheckOutlinedIcon />
              Doit correspondre au premier champ de saisie du mot de passe.
            </p>

            <label htmlFor='admin'>
              Autorisations ?
            </label>
            <select onChange={(e) => setIsAdmin(e.target.value)} name="admin" id="admin">
              <option value={0}>Employé(e)</option>
              <option value={1}>Administrateur</option>
            </select>
            <>
              {(isAdmin.valueOf === 1) ? (
                <>
                  <label htmlFor='codeAdmi'></label>
                  <input onChange={(e) => setsecretword(e.target.value)} type='password' placeholder='entrez le code' id='codeAdmi' />
                  <button onClick={(e) => handleCode(e)} id='codeAdmi'>valider</button>
                </>

              ) : (
                <p></p>
              )}
            </>


            <button disabled={!validName || !validPwd || !validMatch ? true : false}>
              Enregistez vous !
            </button>
            <p>
              Vous avez déjà un compte ?<br />
              <span className="line">
                {/*put router link here*/}
                <Link to={'/signUp'}>Connectez vous.</Link>
              </span>
            </p>

          </form>
        </section >
      )}

    </>
    /*<div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Groupomania</h3>
          <span className="login-desc">
            Connect with coworkers  around you on Groupomania social club.
          </span>
        </div>
        <div className="login-right">
          <div className="login-box">
            <input placeholder="Email" className="login-input" />
            <input placeholder="Password" className="login-input" />
            <input placeholder="user Name" className="login-input" />
            <button className="login-button">Log In</button>
            <button className="login-registerButton">
              Log into your app
            </button>
          </div>
        </div>
      </div>
    </div>*/
  )
}

export default Register