import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
        <div className="nav-wrapper #424242 grey darken-3" style={{padding: '0 2rem'}}>
          <span className="brand-logo">LinkCutter</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Create</NavLink></li>
            <li><NavLink to="/links">Links List</NavLink></li>
            <li><a href="/" onClick={logoutHandler} >Logout</a></li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar
