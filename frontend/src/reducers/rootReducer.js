import { combineReducers } from 'redux';
import app from './appReducer';
import auth from './authReducer';
import authReducer from "../store/reducers/auth";
import assignmentReducer from "../store/reducers/assignments";
import gradedAssignmentReducer from "../store/reducers/gradedAssignments";


const rootReducer = combineReducers({
  app,
  auth,
  // auth: authReducer,
  assignments: assignmentReducer,
  gradedAssignments: gradedAssignmentReducer
});

export default rootReducer;
