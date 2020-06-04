import { HTTP } from '../util/http.js'
class ClassicModel extends HTTP{
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        //在success回调函数这里通过调用_setLatestIndex这个方法把我们的clssic下面的index传递进去，就完成了缓存的写入
        this._setLatestIndex(res.index);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res)
      }
    })
  }
  //定义一个回调函数作为参数,同时需要把当前期刊的index序号作为参数传递进来
  getPrevious(index,sCallback){
    //调用request来向服务器发送请求
    this.request({
      url:'/classic/'+index+'/previous',
      //第二个参数是success回调函数
      success: (res) => {
        sCallback(res)
        
      }
    })
  }

  getNext(index,sCallback){
    this.request({
      url:'/classic/'+index+'/next',
      success:(res)=>{
        sCallback(res)
      }
    })
  }

  getClssic(index,nextOrPrevious,sCallback){
    //缓存思路：当我们要去获取一个期刊的时候，我们首先应该到缓存中寻找，如果我们能找到，那么就从缓存中把这个期刊的数据读取出来。如果不能的话，那么我们就需要向服务器发送请求，然后获取到相关的期刊数据，同时，我们还要注意，从服务器加载来的数据还需要再次得写入到缓存中。
    //在开始编写缓存代码之前，有一个非常重要的事情是我们要确认的，就是我们所有的期刊它必须在缓存中是有一个key的，那么对于期刊数据，我们需要来确定这个key。很明显这个key不是固定不变的，因为期刊数据可能有很多，所以我们要设置一个key，这个key既可以代表它是一个期刊，同时它还需要能够表示出它是哪一期的期刊。
    let key = nextOrPrevious == 'next'?this._getKey(index+1):this._getKey(index-1);
    let classic = wx.getStorageSync(key);//去缓存中寻找
    console.log(classic);
    if(!classic){
      this.request({
        url: '/classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res);//写入缓存
          sCallback(res);
        }
      })
    }else{
      sCallback(classic)
    }
    
  }
  //判断当前期刊是不是第一个
  isFirst(index){
    return index == 1?true:false;
  }
  //判断当前期刊是不是最新一期
  isLatest(index){
    let latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false;
  }

  //在上面getLatest方法中，我们的success回调函数中是已经拿到了latestClassic的，所以下一步我们只需要把classic写入到缓存中就可以了
  //定义一个方法_setLatestIndex，接收一个参数index
  _setLatestIndex(index){
    //调用小程序的函数
    wx.setStorageSync('latest', index)
  }
  //定义一个方法把index读取出来
  _getLatestIndex(){
    let index = wx.getStorageSync('latest');
    return index;
  }

  //定义一个方法，产生key
  _getKey(index){
    let key = 'classic-'+index;
    return key;
  }
}
export {ClassicModel}
