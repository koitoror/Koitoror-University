import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
// import { Link, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Sider, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout" id="layout">

        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {this.props.token !== null ? (
              <Breadcrumb.Item>
                <Link to={`/profile/${this.props.userId}`}>Profile</Link>
              </Breadcrumb.Item>
            ) : null}
            {this.props.token !== null && this.props.is_teacher ? (
              <Breadcrumb.Item>
                <Link to="/create">Create</Link>
              </Breadcrumb.Item>
            ) : null}
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280, width: "80vw"}}>
            {this.props.children}
          </div>
        </Content>
        <Sider>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "44px" }}
            size="small"
          >
            {this.props.isAuthenticated ? (
              <Menu.Item key="2" onClick={this.props.logout} style={{ borderRadius: "25" }}
              >
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item key="2">
                <Link to="/login" >Login</Link>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Footer style={{ textAlign: "center"}}>
          Koitoror Designs ©2022 Degem-Ventures
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    is_teacher: state.auth.is_teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

// export default useNavigate(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(CustomLayout)
// );

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout);
