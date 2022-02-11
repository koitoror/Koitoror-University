import React from "react";
// import React, {useContext} from 'react'
import { Form, Input, Button, Spin } from "antd";
import Icon from '@ant-design/icons';
import { UserOutlined, LockOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
// import { UserOutlined, LockOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import * as actions from "../redux/actions/auth";
// import AuthContext from '../context/AuthContext';

const FormItem = Form.Item;

// const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />; 
// const antIcon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />; 
const antIcon = <Spin
  prefix={<Loading3QuartersOutlined
    // className="site-form-item-icon" 
    // style={{ color: "rgba(0,0,0,.25)" }} 
    style={{ fontSize: 24 }}
  />}
/>

// let {loginUser} = useContext(AuthContext)

// class NormalLoginForm extends React.Component {

export default function NormalLoginForm(props) {
  console.log('LOGIN PROPS ----> ', props)

  const handleSubmit = e => {
    e.preventDefault();
    console.log('LOGIN_next PROPS ----> ', props)
    props.form.validateFields((err, values) => {
      if (!err) {
        onAuth(values.userName, values.password);
        // props.history.push("/");
        // props.history("/");
        props.navigate("/");
      }
    });
  };

  const hooksData = useSelector(state => {
    // console.log(state)
    return {
      loading: state.auth.loading,
      error: state.auth.error
    };
  });

  const dispatch = useDispatch()

  function onAuth(username, password) {
    return () => dispatch(actions.authLogin(username, password))
  };

  function onAuth(username, email, password, confirm, is_student) {
    return () => dispatch(actionsauthSignup(username, email, password, confirm, is_student))
  };

  // render() {
  let errorMessage = null;
  if (hooksData.error) {
    errorMessage = <p>{hooksData.error.message}</p>;
  }

  return (
    <div>
      {errorMessage}
      {hooksData.loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Form onSubmit={handleSubmit} className="login-form">
          {/* // <Form onSubmit={loginUser} className="login-form"> */}
          <FormItem name="username" rules={[{ required: true, message: "Please input your username!" }]} >

            <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />

          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: "Please input your Password!" }]} >

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
  // }
}


// const mapStateToProps = state => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAuth: (username, password) =>
//       dispatch(actions.authLogin(username, password))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(NormalLoginForm);



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
