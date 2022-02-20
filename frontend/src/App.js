import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";

// CSS Imports
import "antd/dist/antd.min.css";
import "./index.css";

// Local Imports
import BaseRouter from "./routes";
import * as actions from "./redux/actions/auth";
import CustomLayout from "./containers/Layout";



export default function App(props) {
  console.log('PROPS APP ----> ', props)

  // const hooksData = useSelector(state => {
  //   // console.log('STATE App ------>', state)
  //   // console.log('STATE App auth ------>', state.auth)
  //   // console.log('STATE App token ------>', state.auth.token)
  //   return {
  //     isAuthenticated: state.auth.token !== null
  //   };
  // });

  // console.log(hooksData)

  const dispatch = useDispatch()
  
  useEffect(() => {

    return () => {
      onTryAutoSignup();
    };
  }, []);

  function onTryAutoSignup() {
    // return () => dispatch(actions.authCheckState())
    return dispatch(actions.authCheckState())
  };


  return (
    <>
      <Router>
        {/* <CustomLayout {...hooksData}> */}
          <BaseRouter />
        {/* </CustomLayout> */}
      </Router>
    </>
  );
}
