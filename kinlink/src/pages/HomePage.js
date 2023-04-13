import AuthContext from '../contexts/AuthContext'
import { React, useContext } from 'react'

export default function HomePage(){


    let {isAuthenticated, user} = useContext(AuthContext);    
    
    return (
        <div>
        { isAuthenticated === false? null : <h1>Welcome back, {user}!</h1>
        }
        </div>
    ) 
}
