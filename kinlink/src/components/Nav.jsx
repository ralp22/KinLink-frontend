import { Link } from 'react-router-dom'
import React, {useContext} from 'react'
import AuthContext from '../contexts/AuthContext'

export default function Nav(){
    let {user} = useContext(AuthContext)
    let {logout} = useContext(AuthContext)
    return (
        <div>
        <div className="nav-bar">
        <span>
            {!(user)? <Link to="/login"><button className="nav-btn">Home</button> </Link> : <Link to="/"><button className="nav-btn">Home</button></Link>}
        </span>

        { !(user)?
            <Link to="/login"><button className="nav-btn">Login</button></Link>: null
        }

        { !(user)?
            <Link to="/register"><button className="nav-btn">One of Us?</button></Link>: null
        }
        {user?<button className="nav-btn" onClick={logout}>Log out</button>:null}
        </div>
        {user?<span className="name-tag">{user}</span>: null}
        </div>
    )
}