import React  from "react";
import './404.less'
import txtLogo from '../../assets/images/txtbg404.png'
import headLogo from '../../assets/images/head404.png'
export default class UnFindPage extends React.Component {


    render() {
        return (
            <div className='div'>
               <div>
                   <img className='head-img' src={headLogo} alt=''/>
               </div>
               <div className='position-div'>
               <img  className='txt-img' src={txtLogo}  alt=''/>
                <div className='txt-div'>
                <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
                        <p className="paddingbox">请点击以下链接继续浏览网页</p>
                        <p>》》<a  style={{cursor:'pointer'}} >返回上一页面</a></p>
                        <p>》》<a >返回网页首页</a></p>
                        <p>》》<a >返回登录界面</a></p>
                </div>
               </div>     
            </div>

        )
    }
}