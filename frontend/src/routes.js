import React from "react";
import { Route, Routes } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentCreate from "./containers/AssignmentCreate";

// import PrivateRoute from './utils/PrivateRoute'
// import { AuthProvider } from './context/AuthContext'

// import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
// import Header from './components/Header'

const BaseRouter = () => (
  <Hoc>
    {/* <AuthProvider> */}
      {/* <Header/> */}
      <Routes>
        <Route exact path="/" element={<AssignmentList/>} />
        <Route exact path="/create/" element={<AssignmentCreate/>} />
        <Route exact path="/login/" element={<Login/>} />
        <Route exact path="/login2" element={<LoginPage/>}/>
        <Route exact path="/signup/" element={<Signup/>} />
        <Route exact path="/assignments/:id" element={<AssignmentDetail/>} />
        <Route exact path="/profile/:id" element={<Profile/>} />

      </Routes>
      {/* <PrivateRoute exact path="/home" element={HomePage}/> */}
    {/* </AuthProvider> */}
  </Hoc>
);

export default BaseRouter;
