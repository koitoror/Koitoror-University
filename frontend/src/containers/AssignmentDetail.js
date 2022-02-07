import React from "react";
import { connect } from "react-redux";
import { Card, Skeleton, message } from "antd";
import Questions from "./Questions";
import Choices from "../components/Choices";
import { getASNTSDetail as getASNTSDetailAction} from "../store/actions/assignments";
import { createGradedASNT as createGradedASNTAction} from "../store/actions/gradedAssignments";
import Hoc from "../hoc/hoc";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

// class AssignmentDetail extends React.Component {
export default function AssignmentDetail(props) {

  // state = {
  //   usersAnswers: {}
  // };
  
  const [state, setState] = useState({
                                    usersAnswers: {}
                                  });

  const hooksData = useSelector(() => {
    // console.log(state)
    return {
      token: state.auth.token,
      currentAssignment: state.assignments.currentAssignment,
      loading: state.assignments.loading,
      username: state.auth.username
    };
  })

  dispatch = useDispatch()

  function getASNTSDetail(token, id) {
    return () => dispatch(getASNTSDetailAction(token, id))
  }

  function createGradedASNT(token, asnt) {
    return () => dispatch(createGradedASNTAction(token, asnt))
    // return () => dispatch(getASNTSDetail(createGradedASNTAction(token, asnt)))
  }

  useEffect(() => {
    if (props.token !== undefined && props.token !== null) {
      getASNTSDetail(props.token, props.match.params.id);
    }
  
  }, [props]);

  // componentDidMount() {
  //   if (this.props.token !== undefined && this.props.token !== null) {
  //     this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
  //   }
  // }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.token !== this.props.token) {
  //     if (newProps.token !== undefined && newProps.token !== null) {
  //       this.props.getASNTSDetail(newProps.token, this.props.match.params.id);
  //     }
  //   }
  // }

  const onChange = (e, qId) => {
    const { usersAnswers } = state;
    usersAnswers[qId] = e.target.value;
    setState({ usersAnswers });
  };

  function handleSubmit() {
    message.success("Submitting your assignment!");
    const { usersAnswers } = state;
    const asnt = {
      username: props.username,
      asntId: props.currentAssignment.id,
      answers: usersAnswers
    };
    // props.createGradedASNT(props.token, asnt);
    createGradedASNT(props.token, asnt);
  }

  // render() {
  const { currentAssignment } = props;
  const { title } = currentAssignment;
  const { usersAnswers } = state;
  return (
    <Hoc>
      {Object.keys(currentAssignment).length > 0 ? (
        <Hoc>
          {props.loading ? (
            <Skeleton active />
          ) : (
            <Card title={title}>
              <Questions
                submit={() => handleSubmit()}
                questions={currentAssignment.questions.map(q => {
                  return (
                    <Card
                      style={cardStyle}
                      type="inner"
                      key={q.id}
                      title={`${q.order}. ${q.question}`}
                    >
                      <Choices
                        questionId={q.order}
                        choices={q.choices}
                        change={onChange}
                        usersAnswers={usersAnswers}
                      />
                    </Card>
                  );
                })}
              />
            </Card>
          )}
        </Hoc>
      ) : null}
    </Hoc>
  );
  // }
}

// const mapStateToProps = state => {
//   return {
//     token: state.auth.token,
//     currentAssignment: state.assignments.currentAssignment,
//     loading: state.assignments.loading,
//     username: state.auth.username
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getASNTSDetail: (token, id) => dispatch(getASNTSDetail(token, id)),
//     createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AssignmentDetail);
