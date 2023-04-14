import AuthContext from '../contexts/AuthContext'
import { React, useContext } from 'react'
import LogInPage from './LogInPage';

export default function HomePage(){


    let {user} = useContext(AuthContext);    

    console.log(user)
    
    return (
        <div className="justify-center dark:bg-primary dark:text-white">
        { !user ? <LogInPage/> : <h1 className=" text-center ">Welcome back, {user}!</h1>
        }
        </div>
    ) 
}
