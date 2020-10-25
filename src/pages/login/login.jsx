import React from "react";
import './login.less'
import logo from "../../assets/images/Shopify.png";
import Cookies from "js-cookie";
import { Form, Input, message, Button, Checkbox, Modal } from 'antd';
import PubSub from 'pubsub-js'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from "../../api/index";
import RegisterComponent from "../../components/register/register";
import ReactSimpleVerify from 'react-simple-verify'
import 'react-simple-verify/dist/react-simple-verify.css'
import ForgetPwdComponent from "../../components/forgetpwd/forgetpwd";
import { memoryUtils } from "../../utils/memoryUtils";
import  storageUtils  from "../../utils/storageUtils";
import { Redirect } from "react-router-dom";
//登录的组件
export default class LoginPage extends React.Component {
    constructor() {
        super()
        this.validData = null
        //是否记住密码
        this.isRemPwd = false
        this.timer=null
        this.state = {
            isShowModal: false,
            moveConf: false
        }
    }

    //表单提交回调
    loginSubmit = (values) => {
        PubSub.unsubscribe("showRegisterComponent")
        if (values.username.indexOf(" ") > -1 || values.username.length < 6 || values.username.length > 12) {
            message.warning("用户名输入有误!")
            return
        }
        if (values.password.indexOf(" ") > -1 || values.password.length < 8 || values.password.length > 16) {
            message.warning("密码输入有误!")
            return
        }
        //弹出验证码框验证，防止恶意行为
        this.setState({
            isShowModal: true,
        })
        this.validData = values
    }
    //注册的事件实现
    handleRegister = () => {
        PubSub.publish('showRegisterComponent', true)

    }
    //滑块验证成功的事件
    confSuccess = () => {
        this.setState({
            moveConf: true
        })
    }
    handleOk = async () => {
        if (!this.state.moveConf) {
            message.warning("请将滑块拖动到最右边进行验证，再登录!")
            return
        }
        //登录
        this.setState({
            isShowModal:false
        })
        const result = await reqLogin(this.validData)
        if (result.code === 200) {
            //是否记住密码
            if (this.isRemPwd) {
                Cookies.set('userName', this.validData.username, { expires: 30, path: '' });
                Cookies.set('password', this.validData.password, { expires: 30, path: '' });
            }
            memoryUtils.user=result.data
            storageUtils.saveUser(result.data)//永久保存
            message.success("登录成功,即将进入主页!")
            this.timer= setTimeout(()=>{
                //不用push,不需要回退
                this.props.history.replace('/')
            },2000)
        }

    }
    //记住密码
    handleRemPwd = (e) => {
        this.isRemPwd = e.target.checked
    }
    //忘记密码
    forgetPwd=()=>{
        PubSub.publish('forgetPwdComponent', true)
    }
    handleCancel = () => {
        this.setState({
            isShowModal: false,
            moveConf: false
        })
    }
    componentWillUnmount=()=>{
        clearTimeout(this.timer)
    }
    render() {
        //判断用户是否登录，如果已经登录过，则直接跳转到admin
        const user=memoryUtils.user
        if(user&&user._id){
              return <Redirect to='/'/>
        }
        const { isShowModal } = this.state
        return (
            <div className="login">
                {isShowModal ? (<Modal
                    title="验证框验证"
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <ReactSimpleVerify movedColor="orange" width={400} success={this.confSuccess} />
                </Modal>) : null}

                <RegisterComponent />
                <ForgetPwdComponent />

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
                                <Checkbox onChange={this.handleRemPwd} className="remember_style">记住密码</Checkbox>
                                <a onClick={this.forgetPwd} className="pwd_style">忘记密码</a>
                            </Form.Item>

                            <Form.Item>
                                <Button onClick={this.handleRegister} type="default" className="register-form-button">
                                    注册
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
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
