import React from "react";
import { EditorState,convertToRaw ,ContentState} from "draft-js";
import { Button,message } from "antd";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//商品详情的富文本编辑器
export default class RichTextEditPage extends React.Component {
     constructor(props){
         super(props)
         const html = this.props.detail ||''
         if(html){
             const contentBlock=htmlToDraft(html)
             const contentState=ContentState.createFromBlockArray(contentBlock.contentBlocks)
             const editorState=EditorState.createWithContent(contentState)
             this.state={
                editorState
             }
         }else{
            this.state={
                editorState:EditorState.createEmpty(),
             }
         }
        

     }
       //返回富文本编辑器的html格式的字符
      getDetail=()=>{
        const {editorState}=this.state
          return draftToHtml(convertToRaw(editorState.getCurrentContent()))
      }

     onEditorStateChange=(editorState)=>{
            this.setState({
                editorState
            })
     }
     uploadImageCallback=(file)=> {
        return new Promise(     
          (resolve, reject) => {
            let formData = new FormData()
            formData.append('image', file)
            let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo')) || {}
            fetch('/manage/img/upload', {
              method: 'POST',
              body: formData,
            }).then(res => {
              return res.json()
            }).then(res => {
              if (res.code !==200) {
                message.error('图片上传失败')
                reject(res)
              } else {
                message.success('图片上传成功')
                resolve({data: {link: res.data.url}})
              }             
            }).catch(err => {
              reject(err)
            })
          }
        )
        }

    render(){
        const {editorState}=this.state
      return(
          <div><Editor
          editorState={editorState}
          editorStyle={{border:'1px solid grey',minHeight:'180px',maxHeight:'360px', paddingLeft:'8px',marginTop:'8px'}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
              image:{uploadCallback:this.uploadImageCallback,alt:{present:true,mandatory:true}},
          }}
        />
        </div>
      )
    }

}