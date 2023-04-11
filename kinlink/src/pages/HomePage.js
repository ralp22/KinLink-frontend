import AuthContext from '../contexts/AuthContext'
import { useContext } from 'react'
import LogInPage from './LogInPage'

export default function HomePage(){

    let {contextData} = useContext(AuthContext);
    // if (isAuthenticated === false) {
    //     console.log('Moving..')
    //     navigate('/login')
    // }
    console.log(contextData)
    console.log(useContext(AuthContext))
    // useEffect(()=> {
    //     navigate('/login')
    // },[isAuthenticated])
    
    return (
        <div>
        { !contextData ? (<LogInPage/>) : <h1>You're home!</h1>
        }
        </div>
    ) 
}
