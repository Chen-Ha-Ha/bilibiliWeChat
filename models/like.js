import { HTTP } from '../util/http.js'

//定义LikeModel这个类来继承HTTP
class LikeModel extends HTTP{
  //定义一个like方法
  like(behavior,artID,category){
    //调用request进行数据的提交
    let url = behavior == 'like' ? 'like' :'like/cancel';
    this.request({
      url:url,
      method:'POST',
      data:{
        art_id: artID,//点赞对象,例如你想对电影进行点赞，那这个参数就是电影的id号
        type: category//点赞类型分为四种：100 电影 200 音乐 300 句子 400 书籍
      }
    })
  }

  getClassicLikeStatus(artID, category,sCallback){
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success:sCallback
    })
  }
}
export {LikeModel}