import React, { createContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

    const BASE_URL = 'http://localhost:8000'
    let navigate = useNavigate()
    const [user, setUser] = useState('')
    const [authTokens, setAuthTokens] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)    


    const loginUser = async (username, password) => {
        try {
            console.log('Form submitted.')
        const response = await axios.post(`${BASE_URL}/api/token/`, {username, password}, {
            headers:{
                'Content-Type': 'application/json'
            },
        })
        console.log(response.data)
        setAuthTokens(response.data.access)
        setIsAuthenticated(true)
        setUser(username)
        navigate('/')
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
        }
    }

    const logout = () => {
        setUser(null)
        setAuthTokens(null)
        setIsAuthenticated(false)
        console.log('Logged out')
        navigate('/login')        
    }
    const contextData = {user, authTokens, isAuthenticated, loginUser, logout}

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}