import AuthContext from '../contexts/AuthContext'
import { useContext } from 'react'
import LogInPage from './LogInPage'

export default function HomePage(){

    let {isAuthenticated} = useContext(AuthContext);
    const showSomething = async () => {
        console.log(isAuthenticated)
    }
    showSomething()
    
    
    
    return (
        <div>
        { !isAuthenticated ? (<LogInPage/>) : <h1>You're home!</h1>
        }
        </div>
    ) 
}
