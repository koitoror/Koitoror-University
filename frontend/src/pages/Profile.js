import React from "react";
import { useEffect } from "react";
import { List, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";

import Result from "../components/Result";
import { getGradedASNTS } from "../redux/actions/gradedAssignments";
import Hoc from "../hoc/hoc";
// import requireAuth from '../hoc/requireAuth';


export default function Profile(props) {
    // console.log('PROPS Profile ------>', props)
    
    const hooksData = useSelector(state => {
      // console.log('STATE Profile ------>', state)
      return {
        token: state.auth.token,
        username: state.auth.username,
        gradedAssignments: state.gradedAssignments.assignments,
        loading: state.gradedAssignments.loading
      };
    });
    
    const dispatch = useDispatch()
    
    function _getGradedASNTS(username, token) {
      return () => dispatch(getGradedASNTS(username, token))
    };
    
    useEffect(() => {
      return () => {
        if (hooksData.token !== undefined && hooksData.token !== null) {
          _getGradedASNTS(hooksData.username, hooksData.token);
        }
      };
    }, []);

  return (
    <Hoc>
      {hooksData.loading ? (
        <Skeleton active />
      ) : (
        <Hoc>
          <h1>Hi {hooksData.username}</h1>
          <List
            size="large"
            dataSource={hooksData.gradedAssignments}
            renderItem={a => <Result key={a.id} grade={a.grade} />}
          />
        </Hoc>
      )}
    </Hoc>
  );
}
