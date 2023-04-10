import { Route, Redirect } from 'react-router-dom'
import React from 'react'

const PrivateRoute = ({children, ...rest}) => {
    console.log('Private route works')
    return (
    <React.Fragment>
            {true? children : <Redirect to='/login'/>}
    </React.Fragment>
        
    )
}

export default PrivateRoute