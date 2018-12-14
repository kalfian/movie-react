import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return(
        <div className="rmdb-header">
            <div className="rmdb-header-content">
            <Link to="/">
                <img src="./images/reactMovie_logo.png" alt="" className="rmdb-logo"/>
            </Link>
            <Link to="/">
                <img src="./images/tmdb_logo.png" alt="" className="rmdb-tmdb-logo"/>
            </Link>
            </div>
        </div>
    )
}

export default Header