
import React,{Fragment} from "react";
import { Modal,Form ,Input} from "antd";
export default class AddRolePage extends React.Component{
constructor(){
    super()
this.formRef=React.createRef()
}
componentDidMount=()=>{
   this.props.getFormValue(this.formRef)
}

render(){
    return<Form
            ref={this.formRef}
            >
                <Form.Item
                    label="角色名称"
                    name="role_name"
                    rules={[
                        { required: true, message: '请输入角色名称!' },
                        { type: "string", max: 6, message: '名称最大6位!' },
                        { type: "string", min: 2, message: '名称至少2位!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value && value.indexOf(" ") > -1) {
                                    return Promise.reject('不能输入空格');
                                }
                                else {
                                    return Promise.resolve('');
                                }
                            },
                        }),
                    ]}
                >
                    <Input
                        placeholder="请输入角色名称" />
                </Form.Item>
            </Form>
}

}