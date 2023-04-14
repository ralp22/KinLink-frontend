import './App.css';
import React, { useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import axios from 'axios'
import { AuthProvider } from './contexts/AuthContext'
import Nav from './components/Nav'
import Register from './pages/Register';
import logo from './assets/kinlinklogo.png'

function App() {

  const BASE_URL = 'http://localhost:8000'
  const [users, setUsers] = useState('')
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [profile, setProfile] = useState([])
  const [relationships, setRelationships] = useState([])
  const [highlights, setHighlights] = useState([])

  useEffect(()=>{
      const getUsers = async () => {
          const res = await axios.get(`${BASE_URL}/users/`)
          console.log(res)
          setUsers(res.data)
          console.log(users)
      }
      getUsers()
  },[])
  

  useEffect(()=>{
      const getProfile = async () => {
          const res = await axios.get(`${BASE_URL}/userprofiles/`)
          console.log(res)
          setProfile(res.data)
          console.log(profile)
      }
      getProfile()
  },[])
  

  useEffect(()=>{
      const getPosts = async () => {
          const res = await axios.get(`${BASE_URL}/posts/`)
          console.log(res)
          setPosts(Array.from(res.data))
          console.log(posts)
      }
      getPosts()
  },[])
  

  useEffect(()=>{
      const getComments = async () => {
          const res = await axios.get(`${BASE_URL}/comments/`)
          console.log(res)
          setComments(res.data)
          console.log(comments)
      }
      getComments()
  },[])

  useEffect(()=>{
      const getRelationships = async () => {
          const res = await axios.get(`${BASE_URL}/relationships/`)
          console.log(res)
          setRelationships(res.data)
          console.log(relationships)
      }
      getRelationships()
  },[])
  

  useEffect(()=>{
      const getHighlights = async () => {
          const res = await axios.get(`${BASE_URL}/highlightreel/`)
          console.log(res)
          setHighlights(res.data)
          console.log(highlights)
      }
      getHighlights()
  },[])

  return (
    
      <AuthProvider>
        <div className="App dark:bg-primary dark:text-gray-50">
      <img className="max-h-screen-sm max-w-screen-sm self-center ml-16" src={logo}/>
        <Nav/>
        <Routes>
          <React.Fragment>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LogInPage/>}/>
            <Route path="/register" element={<Register/>}/>
          </React.Fragment>
        </Routes>
        </div>
      </AuthProvider>
    
  );
}

export default App;
