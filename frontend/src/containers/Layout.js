import React, { useEffect } from "react";
import { Layout, Breadcrumb, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined, LogoutOutlined, LoginOutlined, FileAddFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
const { Header, Content, Footer } = Layout;

import * as actions from "../redux/actions/auth";
// import HeaderComponent from '../components/Header'


export default function CustomLayout(props) {
  const navigate = useNavigate();

  console.log('PROPS Layout ----> ', props)

  // REDIRECT TO HOMEPAGE ON LOGOUT FROM LAYOUT
  useEffect(() => {
  if (!props.isAuthenticated) {
    navigate('/');
    }
  
  }, [props]);

  const hooksData = useSelector(state => {
    // console.log(state)
    return {
      token: state.auth.token,
      userId: state.auth.userId,
      // userId: state.auth.profile.user_id,
      is_teacher: state.auth.profile.is_teacher
    };
  });

  // console.log(hooksData)

  const dispatch = useDispatch()

  function logout() {
    console.log('ACTION TO LOGOUT DISPATCHED')
    return dispatch(actions.logout())
  };

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
          {/* {hooksData.token !== (null || undefined) ? ( */}
          {hooksData.token !== null ? (
            <Breadcrumb.Item>
              <UserOutlined />
              <Link to={`/profile/${hooksData.userId}`}>Profile</Link>
            </Breadcrumb.Item>
          ) : null}
          {hooksData.token !== null && hooksData.is_teacher ? (
            <Breadcrumb.Item>
              <FileAddFilled />
              <Link to="/create">Create</Link>
            </Breadcrumb.Item>
          ) : null}
        </Breadcrumb>
        <Breadcrumb style={{
          margin: -42,
          float: 'right'
        }}>
          {props.isAuthenticated ? (
            <Breadcrumb.Item>
              <Button
                key="2"
                icon={<LogoutOutlined />}
                onClick={logout}
                style={{ borderRadius: 10 }}
              >
                Logout
              </Button>
            </Breadcrumb.Item>

          ) : (
            <Breadcrumb.Item>
              <Link to="/login" >
                <Button key="1"
                  icon={<LoginOutlined />}
                  style={{ borderRadius: 10 }}
                >

                  Login

                </Button>
              </Link>
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        {/* <HeaderComponent /> */}

        <div style={{ background: "#fff", padding: 24, minHeight: 280, width: "80vw" }}>
          {props.children}
        </div>
      </Content>
  
      <Footer style={{ textAlign: "center" }}>
        Koitoror Designs ©2022 Degem-Ventures
      </Footer>

    </Layout>
  );
}
