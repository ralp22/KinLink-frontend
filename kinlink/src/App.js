import './App.css';
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import PrivateRoute from './utils/PrivateRoute'
import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Nav from './components/Nav'
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <h1>KinLink</h1>
      <AuthProvider>
        <Nav/>
        <Routes>
          <React.Fragment>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LogInPage/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/private" element={<PrivateRoute/>}/>
          </React.Fragment>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
