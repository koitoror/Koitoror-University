import React from "react";
// import { Route, Routes, useRoutes, Navigate, } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

// local Imports
import Hoc from "../hoc/hoc";

// import { AuthProvider } from '../context/AuthContext'
import PrivateRoute, { PrivateWrapper } from '../routes/utils/PrivateRoute'

import Auth from '../pages/Auth';
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import LoginPage from '../pages/LoginPage'
import Profile from "../pages/Profile";

import Home from '../pages/Home';
import HomePage from '../pages/HomePage'
import AssignmentList from "../pages/AssignmentList";
import AssignmentDetail from "../pages/AssignmentDetail";
import AssignmentCreate from "../pages/AssignmentCreate";
import NotFoundPage from "../pages/NotFoundPage";


const BaseRouter = () => (
  <Hoc>

    {/* <AuthProvider> */}
      <Routes>

        // AUTH ROUTES
        <Route exact path="/signup/" element={<Signup />} />
        {/* <Route exact path="/auth/" element={<Auth/>} /> */}
        <Route exact path="/login/" element={<Auth />} />
        <Route exact path="/login1/" element={<Login />} />
        <Route exact path="/login2/" element={<LoginPage />} />
        {/* <Route exact path="/profile/:user_id" element={<Profile />} /> */}
        <Route exact path="/profile" element={<Profile />} />


        // ASSIGNMENTS ROUTES
        <Route exact path="/" element={<AssignmentList />} />
        <Route exact path="/create/" element={<AssignmentCreate />} />
        <Route exact path="/assignments/:id" element={<AssignmentDetail />} />

        // PROTECTED ROUTES
        {/* <Route exact path='/home2' element={<PrivateRoute element={HomePage}/>}/> */}
        {/* <Route element={<PrivateWrapper />}> */}
        <Route path="/home1" element={<Home />} />
        {/* <Route path="/home2" element={<HomePage />} /> */}
        {/* </Route>  */}
        

        // HANDLE NOT FOUND ROUTE
        <Route exact path="/not-found" element={<NotFoundPage />} />
        <Route exact element={<NotFoundPage />} />
      
      </Routes>
    {/* </AuthProvider> */}
  
  </Hoc>
);

export default BaseRouter;
