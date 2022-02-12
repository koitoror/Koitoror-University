import React from "react";
import { List, Skeleton } from "antd";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import Result from "../components/Result";
import { getGradedASNTS } from "../redux/actions/gradedAssignments";
import Hoc from "../hoc/hoc";
import { useEffect } from "react";

// class Profile extends React.PureComponent {
// componentDidMount() {
//   if (this.props.token !== undefined && this.props.token !== null) {
//     this.props.getGradedASNTS(this.props.username, this.props.token);
//   }
// }

export default function Profile(props) {

  useEffect(() => {
    return () => {
      if (props.token !== undefined && props.token !== null) {
        getGradedASNTS(props.username, props.token);
      }
    };
  }, []);

  // UNSAFE_componentWillReceiveProps(newProps) {
  //   if (newProps.token !== this.props.token) {
  //     if (newProps.token !== undefined && newProps.token !== null) {
  //       this.props.getGradedASNTS(newProps.username, newProps.token);
  //     }
  //   }
  // }

  // useEffect((newProps) => {
  //   return () => {
  //     if (newProps.token !== props.token) {
  //       if (newProps.token !== undefined && newProps.token !== null) {
  //         getGradedASNTS(newProps.username, newProps.token);
  //       }
  //     }
  //   };
  // }, []);

  const hooksData = useSelector(state => {
    console.log(state)
    return {
      token: state.auth.token,
      // token: state.auth.profile.accessToken,
      // username: state.auth.username,
      username: state.auth.profile.username,
      gradedAssignments: state.gradedAssignments.assignments,
      loading: state.gradedAssignments.loading
    };
  });

  const dispatch = useDispatch()

  function getGradedASNTS(username, token) {
    return () => dispatch(getGradedASNTS(username, token))
  };

  // render() {
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
  // }
}




// const mapStateToProps = state => {
//   return {
//     token: state.auth.token,
//     username: state.auth.username,
//     gradedAssignments: state.gradedAssignments.assignments,
//     loading: state.gradedAssignments.loading
//   };
// };




// const mapDispatchToProps = dispatch => {
//   return {
//     getGradedASNTS: (username, token) =>
//       dispatch(getGradedASNTS(username, token))
//   };
// };


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Profile);

// export default Profile;
