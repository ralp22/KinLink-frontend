import AuthContext from '../contexts/AuthContext'
import { useContext } from 'react'
import LogInPage from './LogInPage'

export default function HomePage(){

    let {isAuthenticated} = useContext(AuthContext);
  
    console.log(isAuthenticated)
    console.log(useContext(AuthContext))
    
    
    return (
        <div>
        { !isAuthenticated ? (<LogInPage/>) : <h1>You're home!</h1>
        }
        </div>
    ) 
}
