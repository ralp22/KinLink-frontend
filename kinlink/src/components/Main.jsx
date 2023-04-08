import { Route, Routes } from 'react-router-dom'
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import ComponentC from './ComponentC'
import Home from './Home'

export default function Main(){

    return (
        <div className="routes">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/componentA" element={<ComponentA/>}/>
            <Route path="/componentB" element={<ComponentB/>}/>
            <Route path="/componentC" element={<ComponentC/>}/>
        </Routes>
        </div>
    )

}