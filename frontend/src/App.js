// import React, { Component } from "react";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

// CSS Imports
import "antd/dist/antd.min.css";
import "./index.css";

// Local Imports
import BaseRouter from "./routes";
import * as actions from "./redux/actions/auth";
import CustomLayout from "./containers/Layout";


export default function App(props) {


  // const profile = useSelector((state) => state.auth.profile);
  // const accessToken = get(profile, 'accessToken')
  // const routing = useRoutes(routes(accessToken));

  const hooksData = useSelector(state => {
    // console.log('STATE App auth ------>', state.auth)
    // console.log('STATE App token ------>', state.auth.token)
    console.log('STATE App token2 ------>', state.auth.profile.accessToken)
    return {
      // isAuthenticated: state.auth.token !== (null || undefined)
      isAuthenticated: state.auth.profile.accessToken !== (null || undefined)
    };
  });

  console.log(hooksData)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      onTryAutoSignup();
    };
  }, []);

  function onTryAutoSignup() {
    return () => dispatch(actions.authCheckState())
  };

  return (
    <>
      <Router>
        <CustomLayout {...hooksData}>
          <BaseRouter />
        </CustomLayout>
      </Router>
    </>
  );
}

// class App extends Component {
//   componentDidMount() {
//     this.props.onTryAutoSignup();
//   }

//   render() {
//     return (
//       <Router>
//         <CustomLayout {...this.props}>
//           <BaseRouter />
//         </CustomLayout>
//       </Router>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
