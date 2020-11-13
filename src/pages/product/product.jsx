import React from "react";
import moment from "moment";
import './product.less';
import { Card, Select, Input, Button, Table, message,Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { reqProducts, reqSearchProducts,reqUpdateStatus } from "../../api/index";
import { PAGE_SIZE } from "../../utils/constants";

//商品管理
const Option = Select.Option
export default class ProductPage extends React.Component {
  constructor() {
    super()
    this.state = {
      products: [],
      searchName: '',//查询的关键字
      searchType: 'productName'
    }
    this.extra = (
      <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
        <PlusOutlined />
        添加商品
      </Button>
    )
  }
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        width: 180,
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (price) => {
          return `$ ${price}`
        }
      },
      {
        title: '状态',
        render: (product) => {
          const {status,_id}=product
          return (
            <span>
              <Button style={{marginRight:'16px'}} onClick={()=>this.updateStatus(status,_id) } type={status===1?"primary":"Default"}>{status===1?"下架":"上架"}</Button>
              <span>{status===1? <Tag color="green">正在售</Tag>: <Tag color="red">已下架</Tag>}</span>
            </span>
          )
        }
      },
      {
        width: 180,
        title: '操作',
        render: (product) => (
          <span>
            {/* 把product通过路由传到了目标组件 */}
            <Button type='link' onClick={()=>this.props.history.push('/product/detail',product)}>详情</Button>
            <Button type='link'onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</Button>
          </span>

        )
      },
    ]
  }

  updateStatus=async(status,productId)=>{
    debugger
    status=status===1?2:1
    const result=await reqUpdateStatus({status,productId})
       if(result.code===200){
         if(status===1){
          message.success('商品上架成功!')
         }else{
          message.success('商品下架成功!')
         }
         this.getProducts( this.currentPageNum)
       }
  }

  getProducts = async (pageNum) => {
    this.currentPageNum=pageNum//保存选中页
    let result
    //如果有值则进行search查询
    if (this.state.searchName) {
      const { searchName, searchType } = this.state
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName: searchName ? searchName.trim() : '',
        searchType
      })
    } else {
      result = await reqProducts({
        pageNum,
        pageSize: PAGE_SIZE
      })
    }
    if (result.code === 200) {

      const { total, products } = result.data
      products.forEach(x => {
        x.create_time= moment( x.create_time).format('YYYY-MM-DD hh:mm:ss')
      });
      this.setState({
        total,
        products
      })
      if (products.length < 1) {
        message.warning('查询出的商品为空!')
      }
    }

  }
  componentWillMount = () => {
    this.initColumns()
  }
  componentDidMount = () => {
    //默认查询第一页数据
    this.getProducts(1)
  }
  render() {
    const { products, total, searchName, searchType } = this.state
    this.title = (
      <span>
        <Select value={searchType} className='select' onChange={searchType => this.setState({ searchType })}>
          <Option value='productName'>按名称查询</Option>
          <Option value='productType'>按描述查询</Option>
        </Select>
        <Input className='input' value={searchName} placeholder="关键字" onChange={e => this.setState({ searchName: e.target.value })} />
        <Button type='primary' onClick={() => { this.getProducts(1) }}>查询</Button>
      </span>
    )
    return (
      <Card title={this.title} extra={this.extra}>

        <Table
          pagination={{
            showQuickJumper: true,
            responsive: true,
            hideOnSinglePage: true,
            pageSize: PAGE_SIZE,
            total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: this.getProducts
          }}
          bordered
          rowKey='_id'
          dataSource={products}
          columns={this.columns}
        />
      </Card>
    )
  }

}