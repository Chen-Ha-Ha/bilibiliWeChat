//使用import这个关键字来导入config这个变量
import {config} from '../config.js'


// 封装方法=》接收服务器返回来给我们的数据
const tips = {
  1:'抱歉，出现了一个错误',
  1005:'appkey无效，请前往www.7yue.pro申请',
  3000:'期刊不存在'
}
class HTTP{
  request(params){
    //url,data,method
    if(!params.method){
      params.method='GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method:params.method,
      data:params.data,
      header:{
        'content-type':'application/json',
        'appkey': config.appKey
      },
      success:(res)=>{
        //startsWith  endsWith
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          params.success && params.success(res.data);
        }else{//服务器异常
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail:(err)=>{//API调用失败
        this._show_error(1);
      }
    })
  }

  _show_error(error_code){
    if(!error_code){
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}