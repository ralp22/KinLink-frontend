import { Route, Routes } from 'react-router-dom'
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import HomePage from '../pages/HomePage'
import LogInPage from '../pages/LogInPage'
import PrivateRoute from '../PrivateRoute'
import React from 'react'

export default function Main(){

    return (
        <div className="routes">
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LogInPage/>}/>
            <Route path="/componentA" element={<ComponentA/>}/>
            <Route path="/componentB" element={<ComponentB/>}/>
            <Route path="/private" element={<PrivateRoute/>}/>
        </Routes>
        </div>
    )

}