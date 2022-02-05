import React from "react";
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Hoc from "../hoc/hoc";

const FormItem = Form.Item;

let id = 0;

// class QuestionForm extends React.Component {

export default function QuestionForm (props) {

    const remove = k => {
        const { form } = props;
        const keys = form.getFieldValue("keys")
        if (keys.length === 1) return;
        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        });
    };

    const add = () => {
        const { form } = props;
        const keys = form.getFieldValue("keys");
        const nextKeys = keys.concat(++id);
        form.setFieldsValue({
            keys: nextKeys
        });
    };

    // render() {
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    // getFieldDecorator("keys", { initialValue: [] });
    // const keys = getFieldValue("keys");
    // const { keys, questions, getFieldValue } = this.props.form;
    const { keys, questions } = props.form;
    // "keys" { initialValue: [] };
    // const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
        // <FormItem label={index === 0 ? "Choices" : ""} key={k}>
        //   {
        //   getFieldDecorator(`questions[${this.props.id}]choices[${k}]`, {
        //     validateTrigger: ["onChange", "onBlur"],
        //     rules: [
        //       {
        //         required: true,
        //         whitespace: true,
        //         message: "Please input a choice to the question"
        //       }
        //     ]
        //   })
        <FormItem name={`questions[${props.id}]choices[${k}]`} label={index === 0 ? "Choices" : ""} validateTrigger={["onChange", "onBlur"]} rules={[{ required: true, whitespace: true, message: "Please input a choice to the question" }]} >

            {/* (<Input placeholder="Answer choice" />) */}
            {
                keys.length > 1 ? (
                    // <Icon
                    //     className="dynamic-delete-button"
                    //     type="minus-circle-o"
                    //     disabled={keys.length === 1}
                    //     onClick={() => this.remove(k)}
                    // />
                    <Input prefix={<MinusCircleOutlined />}
                        className="dynamic-delete-button" 
                        style={{ color: "rgba(0,0,0,.25)"}} 
                        disabled={keys.length === 1}
                        onClick={() => remove(k)}
                    placeholder="Answer choice" 
                    />

                ) : null
            }
        </FormItem>
        // <FormItem
        //     label={index === 0 ? "Choices" : ""} key={k},
        //     name={`questions[${this.props.id}]choices[${k}]`},
        //     rules={
        //         validateTrigger: ["onChange", "onBlur"],
        //         required: true,
        //         whitespace: true,
        //         } 
        //     >
        // (<Input placeholder="Answer choice" />)
        // {
        // keys.length > 1 ? (
        //     <Icon
        //         className="dynamic-delete-button"
        //         type="minus-circle-o"
        //         disabled={keys.length === 1}
        //         onClick={() => this.remove(k)}
        //     />
        // ) : null
        // }
        // </FormItem >
        ));
    return (
        <Hoc>
            {/* <FormItem label="Question: ">
        {getFieldDecorator(`question[${this.props.id}]`, {
        validateTrigger: ["onChange", "onBlur"],
        rules: [
            {
            required: true,
            message: "Please input a question"
            }
        ]
        })(<Input placeholder="Add a question" />)}
    </FormItem> */}
            <FormItem name={`question[${props.id}]`} label={"Question: "} validateTrigger={["onChange", "onBlur"]} rules={[{ required: true, message: "Please input a question" }]} >

                (<Input placeholder="Please input a question" />)

            </FormItem>
            {/* <FormItem label="Answer: ">
        {getFieldDecorator(`answers[${this.props.id}]`, {
        validateTrigger: ["onChange", "onBlur"],
        rules: [
            {
            required: true,
            message: "Please input an answer to this question"
            }
        ]
        })(<Input placeholder="What is the answer?" />)}
    </FormItem> */} 
            <FormItem name={`answers[${props.id}]`} label={"Answer: "} validateTrigger={["onChange", "onBlur"]} rules={[{ required: true, message: "Please input an answer to this question" }]} >

                (<Input placeholder="What is the answer?" />)

            </FormItem>
            {formItems}
            <FormItem>
                {/* <Button shape="dashed" onClick={this.add} style={{ width: "60%" }}> */}
                <Button shape="dashed" onClick={add} style={{ width: "60%" }} icon={<PlusCircleOutlined />}>
                    {/* <Icon type="plus" />*/}
                    {/* <Input prefix={<PlusCircleOutlined 
                        // className="dynamic-delete-button" 
                        // style={{ color: "rgba(0,0,0,.25)"}} 
                        />} 
                        /> */}
                    Add an answer choice 
                </Button>
            </FormItem>
        </Hoc>
    );
    // }
}

// export default QuestionForm;
