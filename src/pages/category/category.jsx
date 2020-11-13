import React from "react";
import './category.less';
import { Card, Button, Table,Modal,message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { reqCategotyList,reqUpdateCategoty,reqAddCategoty} from "../../api/index";
import moment from "moment";
import AddCategoryPage from "./addcategory";
import UpdateCategoryPage  from "./updatecategory";
//首页的组件
export default class CategoryPage extends React.Component {
  constructor() {
    super()
    //得到修改的form对象
    this.updateFormData={}
    //得到添加form对象
    this.addFormData={}
    //当前选中的分类
    this.currentCategory={}
    //table页默认配置
    this.parentName = ''
    this.paginationProps = {
      showQuickJumper: true,
      responsive: true,
      hideOnSinglePage: true,
      pageSize: 8,
    };
    this.extra = (
      <Button type='primary' onClick={this.addCategoryModel}>  <PlusOutlined />添加</Button>
    )
    //默认是0，调用一级分类列表
    this.state = {
      category: [],
      subCategory: [],
      parentId: '0',
      showModel:0//初始化0，1和2分别显示不同的模态框
    }
    //初始化列的数组
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        width: 300,
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        width: 400,
        title: '操作',
        render: (category) => (<div>
          <Button type="link" onClick={()=>{this.updateCategoryModel(category)} }>修改分类</Button>
          {
            this.state.parentId === '0' ? <Button type="link" onClick={() => this.showSubCategory(category)}>查看子分类</Button> : null
          }
        </div>)
      },
    ]
  }
  updateCategoryModel=(category)=>{
    this.currentCategory=category
    this.setState({
      showModel:2
    })
  }
  addCategoryModel=()=>{
    this.setState({
      showModel:1
    })
  }
  //获取二级分类列表
  showSubCategory = (category) => {
    this.setState({
      parentId: category._id
    }, () => {
      this.parentName = category.name
      this.getCategory()
    })

  }
  getCategory = async (value) => {
    //获取一级分类列表
    const parentId=value||this.state.parentId
    const result = await reqCategotyList({parentId})
    if (result.code === 200) {
      //格式化时间
      result.data.forEach(x => {
        x.create_time = moment(x.create_time).format('YYYY-MM-DD hh:mm:ss')
      });
         
      if (this.state.parentId === '0'||value==='0') {
        this.setState({
          category: result.data
        })
      } else {
        this.setState({
          subCategory: result.data
        })
      }
    }
  }
  handleCancel=()=>{
    this.setState({
      showModel:0
    })
  }
 //添加分类
 addCategory= async()=>{
  const parentId= this.addFormData.current.getFieldValue('addCategory')
  const addCategoryName= this.addFormData.current.getFieldValue('categoryName')
  if(addCategoryName&&addCategoryName.trim().length>0&&addCategoryName.trim().length<=16){
    this.handleCancel()   
    const result=await reqAddCategoty({
      categoryName:addCategoryName,
      parentId:parentId
    })        
    if(result.code===200){
      message.success("分类修改成功!")  
      //在一级列表并且添加一级分类
      if(parentId===this.state.parentId&&parentId==='0'){
        this.getCategory()
      }
      //在二级列表并且添加的二级
      if(parentId===this.state.parentId&&parentId!=='0'){
        this.getCategory(parentId)
      }
      //在二级列表添加一级分类
      if(parentId==='0'&&this.state.parentId!=='0'){
        this.getCategory('0')
      }
      //在一级分类添加二级分类不用调用api

      //当调用成功后其重置表单
      this.addFormData.current.resetFields();
    }
  }
}
 //更新分类
 updateCategory= async()=>{
   const updateCategoryName= this.updateFormData.current.getFieldValue('updateCategory')
   if(updateCategoryName===this.currentCategory.name){
     message.warning("修改后的名称和之前的名称一致!")
     return
   }
   if(updateCategoryName&&updateCategoryName.trim().length>0&&updateCategoryName.trim().length<=16){
    this.handleCancel()
    //更新分类
      const result=await reqUpdateCategoty({
        categoryName:updateCategoryName,
        categoryId:this.currentCategory._id
      })
      if(result.code===200){
        message.success("分类修改成功")
         //重新显示列表
         this.getCategory()
         //当调用成功后其重置表单
         this.updateFormData.current.resetFields();
      }
   }
} 

  showParentData = () => {
    //显示一级列表数据
    this.parentName = ''
    this.setState({
      parentId: '0',
      subCategory: []
    })
  }
  componentDidMount = () => {
    this.getCategory()
  }
  render() {
    const updateTitle=`当前分类名称:${this.currentCategory.name}`
    const { parentId, category, subCategory,showModel } = this.state
    const title = parentId === '0' ? <Button type="link">一级分类菜单</Button> : (
      <span>
        <Button type="link" className="padding-right" onClick={this.showParentData}>一级分类菜单 /</Button>
        <Button type="link" className="padding-left">{this.parentName}</Button>
        <span></span>
      </span>
    )
    return (
      <div>
      <Card title={title} extra={this.extra}>
        <Table

          pagination={this.paginationProps}
          rowKey='_id'
          bordered
          dataSource={parentId === '0' ? category : subCategory}
          columns={this.columns}
        ></Table>
      </Card>
      <Modal
      maskClosable={false}
          title="添加分类"
          visible={showModel===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddCategoryPage category={category} parentId={parentId} getAddFormValue={(value=>{this.addFormData=value})}></AddCategoryPage>
        </Modal>
        <Modal
         maskClosable={false}
          title={updateTitle}
          visible={showModel===2}
           onOk={this.updateCategory}
           onCancel={this.handleCancel}
        >
           <UpdateCategoryPage getFormValue={(value)=>{this.updateFormData=value}}></UpdateCategoryPage>
        </Modal>
      </div>
      
    )
  }
}