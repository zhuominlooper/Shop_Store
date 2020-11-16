
import React, { Fragment } from "react";
import { menuList } from "../../../config/menuConfig";
import { Tree, Form, Input } from "antd";
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
const TreeNode = Tree.TreeNode
export default class SettingRolePage extends React.Component {
    constructor(props) {
        super(props)
        const { menus } = this.props.role//根据
        this.state = {
            checkedKeys: menus//保存选中的key
        }
    }
    getTreeNode = (menuList) => {
        return menuList.reduce((pre, next) => {
            pre.push(
                <TreeNode
                    disabled={next.disabled}
                    title={next.title === '首页' ? '首页 (默认选中)' : next.title}
                    key={next.key}
                >
                    {next.children ? this.getTreeNode(next.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    onCheck = (checkedKeys) => {//当前所用选中的key的数组
        this.setState({
            checkedKeys: [...checkedKeys]
        })
    }
    getCheckMenus=()=>{
        return this.state.checkedKeys
    }

    UNSAFE_componentWillReceiveProps=(nextProps)=>{
            this.setState({//由于在props的周期里，所以setstate不会重新render
                checkedKeys:nextProps.role.menus
            })
    }

    componentWillMount = () => {
        this.TreeNodeList = this.getTreeNode(menuList)
    }

    render() {
        const { role } = this.props
        const { checkedKeys } = this.state
        return <Fragment>
            <Form.Item
                label="角色名称"
            >
                <Input
                    disabled
                    value={role.role_name}
                    placeholder="请输入角色名称" />
            </Form.Item>
            <Tree
                onCheck={this.onCheck}
                checkedKeys={checkedKeys}
                defaultCheckedKeys={['/home']}
                checkable
                defaultExpandAll={true}
            >
                <TreeNode
               disableCheckbox={true}
                title='平台权限'
                key='auth'
                
                >
{this.TreeNodeList}
                </TreeNode>
                
            </Tree>
        </Fragment>
    }
}

