import axios from "axios";
import * as actionTypes from "./actionTypes";

// Backend API URL
import { API_HOST as uri } from './api'


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
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
  localStorage.removeItem("user");
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

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios.defaults.headers = {
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      'Access-Control-Allow-Methods': 'POST',
      // 'Cache-Control': 'no-cache',
      "Access-Control-Allow-Origin": "<origin> | *",
    };
    axios
      // .post(`${uri}/api/auth/token/`, {
      .post(`${uri}/api/token/`, {
        username,
        password,
      })
      console.log(username, password)
      .then((res) => {
        console.log(res)
        const user = {
          token: res.data.key,
          tokens: res.data.tokens,
          username,
          userId: res.data.user,
          is_student: res.data.user_type.is_student,
          is_teacher: res.data.user_type.is_teacher,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  username,
  email,
  password,
  confirm,
  is_student
) => {
  return (dispatch) => {
    dispatch(authStart());
    const user = {
      username,
      email,
      password,
      confirm,
      is_student,
      is_teacher: !is_student,
    };
    axios.defaults.headers = {
      "Access-Control-Allow-Origin": "<origin> | *",
      "Content-Type": "application/json",
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    };
    axios
      .post(`${uri}/rest-auth/registration/`, user)
      .then((res) => {
        const user = {
          // token: res.data.key,
          token: res.data.token,
          username,
          userId: res.data.user,
          is_student,
          is_teacher: !is_student,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
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
