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
    const [posts, setPosts] = useState('')

    const loginUser = async (username, password) => {
        try {
        console.log('Form submitted.')
        setIsAuthenticated(false)
        setTimeout(async()=>{
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
        }, 1000);
        } catch (error) {
            console.error(error)
            setIsAuthenticated(false)
        }
    }
    useEffect(()=>{
        if(isAuthenticated){
        const getProfile = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/userprofiles/${user.user_id}`)
                setProfile(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getProfile()
    }
    },[user])

    useEffect(()=>{
        if(isAuthenticated){
        const getPosts = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/posts/${user.user_id}`)
                console.log(res)
                setPosts(res.data)
                console.log(posts)
            } catch (error) {
                console.error(error)
            }
        }
        getPosts()
    }
    },[user])
    
    useEffect(()=>{
        if (isAuthenticated){
        const getKin = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/relationships/to_user=${user.user_id}`)
                console.log(res)
                setKin(Array.from(res.data))
            } catch (error) {
                console.error(error)
            }
        }
        getKin()
        }
    },[user])

    const logout = () => {
        setUser(null)
        setAuthTokens(null)
        setIsAuthenticated(false)
        setProfile(null)
        console.log('Logged out')
        navigate('/login')
        window.location.reload()

    }

    const ToLogin = () => {
        navigate('/login')
    }

    const ToRegister = () => {
        navigate('/register')
    }

    const ToProfile = () => {
        navigate('/profile')
    }

    const ToHome = () => {
        navigate('/')
    }

    const ToUpdatePage = () => {
        navigate('/updateprofile')
    }
    

    const contextData = {
        user:user, 
        posts:posts,
        profile:profile, 
        kin:kin, 
        authTokens:authTokens, 
        isAuthenticated:isAuthenticated, 
        loginUser:loginUser, 
        logout:logout,
        ToLogin:ToLogin,
        ToHome:ToHome,
        ToRegister:ToRegister,
        ToUpdatePage:ToUpdatePage,
        ToProfile:ToProfile
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}