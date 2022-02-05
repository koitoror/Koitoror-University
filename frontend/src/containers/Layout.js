import React from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from "react-router-dom";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
const { Header, Sider, Content, Footer } = Layout;

import * as actions from "../store/actions/auth";


// class CustomLayout extends React.Component {
export default function CustomLayout (props) {
  
  console.log('PROPS  ----> ', props)

  const hooksData = useSelector(state => {
    console.log(state)
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      is_teacher: state.auth.is_teacher
    };
  });
  
  // console.log(hooksData)
  
  const dispatch = useDispatch()

  function logout() {
    return () => dispatch(actions.logout())
  };

  // render() {
    return (
      <Layout 
        className="layout" 
        id="layout" 
        style={{
          // height: '100vh', 
          padding: 0, 
          margin: 0
        }}
          >

        <Header>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <HomeOutlined />
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {hooksData.token !== (null || undefined) ? (
              <Breadcrumb.Item>
                <UserOutlined />
                <Link to={`/profile/${hooksData.userId}`}>Profile</Link>
              </Breadcrumb.Item>
            ) : null}
            {hooksData.token !== null && hooksData.is_teacher ? (
              <Breadcrumb.Item>
                <Link to="/create">Create</Link>
              </Breadcrumb.Item>
            ) : null}
            {/* </Breadcrumb>
            <Breadcrumb> */}
            {props.isAuthenticated ? (
              // <Breadcrumb.Item>
                <Button
                  key="2"
                  icon={<LogoutOutlined />}
                  onClick={logout} 
                  style={{ 
                    borderRadius: 15, 
                    float: 'right' }}
                > 
                  Logout
                </Button>
              // </Breadcrumb.Item>
              
            ) : (
              // <Breadcrumb.Item>
                <Button key="2" 
                  icon={<LoginOutlined />} 
                  style={{ borderRadius: 15, 
                  float: 'right'
                }}
                  >
                  <Link to="/login" >Login</Link>
                </Button>
              // </Breadcrumb.Item>                
              )}
          </Breadcrumb>
          {/* <Breadcrumb style={{textAlign: "left"}}> */}
          {/* <Breadcrumb> */}
            {/* <Menu
              // theme="dark"
              // mode="horizontal"
              // defaultSelectedKeys={["2"]}
              // style={{ lineHeight: "44px", display: 'flex-end' }}
              // style={{ display: 'flex-end' }}
              // size="small"
            > */}
              {/* <div className="logo" /> */}
              {/* {props.isAuthenticated ? (
                <Breadcrumb.Item key="2" onClick={logout} style={{ borderRadius: "25" }}
                >
                  Logout
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item key="2">
                  <Link to="/login" >Login</Link>
                </Breadcrumb.Item>
              )} */}
            {/* </Menu> */}
          {/* </Breadcrumb> */}
        </Header>
        <Content style={{ padding: "0 50px" }}>


          <div style={{ background: "#fff", padding: 24, minHeight: 280, width: "80vw" }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Koitoror Designs ©2022 Degem-Ventures
        </Footer>
      </Layout>
    );
  // }
}


// const mapStateToProps = state => {
//   return {
//     userId: state.auth.userId,
//     token: state.auth.token,
//     is_teacher: state.auth.is_teacher
//   };
// };



// const mapDispatchToProps = dispatch => {
//   return {
//     logout: () => dispatch(actions.logout())
//   };
// };

// export default useNavigate(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(CustomLayout)
// );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CustomLayout);
