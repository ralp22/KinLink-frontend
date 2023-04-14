import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

    const BASE_URL = 'http://localhost:8000'
    let navigate = useNavigate()
    const [user, setUser] = useState('')
    const [authTokens, setAuthTokens] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)    
    const [profile, setProfile] = useState('')
    const [kin, setKin] = useState('')

    const loginUser = async (username, password) => {
        try {
            console.log('Form submitted.')
        const response = await axios.post(`${BASE_URL}/api/token/`, {username, password}, {
            headers:{
                'Content-Type': 'application/json'
            },
        })
        console.log(response)
        setAuthTokens(response.data.access)
        setIsAuthenticated(true)
        setUser(jwt_decode(response.data.access))
        navigate('/')
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
        }
    }
    useEffect(()=>{
        const getProfile = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/userprofiles/${user.user_id}`)
                setProfile(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProfile()
    },[user])

    useEffect(()=>{
        const getKin = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/relationships/to_user=${user.user_id}`)
                console.log(res)
                setKin(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getKin()
    },[user])

    const logout = () => {
        setUser(null)
        setAuthTokens(null)
        setIsAuthenticated(false)
        console.log('Logged out')
        navigate('/login')        
    }

    const ToLogin = () => {
        navigate('/login')
    }

    const ToRegister = () => {
        navigate('/register')
    }

    const ToHome = () => {
        navigate('/')
    }

    const contextData = {
        user:user, 
        profile:profile, 
        kin:kin, 
        authTokens:authTokens, 
        isAuthenticated:isAuthenticated, 
        loginUser:loginUser, 
        logout:logout,
        ToLogin:ToLogin,
        ToHome:ToHome,
        ToRegister:ToRegister
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}