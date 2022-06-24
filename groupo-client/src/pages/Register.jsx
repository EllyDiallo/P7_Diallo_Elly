import React from 'react'

function Register() {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Groupomania</h3>
          <span className="login-desc">
            Connect with friends and the world around you on Lamasocial.
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
    </div>
  )
}

export default Register