import React from "react";
import './register.less'
import md5 from "blueimp-md5";
import PubSub from 'pubsub-js'
import { Form, Input, message, Button, Drawer, Row, Col } from 'antd';
import { reqGetConfCode, reqRegister } from "../../api/index";
import { UserOutlined, LockOutlined, RestOutlined, PhoneOutlined, VerifiedOutlined } from '@ant-design/icons';

//登录的组件
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
export default class RegisterComponent extends React.Component {
    formRef = React.createRef();
    constructor() {
        super()
        this.md5Code = ''
        this.timeControl = null
        this.timeNum = 60
        this.state = ({
            visible: false,
            confCodeBtn: "获取验证码"
        })
    }
    componentDidMount=()=>{
        PubSub.subscribe('showRegisterComponent', (data)=>(this.setState({
            visible:data
        })))
    }
    componentWillUnmount=()=>{
        PubSub.unsubscribe('showRegisterComponent');
    }
    onClose = () => {
        this.setState({
            visible: false
        })
    }
    //重置输入
    getReset = () => {
        this.formRef.current.resetFields();
    }
    RegisterSubmit = async (values) => {
        if (values.password !== values.confpassword) {
            message.warning("两次输入的密码不一致!")
            return
        }
        if (!this.md5Code || md5(values.confCode) !== this.md5Code) {
            message.warning("验证码不正确!")
            return
        }
        //注册
        const result = await reqRegister({
            password: values.password,
            username: values.username,
            email: values.email,
            phone: values.phone
        })
        if (result.code === 200) {
            message.success(result.data)
              //关闭抽屉
              this.setState({
                visible:false 
            })
        }
    }
    //获取验证码
    getConfCode = async () => {
        const phoneCode = this.formRef.current.getFieldValue('phone') ? this.formRef.current.getFieldValue('phone') : ''
        if (phoneCode.length !== 11) {
            message.warning("请输入正确的手机号!")
            return
        }
        //发送请求返回验证码
        const result = await reqGetConfCode({ phoneCode })
        console.log('result', result)
        if (result.code === 200) {
            this.md5Code = result.data
            this.timeControl = setInterval(() => {
                this.timeNum--
                if (!this.timeNum) {//计数到0重置
                    clearInterval(this.timeControl)
                    this.setState({
                        confCodeBtn: "获取验证码"
                    })
                    this.timeNum = 60
                    this.md5Code = ''
                    return
                }
                this.setState({
                    confCodeBtn: this.timeNum.toString().length < 2 ? `0${this.timeNum}(s)` : `${this.timeNum}(s)`
                })
            }, 1000)
            message.success("短信已发送到您的手机,请在一分钟内输入并注册!")
        }
    }
    componentWillUnmount(){
        clearInterval(this.timeControl)
    }
    render() {
        const { visible, confCodeBtn } = this.state

        return (
            <div>
              {visible?(  <Drawer
                width="370"
                maskClosable={false}
                visible={true}
                onClose={this.onClose}
                title={<h3>用户注册</h3>}
                placement="right"
            >
                <Form
                    ref={this.formRef}
                    {...layout}
                    onFinish={this.RegisterSubmit}
                >
                    <Form.Item

                        label="用户名"
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名!' },
                            { type: "string", max: 12, message: '用户名最大12位!' },
                            { type: "string", min: 6, message: '用户名至少6位!' },

                        ]}
                    >
                        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item

                        label="密码"
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
                        <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                            placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        label="确认密码"
                        name="confpassword"
                        rules={[
                            { required: true, message: '请再次输入密码!' },
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
                        <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                            placeholder="请再次输入密码" />
                    </Form.Item>

                    <Form.Item label="邮箱" name="email" rules={[{ type: 'email' },
                    { required: true, message: '请输入邮箱!' },]}>
                        <Input prefix={<RestOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                            placeholder="请输入邮箱" />
                    </Form.Item>
                    <Form.Item label="手机号" name="phone"
                        rules={[
                            { required: true, message: '请输入手机号!' },
                            { len: 11, message: '请输入正确手机号' },
                        ]}>
                        <Input type="number" prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                            placeholder="请输入手机号" />

                    </Form.Item>
                    <Form.Item className="row-margin"
                        label="短信验证" name="confCode"
                        rules={[
                            { required: true, message: '请输入验证码!' },
                            { len: 4, message: '验证码为4位' },
                        ]}>
                        <Row >
                            <Col span={12}><Input type="number" prefix={<VerifiedOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                                placeholder="验证码" /> </Col>
                            <Col span={2}></Col>
                            <Col span={10}><Button type="primary" disabled={[60, 0, "获取验证码"].indexOf(confCodeBtn) > 0 ? false : true} onClick={this.getConfCode}>{confCodeBtn}</Button></Col>
                        </Row>

                    </Form.Item>
                    <div className="div-float"><Button className="btn-margin" type="primary" onClick={this.getReset}>重置</Button>
                        <Button htmlType="submit" type="primary" >注册</Button></div>
                </Form>

            </Drawer>):null}
            </div>
          
        )
    }
}