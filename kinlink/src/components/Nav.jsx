import { Link } from 'react-router-dom'
import React, {useContext} from 'react'
import AuthContext from '../contexts/AuthContext'

export default function Nav(){
    let {user} = useContext(AuthContext)
    let {logout} = useContext(AuthContext)
    return (
        <div className="nav-bar">
        <Link to="/"> <h1>Home</h1> </Link>
        <section className="buttons">
        <Link to="/login">Log in</Link>
        <div>|</div>
        <Link to="/register">One of us?</Link>
        </section>
       
        {user?<div>Hello {user}</div>:null}
        {user?<button onClick={logout}>Log out</button>:null}
        </div>
        
    )
}