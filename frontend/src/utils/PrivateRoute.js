import { Route, Navigate, Routes, Outlet, useRoutes } from 'react-router-dom'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { AuthProvider } from '../context/AuthContext'
import { useSelector } from 'react-redux';
import get from 'lodash/get';

const PrivateRoute = ({ children, ...rest }) => {
    const profile = useSelector((state) => state.auth.profile);
    const accessToken = get(profile, 'accessToken');
    // const routing = useRoutes(routes(accessToken));
    let {user} = useContext(AuthContext)

    return( !user || !accessToken ? <Navigate to="/login" /> : children )
    // return( if !user ? <Navigate to="/login" /> : children
    //         else if !accessToken ? <Navigate to="/login" /> : children )
}


// const PrivateRoute = ({ children, ...rest }) => {
//     let {user} = useContext(AuthContext)
//     return(
//         // <AuthProvider>
//         //     <Routes>
//                 {/* <Route {...rest}> {!user ? <Navigate  to="/login" /> :   children} </Route> */}
//                 {/* console.log(<Route {...rest} element={!user ? <Navigate to="/login" /> : children} />) */}

//                 {/* <Route {...rest} element={!user ? <Navigate to="/login" /> : children} /> */}
//                 !user ? <Navigate to="/login" /> : children

//         //     </Routes>
//         // </AuthProvider>
//     )
// }

export default PrivateRoute;


//PrivateRoute.js
// export default function PrivateRoute({ component: Component, ...rest }) {
// export default function PrivateRoute({ children, ...rest }) {

//     const isLogged = false;

//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     // return isLogged ? <Component/> : <Navigate to="/login" />;
//     return isLogged ? children : <Navigate to="/login" />;
// }


// const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };


// export const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
export const PrivateWrapper = () => {
    const profile = useSelector((state) => state.auth.profile);
    const accessToken = get(profile, 'accessToken');
    // const routing = useRoutes(routes(accessToken));
    let {user} = useContext(AuthContext)
    return user || accessToken || isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
