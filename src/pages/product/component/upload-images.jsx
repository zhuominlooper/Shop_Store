import React from "react";
import { Upload, message, Modal } from 'antd';
import { reqDeleteImg } from "../../../api/index";
import { PlusOutlined } from '@ant-design/icons';
//用于上传图片或删除图片的处理
export default class UploadImagesPage extends React.Component {
    constructor(props) {
        super(props)
        const { imgs } = this.props || []
        let fileList = []
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((x, index) => ({
                uid: -index,
                name: x.name,
                status: 'done',
                url:x.url
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList
        };

    }
    
    getImgs = () => {
        return this.state.fileList.map(x=>{
            return{
                name:x.name,
                url:x.url
            }
        })
    }
    handleCancel = () => this.setState({ previewVisible: false });//图片删除
    handlePreview = async file => {//图片预览
        this.setState({
            previewImage: file.url,
            previewVisible: true,
            previewTitle: file.name
        });
    };

    handleChange = async ({ file, fileList }) => {//图片上传
        //此方法监视上传的过程，很调用多次，直到status为done     
        //上传成功
        if (file.status === 'done') {
            const result = file.response
            if (result.code === 200) {
                message.success("图片上传成功")
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error("图片上传失败")
            }
        } else if (file.status === 'removed') {//删除图片
            const result = await reqDeleteImg({ name: file.name })
            if (result.code == 200) {
                message.success('图片删除成功!')
            }
        }

        //更新显示list(上传或者删除)
        this.setState({
            fileList
        })
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload" /*上传的接口*/
                    accept="image/*" /*格式 */
                    listType="picture-card" /*默认显示图片预览 */
                    name="image" /*请求参数名 */
                    fileList={fileList} /**已上传的文件列表 */
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="上传图片" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}