import React from "react";
import { Route, Routes, useRoutes, Navigate, } from "react-router-dom";

// local Imports
import Hoc from "./hoc/hoc";

import { AuthProvider } from './context/AuthContext'
import PrivateRoute, { PrivateWrapper } from './utils/PrivateRoute'

import Auth from './pages/Auth';
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import LoginPage from './pages/LoginPage'
import Profile from "./containers/Profile";

import Header from './components/Header'
import Home from './pages/Home';
import HomePage from './pages/HomePage'
import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentCreate from "./containers/AssignmentCreate";


const BaseRouter = () => (
  <Hoc>
    <AuthProvider>
      {/* <Header/> */}
      <Routes>

        // AUTH ROUTES
        {/* <Route exact path="/auth/" element={<Auth/>} /> */}
        <Route exact path="/login/" element={<Auth/>} />
        <Route exact path="/signup/" element={<Signup/>} />
        <Route exact path="/auth/" element={<Login/>} />
        {/* <Route exact path="/login/" element={<Login/>} /> */}
        <Route exact path="/login2" element={<LoginPage/>}/>
        <Route exact path="/profile/:user_id" element={<Profile/>} />

        // ASSIGNMENTS ROUTES
        <Route exact path="/" element={<AssignmentList/>} />
        <Route exact path="/create/" element={<AssignmentCreate/>} />
        <Route exact path="/assignments/:id" element={<AssignmentDetail/>} />

        // PROTECTED ROUTES
        {/* <Route exact path='/home2' element={<PrivateRoute component={HomePage}/>}/> */}
        <Route element={<PrivateWrapper />}>
          <Route path="/home1" element={<Home />} />
          <Route path="/home2" element={<HomePage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>

      </Routes>
    </AuthProvider>
  </Hoc>
);

export default BaseRouter;
