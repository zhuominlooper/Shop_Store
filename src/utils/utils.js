import moment from "moment";


//格式化时间戳
export  function dateFormat(date){
    if(!date){
        return ''
    }
    return moment(date).format('YYYY-MM-DD hh:mm:ss')
}