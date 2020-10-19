import React from "react";
import './login.less'
import logo from "../../assets/images/Shopify.png";
import { Form, Input, message, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from "../../api/index";

//登录的组件

export default class LoginPage extends React.Component {

    //表单提交回调
    loginSubmit = async (values) => {
        console.log(values)
        if (values.username.indexOf(" ") > -1 || values.username.length < 6 || values.username.length > 12) {
            message.warning("用户名输入有误!")
            return
        }
        if (values.password.indexOf(" ") > -1 || values.password.length < 8 || values.password.length > 16) {
            message.warning("密码输入有误!")
            return
        }
        //登录
        const result=await  reqLogin(values)
        console.log('result',result)
    }

    render() {
        return (
            <div className="login">
                <header className="header">
                    <img src={logo} alt="shop" />
                    <h1>REACT项目:商品管理平台</h1>
                </header>
                <section className="content">
                    <h2>用户登录</h2>
                    <div>
                        <Form
                            onFinish={this.loginSubmit}
                        >
                            <Form.Item
                                className="from-algin"
                                name="username"
                                rules={[
                                    { required: true, message: '请输入用户名!' },
                                    { type: "string", max: 12, message: '用户名最大12位!' },
                                    { type: "string", min: 6, message: '用户名至少6位!' },

                                ]}
                            >
                                <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                className="from-algin"
                                name="password"
                                rules={[
                                    { required: true, message: '请输入密码!' },
                                    { type: "string", max: 16, message: '密码最大16位!' },
                                    { type: "string", min: 8, message: '密码至少8位!' },
                                    { pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/, message: '密码必须包含字符和数字' },
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
                                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item
                                className="from-algin"
                            >
                                <Checkbox className="remember_style">记住密码</Checkbox>
                                <a className="pwd_style">忘记密码</a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="default" className="register-form-button">
                                    注册
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button   type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>

        )
    }

}
