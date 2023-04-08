import { Link } from 'react-router-dom'

export default function Nav(){

    return (
        <div>
        <Link to="/"> <h1>Home</h1> </Link>
        <Link to="/componentA"> <h2>Component A</h2> </Link>
        <Link to="/componentB"> <h3>Component B</h3> </Link>
        <Link to="/componentC"> <h4>Component C</h4> </Link>
        </div>
    )
}