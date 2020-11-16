import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PubSub from 'pubsub-js'
import  storageUtils  from "./utils/storageUtils";
import  {memoryUtils}  from "./utils/memoryUtils";

//初始化时候去读取localstorage的user信息，保存在内存中
memoryUtils.user=storageUtils.getUser()
ReactDOM.render(
 <App/>
,
  document.getElementById('root')
);

var mySubscriber = function (msg, data) {
  console.log(data)
   switch(data){
     case "show":
      window.$('#myModal').modal('show'); break;
      case "hide":
      window.$('#myModal').modal('hide'); break ;
      default:break
   }

};

// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
 PubSub.subscribe('Loading', mySubscriber);

