import React, { createContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    let navigate = useNavigate()
    const [user, setUser] = useState('')
    const [authTokens, setAuthTokens] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const loginUser = async (username, password) => {
        try {
            console.log('Form submitted.')
        const response = await axios.post('http://localhost:8000/api/token/', {username, password}, {
            headers:{
                'Content-Type': 'application/json'
            },
        })
        console.log(response.data)
        setUser(username)
        setAuthTokens(response.data.access)
        setIsAuthenticated(true)
        
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
        }
        console.log({user}, {authTokens}, {isAuthenticated})
    }

    const logout = () => {
        setUser(null)
        setAuthTokens(null)
        setIsAuthenticated(false)
        console.log('Logged out')
        navigate('/login')
        return (<div>See ya!</div>)
        
    }

    const contextData = {user, authTokens, isAuthenticated, loginUser, logout}

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}