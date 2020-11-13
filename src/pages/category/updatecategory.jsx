import React from "react";
import { Form, Input, Select } from "antd";
//首页的组件
export default class UpdateCategoryPage extends React.Component {
    
    formRef = React.createRef();

    componentDidMount=()=>{
      this.props.getFormValue(this.formRef)
    }
    render() {
        return (
            <Form
                 ref={this.formRef}
            >
                <Form.Item
                    label="修改分类"
                    name="updateCategory"
                    rules={[
                        { required: true, message: '请输入分类名称!' },
                        { type: "string", max: 16, message: '名称最大16位!' },
                        { type: "string", min: 1, message: '名称至少1位!' },
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
                     onChange={this.getValue}
                     onPressEnter={this.getValue}
                     placeholder="请输入修改名称" />
                </Form.Item>
            </Form>
        )
    }

}