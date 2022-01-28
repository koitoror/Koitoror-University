import { Route, Navigate, Routes } from 'react-router-dom'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { AuthProvider } from '../context/AuthContext'

// const PrivateRoute = ({children, ...rest}) => {
//     let {user} = useContext(AuthContext)
//     return(
//         <Routes>
//             {/* <Route {...rest}> {!user ? <Navigate  to="/login" /> :   children} </Route> */}
//             <Route {...rest} element={!user ? <Navigate to="/login" /> : children} />

//         </Routes>
//     )
// }



const PrivateRoute = (children, {...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <AuthProvider>
            <Routes>
                {/* <Route {...rest}> {!user ? <Navigate  to="/login" /> :   children} </Route> */}
                <Route {...rest} element={!user ? <Navigate to="/login" /> : children} />

            </Routes>
        </AuthProvider>
    )
}

export default PrivateRoute;