import React from "react";
// import React, {useContext} from 'react'
import { Form, Input, Button, Spin } from "antd";
import Icon from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { UserOutlined, LockOutlined, Loading3QuartersOutline } from '@ant-design/icons';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import * as actions from "../store/actions/auth";
// import AuthContext from '../context/AuthContext';

const FormItem=Form.Item;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />; 
// const antIcon = <Loading3QuartersOutline style={{ fontSize: 24 }} spin />; 
// const antIcon = <Icon
//                   prefix={<Loading3QuartersOutline className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />}
//                   placeholder="Email"
//                   />

// let {loginUser} = useContext(AuthContext)

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
        this.props.history.push("/");
      }
    });
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div>
        {errorMessage}
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Form onSubmit={this.handleSubmit} className="login-form">
          {/* // <Form onSubmit={loginUser} className="login-form"> */}
            <FormItem name="username" rules={[{ required: true, message: "Please input your username!"  }]} >

                <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />

            </FormItem>
            <FormItem name="password" rules={[{ required: true, message: "Please input your Password!"  }]} >

              <Input
                prefix={<LockOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
                shape="round"
              >
                Login
              </Button>
              Or
              <NavLink style={{ marginRight: "10px" }} to="/signup/">
                {" "}
                Signup
              </NavLink>
            </FormItem>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NormalLoginForm);



// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

// export default const NormalLoginForm = () => {
//   const [form] = Form.useForm();
//   const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

//   useEffect(() => {
//     forceUpdate({});
//   }, []);

//   const onFinish = (values) => {
//     console.log('Finish:', values);
//   };

//   return (
//     <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
//       <Form.Item
//         name="username"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your username!',
//           },
//         ]}
//       >
//         <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your password!',
//           },
//         ]}
//       >
//         <Input
//           prefix={<LockOutlined className="site-form-item-icon" />}
//           type="password"
//           placeholder="Password"
//         />
//       </Form.Item>
//       <Form.Item shouldUpdate>
//         {() => (
//           <Button
//             type="primary"
//             htmlType="submit"
//             disabled={
//               !form.isFieldsTouched(true) ||
//               !!form.getFieldsError().filter(({ errors }) => errors.length).length
//             }
//           >
//             Log in
//           </Button>
//         )}
//       </Form.Item>
//     </Form>
//   );
// };
