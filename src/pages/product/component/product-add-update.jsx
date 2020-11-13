import React from "react";
import { Card, Cascader, Input, Button, InputNumber, Upload, Tag, Form, message } from "antd";
import { reqCategotyList ,reqAddOrUpdateProduct} from "../../../api/index";
import   UploadImagesPage from "./upload-images";
import logo from "../../../assets/images/arrow-left.png";
import RichTextEditPage from "./rich-text-edit";
const { TextArea } = Input
const { Item } = Form
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
};
//商品添加和更新的组件
export default class ProductHandlePage extends React.Component {
  constructor() {
    super()
     this.imgRef=React.createRef()  //保存img组件的实例
     this.richEditRef=React.createRef()  //保存富文本组件的实例
    this.state = {
      options: []
    };
  }

  formRef = React.createRef();
  onSubmit =async (values) => {
    //1.收集数据
    const {name,desc,price,category}=values
    let pCategoryId,categoryId
    if(category.length===1){//说明是一级分类
      pCategoryId='0'
      categoryId=category[0]
    }else{//二级分类
      pCategoryId=category[0]
      categoryId=category[1]
    }
    const imgs=this.imgRef.current.getImgs()
    if(imgs.length<1){
      message.warning('至少需要一张图片!')
      return
    }
    const detail=this.richEditRef.current.getDetail()
    if(detail.length<20){
      message.warning('至少需要一定的详情信息!')
      return
    }
    //组装数据
  const product={
    name,desc,price,imgs,detail,pCategoryId,categoryId
  }
  if(this.isUpdate){//如果是更新，则去取id
    product._id=this.product._id
  }
  //调用请求
  const result=await  reqAddOrUpdateProduct(product)
      if(result.code===200){
           message.success(`商品${this.isUpdate?"修改":'添加'}成功`)
      }
  
  }
  
  //获取一级或者二级分类列表
  getCategorys = async (parentId) => {
    const result = await reqCategotyList({ parentId })
    if (result.code === 200) {
      if (parentId === '0') {
        this.inintOptions(result.data)
      } else {
        return result.data
      }
    }
  }
  inintOptions = async (categorys) => {
    const options = categorys.map(x => ({
      value: x._id,
      label: x.name,
      isLeaf: false
    }))
    //如果是修改商品并且是二级分类商品，先加载二级分类
    if (this.isUpdate && this.product.pCategoryId !== '0') {
      const subCategory = await this.getCategorys(this.product.pCategoryId)
      //生成二级分类列表
      const childOptions = subCategory.map(x => ({
        value: x._id,
        label: x.name,
        isLeaf: false
      }))
      //找到一级分类
      const targetOption = options.find(x => x.value === this.product.pCategoryId)
      //绑定   
      targetOption.children = childOptions
    }
    this.setState({
      options: [...options]
    })
  }
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    //获取二级分类列表
    const subCategory = await this.getCategorys(targetOption.value)

    if (subCategory && subCategory.length > 0) {
      //生成二级列表的option
      const cOptions = subCategory.map(x => ({
        value: x._id,
        label: x.name,
        isLeaf: true
      }))
      targetOption.children = cOptions
    } else {
      targetOption.isLeaf = true
    }
    targetOption.loading = false;
    this.setState({
      options: [...this.state.options]
    })

  };
  onChange = (value, selectedOptions) => {
  };
  componentDidMount = () => {
    //初始化调用一级分类列表
    this.getCategorys('0')
  }
  componentWillMount = () => {
    //取出路由是否携带数据
    
    this.product = this.props.location.state || {}
    //保存一个更新标识
    this.isUpdate = this.product._id ? true : false
    this.title = (
      <div className='deteil-header'>
        <img src={logo}
          onClick={() => { this.props.history.goBack() }}
          alt=''
        ></img>
        <h3>{this.isUpdate ? '修改商品' : '添加商品'} </h3></div>)
  }
  render() {
    const { options } = this.state
    const { product, isUpdate } = this
    const categoryIds = []
    const { categoryId, pCategoryId,imgs,detail } = product
    //如果是修改
    if (isUpdate) {
      if (pCategoryId === '0') {//该商品是一级分类列表
        categoryIds.push(pCategoryId)
      } else {
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
      //  categoryIds
    }
    return (
      <Card title={this.title}>
        <Form
          onFinish={this.onSubmit}
          {...layout}
          ref={this.formRef}
        >
          <Item
            initialValue={product.name}
            label="商品名称"
            name="name"
            rules={[
              { required: true, message: '请输入商品名称!' },
              { type: "string", max: 12, message: '商品名称最大12位!' },
              { type: "string", min: 2, message: '商品名称至少2位!' },
            ]}
          >
            <Input placeholder="商品名称" />
          </Item>

          <Item
            initialValue={product.desc}
            label="商品描述"
            name="desc"
            rules={[
              { required: true, message: '请输入商品描述!' },
              { type: "string", max: 200, message: '商品描述最大200位!' },
              { type: "string", min: 2, message: '商品描述至少2位!' },
            ]}
          >
            <TextArea placeholder="商品描述" rows={3} />
          </Item>
          <Item
            initialValue={product.price}
            label="商品价格(元)"
            name="price"
            rules={[
              { required: true, message: '请输入商品价格!' },
            ]}
          >
            <InputNumber  placeholder="商品价格" className="inputnumber" min={0.01} max={99999999999.99} precision={2} />
          </Item>

          <Item
            label="商品分类"
            name="category"
            initialValue={categoryIds}
            rules={[
              { required: true, message: '请选择商品分类!' },
            ]}
          >
            <Cascader

              loadData={this.loadData}
              onChange={this.onChange}
              placeholder="请选择分类"
              options={options}
            >

            </Cascader>
          </Item>
          <Item
            label="商品图片"
          >
            <UploadImagesPage  ref={ this.imgRef} imgs={imgs}/>
          </Item>
          <Item
            label="商品详情"
             labelCol={{span:2}}
             wrapperCol={{span:20}} 
          >
           <RichTextEditPage ref={this.richEditRef} detail={detail}/>
          </Item>

          <Item  
          className="btn-center"        
         wrapperCol={{span:22}} 
          >
             <hr/>
            <Button  type="primary" htmlType="submit">
              保存
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}