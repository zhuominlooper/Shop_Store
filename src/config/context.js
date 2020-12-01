
//采用工厂模式初始化，保存一些数据
  const menuList=[
    {
        key:"/page/home",
        disabled:true,
        title:"首页",
        icon:''
    },
    {
        key:"/page/products",
        disabled:false,
        title:"商品",
        icon:'',
        children:[
            {
                key:"/page/category",
                disabled:false,
                title:"分类管理",
                icon:''
            },{
                key:"/page/product",
                disabled:false,
                title:"商品管理",
                icon:''
            },
        ]
    },
    {
        key:"/page/user",
        disabled:false,
        title:"用户管理",
        icon:''
    },
    {
        key:"/page/role",
        disabled:false,
        title:"角色管理",
        icon:''
    },
    {
        key:"/page/bi",
        disabled:false,
        title:"BI统计",
        icon:'',
        children:[
           {
                key:"/page/chart/line",
                disabled:false,
                title:"注册用户数据",
                icon:''
            },
            {
                key:"/page/chart/bar",
                disabled:false,
                title:"柱状图",
                icon:''
            },
            {
                key:"/page/chart/pie",
                disabled:false,
                title:"饼图",
                icon:''
            },
        ]
    }
]

//保存用户信息
  const memoryUtils={
     user:{}
}

export  let factoryContext={
    menuList,
    memoryUtils
}

