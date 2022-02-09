import React, { useEffect } from "react";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton } from "antd";
import * as actions from "../store/actions/assignments";
import Hoc from "../hoc/hoc";

// class AssignmentList extends React.PureComponent {
export default function AssignmentList (props) {

  const hooksData = useSelector(state => {
    console.log('STATE AUTH TOKEN ------>', state.auth.token)
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

  // componentDidMount() {
  //   if (this.props.token !== undefined && this.props.token !== null) {
  //     this.props.getASNTS(this.props.token);
  //   }
  // }

  useEffect(() => {
    if (props.token !== undefined && props.token !== null) {
      getASNTS(props.token);
    }
    // return () => {
    //   getASNTS(props.token);
    // };
  }, [props]);


  // UNSAFE_componentWillReceiveProps(newProps) {
  //   if (newProps.token !== this.props.token) {
  //     if (newProps.token !== undefined && newProps.token !== null) {
  //       this.props.getASNTS(newProps.token);
  //     }
  //   }
  // }

  function renderItem(item) {
    return (
      <Link to={`/assignments/${item.id}`}>
        <List.Item>{item.title}</List.Item>
      </Link>
    );
  }

  // render() {
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
  // }
}

// const mapStateToProps = state => {
//   return {
//     token: state.auth.token,
//     assignments: state.assignments.assignments,
//     loading: state.assignments.loading
//   };
// };


// const mapDispatchToProps = dispatch => {
//   return {
//     getASNTS: token => dispatch(actions.getASNTS(token))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AssignmentList);
