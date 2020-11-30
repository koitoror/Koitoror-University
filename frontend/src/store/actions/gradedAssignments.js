import axios from "axios";
import * as actionTypes from "./actionTypes";

import { uri } from './url'


const getGradedASNTListStart = () => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_LIST_START
  };
};

const getGradedASNTListSuccess = assignments => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENTS_LIST_SUCCESS,
    assignments
  };
};

const getGradedASNTListFail = error => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENTS_LIST_FAIL,
    error: error
  };
};

export const getGradedASNTS = (username, token) => {
  return dispatch => {
    dispatch(getGradedASNTListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // "Content-Length": "<calculated when request is sent>",
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Token ${token}`
    };
    axios
      .get(`${uri}/graded-assignments/?username=${username}`)
      .then(res => {
        const assignments = res.data;
        dispatch(getGradedASNTListSuccess(assignments));
      })
      .catch(err => {
        dispatch(getGradedASNTListFail(err));
      });
  };
};

export const createGradedASNT = (token, asnt) => {
  return dispatch => {
    //   dispatch(createASNTStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Content-Length": "<calculated when request is sent>",
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Token ${token}`
    };
    axios
      .post(`${uri}/graded-assignments/create/`, asnt)
      .then(res => {
        console.log("success");
        //   dispatch(createASNTSuccess());
      })
      .catch(err => {
        //   dispatch(createASNTFail());
      });
  };
};
