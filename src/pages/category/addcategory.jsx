import React from "react";
import { Form, Input, Select } from "antd";
//首页的组件
const Option = Select.Option

export default class AddCategoryPage extends React.Component {
    formRef = React.createRef();
    componentDidMount=()=>{
        this.props.getAddFormValue(this.formRef)
      }
    render() {
        const {category,parentId}=this.props
        return (
            <Form
            ref={this.formRef}
            >
                <Form.Item
                    initialValue={parentId}
                    label="所属分类"
                    name="addCategory"
                    rules={[
                        { required: true, }
                    ]}
                >
                    <Select >
                    <Option value='0'>一级分类</Option>
                        {
                       category.map((c,index)=><Option key={index+1} value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="分类名称"
                    name="categoryName"
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
                        placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        )
    }
}