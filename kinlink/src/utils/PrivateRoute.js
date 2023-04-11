import React from 'react'
import LogInPage from '../pages/LogInPage'

const PrivateRoute = ({children, ...rest}) => {
    const isAuthenticated = false
    console.log('Private route works')
    return (
    <React.Fragment>
            {isAuthenticated? children : <LogInPage/>}
    </React.Fragment>
    )
}

export default PrivateRoute