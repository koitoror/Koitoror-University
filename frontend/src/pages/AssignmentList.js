import React, { useEffect } from "react";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton } from "antd";
import * as actions from "../redux/actions/assignments";
import Hoc from "../hoc/hoc";

export default function AssignmentList(props) {

  const hooksData = useSelector(state => {
    // console.log('STATE ------>', state)
    return {
      token: state.auth.token,
      assignments: state.assignments.assignments,
      loading: state.assignments.loading
    };
  });

  console.log(hooksData)

  const dispatch = useDispatch()

  function getASNTS(token) {
    return () => dispatch(actions.getASNTS(token))
  };

  useEffect(() => {
    if (hooksData.token !== undefined && hooksData.token !== null) {
      getASNTS(hooksData.token);
    }
    return () => {
      getASNTS(hooksData.token);
    };
  }, []);


  function renderItem(item) {
    return (
      <Link to={`/assignments/${item.id}`}>
        <List.Item>{item.title}</List.Item>
      </Link>
    );
  }

  return (
    <Hoc>
      {props.loading ? (
        <Skeleton active />
      ) : (
        <div>
          <h3 style={{ margin: "16px 0" }}>Assignment List</h3>
          <List
            size="large"
            bordered
            dataSource={props.assignments}
            renderItem={item => renderItem(item)}
          />
        </div>
      )}
    </Hoc>
  );
}
