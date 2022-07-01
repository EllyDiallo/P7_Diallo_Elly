import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
   const today = new Date();
    return (
        <footer className='footer-container bg-dark text-light text-center align-self-end mt-auto '>
            <p>Copyright &copy; {today.getFullYear()}</p>
            <p><Link to="groupomania@gmail.com"> contactez-moi</Link></p>
        </footer>
    )
}

export default Footer