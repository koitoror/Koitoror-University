import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Divider } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import QuestionForm from "./QuestionForm";
import Hoc from "../hoc/hoc";
import { createASNT as createASNTAction } from "../store/actions/assignments";

const FormItem = Form.Item;

// class AssignmentCreate extends React.Component {
export default function AssignmentCreate(props) {

  // state = {
  //   formCount: 1
  // };

  const [state, setState] = useState({
                                  formCount: 1
                              });
                                  
  const hooksData = useSelector(() => {
    // console.log(state)
    return {
      token: state.auth.token,
      username: state.auth.username,
      loading: state.assignments.loading
    };
  })

  dispatch = useDispatch()

  function getASNTSDetail(token, id) {
    return () => dispatch(getASNTSDetailAction(token, id))
  }

  function createASNT(token, asnt) {
    return () => dispatch(createASNTAction(token, asnt))
  }

  const remove = () => {
    const { formCount } = state;
    setState({
      formCount: formCount - 1
    });
  };

  const add = () => {
    const { formCount } = state;
    setState({
      formCount: formCount + 1
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const questions = [];
        for (let i = 0; i < values.questions.length; i += 1) {
          questions.push({
            title: values.question[i],
            choices: values.questions[i].choices.filter(el => el !== null),
            answer: values.answers[i]
          });
        }
        const asnt = {
          teacher: hooksData.username,
          title: values.title,
          questions
        };
        createASNT(hooksData.token, asnt);
      }
    });
  };

  // render() {
  const questions = [];
  for (let i = 0; i < state.formCount; i += 1) {
    questions.push(
      <Hoc key={i}>
        {questions.length > 0 ? (
          // <Icon
          //   className="dynamic-delete-button"
          //   type="minus-circle-o"
          //   disabled={questions.length === 0}
          //   onClick={() => this.remove()}
          // />
          <Icon prefix={<MinusCircleOutlined 
            // className="dynamic-delete-button" 
            // style={{ color: "rgba(0,0,0,.25)"}}
            // disabled={questions.length === 0}
            // onClick={() => this.remove()}
          />}/>
        ) : null}
        <QuestionForm id={i} {...props} />
        <Divider />
      </Hoc>
    );
  }
  return (
    // <Form onSubmit={this.handleSubmit}>
    <Form onFinish={handleSubmit}>
      <h1>Create an assignment</h1>
      {/* <FormItem label={"Title: "}>
        {getFieldDecorator(`title`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              message: "Please input a title"
            }
          ]
        })
      } */}
      <FormItem name="title" label={"Title: "} validateTrigger={["onChange", "onBlur"]}  rules={[{ required: true, message: "Please input a title"  }]} >

        (<Input placeholder="Add a title" />)

      </FormItem>
      {questions}
      <FormItem>
        {/* <Button type="secondary" onClick={this.add}> */}
        <Button shape="dashed" onClick={add} style={{ width: "60%" }} icon={<PlusCircleOutlined />}>

          {/* <Icon type="plus" />*/}
          {/* <Input prefix={<PlusCircleOutlined 
            // className="dynamic-delete-button" 
            // style={{ color: "rgba(0,0,0,.25)" }}
          />}/>  */}
          Add question 
        </Button>
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
  // }
}

// const mapStateToProps = state => {
//   return {
//     token: state.auth.token,
//     username: state.auth.username,
//     loading: state.assignments.loading
//   };
// };


// const mapDispatchToProps = dispatch => {
//   return {
//     createASNT: (token, asnt) => dispatch(createASNT(token, asnt))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AssignmentCreate);
