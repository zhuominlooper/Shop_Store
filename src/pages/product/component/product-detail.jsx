import React from "react";
import { List, Card, Typography } from "antd";
import logo from "../../../assets/images/arrow-left.png";
import { reqCategory } from "../../../api/index";
//商品详情的组件
export default class ProductDteailPage extends React.Component {
  constructor() {
    super()
    this.state = {
      cnameOne: '',
      cNameTwo: ''
    }
  }
  componentDidMount = async () => {
    const { pCategoryId, categoryId } = this.props.location.state
    if (pCategoryId === '0') {//一级分类的商品
      const result = await reqCategory({ categoryId: pCategoryId })
      this.setState({
        cnameOne: result.name
      })
    }
    else {//二级分类的商品 
      const result = await Promise.all([reqCategory({ categoryId: pCategoryId }), reqCategory({ categoryId })])
      const cnameOne = result[0].data.name
      const cNameTwo = result[1].data.name
      this.setState({
        cnameOne,
        cNameTwo,
      })
    }
  }
  render() {
    const title = (
      <div className='deteil-header'>
        <img src={logo}
          onClick={() => { this.props.history.goBack() }}
          alt=''
        ></img>
        <h3>商品详情</h3></div>)
    const product = this.props.location.state
    const { cnameOne, cNameTwo } = this.state
    return (
      <Card
        title={title}
      >
        <List
        >
          <List.Item className='list-item'>
            <Typography.Text mark className='typography'>[商品名称]:</Typography.Text>

            {product.name}

          </List.Item>
          <List.Item className='list-item'>
            <Typography.Text mark className='typography'>[创建时间]:</Typography.Text>

            {product.create_time}

          </List.Item>
          <List.Item className='list-item'>
            <Typography.Text mark className='typography'>[商品描述]:</Typography.Text>

            {product.desc}

          </List.Item>
          <List.Item className='list-item'>
            <Typography.Text mark className='typography'>[商品价格]:</Typography.Text>
            {`${product.price}元`}
          </List.Item>
          <List.Item className='list-item'>
            <Typography.Text mark className='typography'>[商品分类]:</Typography.Text>

            {cnameOne} {cNameTwo ? `-->${cNameTwo}` : ''}
          </List.Item >
          <List.Item className='list-item'>
            <Typography.Text mark className='typography'>[商品图片]:</Typography.Text>
            {product.imgs.map((img, index) => {
              return (
                <img style={{width:'80px',height:'80px'}} key={index} src={img.url}  alt='商品图片'></img>
              )
            })}
          </List.Item>
          <List.Item className='list-item'>
            <Typography.Text mark className='typography'>[商品详情]:</Typography.Text>
            <span dangerouslySetInnerHTML={{ __html: product.detail }}>

            </span>
          </List.Item>
        </List>
      </Card>
    )
  }
}