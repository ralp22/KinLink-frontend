import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import axios from "axios";
import { AuthProvider } from "./contexts/AuthContext";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import logo from "./assets/kinlinklogo.png";
import UpdateProfile from "./pages/UpdateProfile";
import Profile from "./pages/Profile";
import ViewProfile from "./pages/ViewProfile";
import NewPost from "./pages/NewPost";
import NewLink from "./pages/NewLink";

function App() {
  const BASE_URL = "http://localhost:8000";
  const [users, setUsers] = useState("");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${BASE_URL}/users/`);
      console.log(res);
      setUsers(res.data);
      console.log(users);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getProfiles = async () => {
      const res = await axios.get(`${BASE_URL}/userprofiles/`);
      console.log(res);
      setProfiles(res.data);
      console.log(profiles);
    };
    getProfiles();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(`${BASE_URL}/posts/`);
      console.log(res);
      setPosts(Array.from(res.data));
      console.log(posts);
    };
    getPosts();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`${BASE_URL}/comments/`);
      console.log(res);
      setComments(res.data);
      console.log(comments);
    };
    getComments();
  }, []);

  useEffect(() => {
    const getRelationships = async () => {
      const res = await axios.get(`${BASE_URL}/relationships/`);
      console.log(res);
      setRelationships(res.data);
      console.log(relationships);
    };
    getRelationships();
  }, []);

  useEffect(() => {
    const getHighlights = async () => {
      const res = await axios.get(`${BASE_URL}/highlightreel/`);
      console.log(res);
      setHighlights(res.data);
      console.log(highlights);
    };
    getHighlights();
  }, []);

  return (
    <AuthProvider>
      <div className="App z-2 overflow-y-scroll scroll-smooth bg-gray-100 h-screen dark:bg-purple-900 dark:text-gray-50">
        <img className="top-0 h-80 self-center ml-8" src={logo} alt="logo" />
        <Nav />
        <Routes>
          <React.Fragment>
            <Route
              path="/"
              element={
                <HomePage
                  profiles={profiles}
                  posts={posts}
                  comments={comments}
                />
              }
            />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/newlink" element={<NewLink/>}/>
            <Route
              path="/profile/:id"
              element={
                <ViewProfile
                  highlights={highlights}
                  users={users}
                  profiles={profiles}
                  posts={posts}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  highlights={highlights}
                  profiles={profiles}
                  relationships={relationships}
                  posts={posts}
                  comments={comments}
                />
              }
            />
            <Route 
              path="/newpost"
              element={<NewPost/>}/>
          </React.Fragment>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
