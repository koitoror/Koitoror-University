import { combineReducers } from 'redux';
import app from './appReducer';
import auth from './authReducer';
import authReducer from "./auth";
import assignmentReducer from "./assignments";
import gradedAssignmentReducer from "./gradedAssignments";


const rootReducer = combineReducers({
  app,
  auth,
  auth1: authReducer,
  assignments: assignmentReducer,
  gradedAssignments: gradedAssignmentReducer
});

export default rootReducer;
