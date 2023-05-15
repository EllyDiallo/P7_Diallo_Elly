import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from 'react';
import DataContext from '../context/DataContext';

function Nav() {
    const { search, setSearch } = useContext(DataContext);
    return (
        <nav className="navbar navbar-expand-lg bg-dark text-light ">
            <div className="container-fluid">

                <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor='search'></label>
                    <input className='search'
                        id='search'
                        type="text"
                        placeholder='Chercher une publication'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/post'>Post</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav