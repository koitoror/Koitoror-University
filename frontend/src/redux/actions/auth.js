// import axios from "axios";
// import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';


import * as actionTypes from "./actionTypes";

// Backend API URL
import { API_HOST as uri } from '../../api/fetch/api'

// API SERVICES
import {api} from '../../api/services/Api';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
  // console.log('AUTH SUCCESS OLD')
  localStorage.setItem("authTokens", JSON.stringify(user));

  return {
    type: actionTypes.AUTH_SUCCESS,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  
  localStorage.removeItem("authTokens");
  // console.log('ACTION TO LOGOUT INVOKED')
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

// export const authLogin = (username, password) => {
//   return (dispatch) => {
//     dispatch(authStart());
//     axios.defaults.headers = {
//       // "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//       'Access-Control-Allow-Methods': 'POST',
//       // 'Cache-Control': 'no-cache',
//       "Access-Control-Allow-Origin": "<origin> | *",
//     };
//     axios
//       // .post(`${uri}/api/auth/token/`, {
//       .post(`${uri}/api/token/`, {
//         username,
//         password,
//       })
//       console.log(username, password)
//       .then((res) => {
//         console.log(res)
//         const user = {
//           token: res.data.key,
//           tokens: res.data.tokens,
//           username,
//           userId: res.data.user,
//           is_student: res.data.user_type.is_student,
//           is_teacher: res.data.user_type.is_teacher,
//           expirationDate: new Date(new Date().getTime() + 3600 * 1000),
//         };
//         localStorage.setItem("user", JSON.stringify(user));
//         dispatch(authSuccess(user));
//         dispatch(checkAuthTimeout(3600));
//       })
//       .catch((err) => {
//         dispatch(authFail(err));
//       });
//   };
// };


export const authLogin = formProps => dispatch => {

  dispatch(authStart());
  dispatch(actionSignIn()) //###

  return api.auth.login(formProps)
    .then((response) => {
      console.log('RESPONSE  ----->  ',response)

      const profile = jwt_decode(response.data.access)
      const user = {
        token: response.data.access,
        username: profile.username,
        userId: profile.user_id,
        // is_student: profile.user_type.is_student,
        // is_teacher: profile.user_type.is_teacher,
        expirationDate: new Date(new Date().getTime() + 3600 * 1000),
      };
      dispatch(authSuccess(user));
      dispatch(actionSignInSuccess(jwt_decode(user.token))) // ###
      dispatch(checkAuthTimeout(3600));


    })
    .catch((err) => {
      dispatch(authFail(err));

      dispatch(actionSignInError(err))  //###

      // if (error.response && error.response.data) {
      //   const { responseErrorsObject } = getResponseErrors(error.response.data);
      //   dispatch(failureMessage({ errors: responseErrorsObject }));
      // } else {
      //   dispatch(failureMessage({ errors: 'Something went wrong when signing you in.' }));
      // }

    });
};

export const authSignup = formProps => dispatch => {

  dispatch(authStart());
  dispatch(actionSignIn()) //###

  return api.auth.signup(formProps)
    // console.log(formProps)
    .then((response) => {
      console.log('RESPONSE  ----->  ',response)

      const profile = jwt_decode(response.data.tokens.access)
      const user = {
        token: response.data.tokens.access,
        username: profile.username,
        userId: profile.user_id,
        // is_student: profile.user_type.is_student,
        // is_teacher: profile.user_type.is_teacher,
        expirationDate: new Date(new Date().getTime() + 3600 * 1000),
      };
      // const user = {
      //   token: response.data.access,
      //   tokens: response.data.refresh,
      // };
      // const user = response.data
      // user.accessToken = response.data.tokens
      // profile.accessToken = response.data.access
      // console.log('PROFILE  ------> ', profile)

      // localStorage.setItem("authTokens", JSON.stringify(user));
      // dispatch(successMessage(response.data.user));
      dispatch(authSuccess(user));

      // setUser(jwt_decode(user.access))

      // console.log('USER 1', user1)
      // dispatch(actionSignInSuccess(user1)) // ###
      // dispatch(actionSignInSuccess(profile)) // ###
      dispatch(actionSignInSuccess(jwt_decode(user.token))) // ###
      // navigate('/')
      dispatch(checkAuthTimeout(3600));


    })
    .catch((err) => {
      dispatch(authFail(err));

      dispatch(actionSignInError(err))  //###

      // if (error.response && error.response.data) {
      //   const { responseErrorsObject } = getResponseErrors(error.response.data);
      //   dispatch(failureMessage({ errors: responseErrorsObject }));
      // } else {
      //   dispatch(failureMessage({ errors: 'Something went wrong when signing you in.' }));
      // }

    });
};

// export const authSignup = (
//   username,
//   email,
//   password,
//   confirm,
//   is_student
// ) => {
//   return (dispatch) => {
//     dispatch(authStart());
//     const user = {
//       username,
//       email,
//       password,
//       confirm,
//       is_student,
//       is_teacher: !is_student,
//     };
//     axios.defaults.headers = {
//       "Access-Control-Allow-Origin": "<origin> | *",
//       "Content-Type": "application/json",
//       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     };
//     axios
//       .post(`${uri}/rest-auth/registration/`, user)
//       .then((res) => {
//         // const user = {
//         //   // token: res.data.key,
//         //   token: res.data.token,
//         //   username,
//         //   userId: res.data.user,
//         //   is_student,
//         //   is_teacher: !is_student,
//         //   expirationDate: new Date(new Date().getTime() + 3600 * 1000),
//         // };
//         const user = res.tokens
//         // localStorage.setItem("user", JSON.stringify(user));
//         dispatch(authSuccess(user));
//         dispatch(checkAuthTimeout(3600));
//       })
//       .catch((err) => {
//         dispatch(authFail(err));
//       });
//   };
// };

export const authCheckState = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(f);
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const actionSignIn = () => dispatch => {
    dispatch({ type: actionTypes.SIGN_IN })
}

export const actionSignInSuccess = payload => dispatch => {
    dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload })
}

export const actionSignInError = error => dispatch => {
    dispatch({ type: actionTypes.SIGN_IN_ERROR, error })
}

export const actionFetchUserProfile = () => dispatch => {
    dispatch({ type: actionTypes.FETCH_USER })
}

export const actionFetchUserProfileSuccess = payload => dispatch => {
    dispatch({ type: actionTypes.FETCH_USER_SUCCESS, payload })
}

export const actionFetchUserProfileError = error => dispatch => {
    dispatch({ type: actionTypes.FETCH_USER_ERROR, error })
}

export const actionSignOut = error => dispatch => {
    // console.log('actionSignOut INVOKED')
    dispatch({ type: actionTypes.SIGN_OUT })
}