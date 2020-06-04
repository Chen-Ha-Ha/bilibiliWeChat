import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    first:false, //是不是第一期
    latest:true, //是不是最新一期
    likeCount: 0,//点赞次数
    likeStatus:false//喜欢的状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //数据更新
    classicModel.getLatest((res)=>{
      // console.log(res)
      //this._getLikeStatus(res.id,res.type);
      this.setData({
        classic:res,//数据绑定
        likeCount: res.fav_nums,
        likeStatus: res.like_status,
      })
      console.log(this.data)
    })

    //把onLoad的函数中获取的classic称作latestClassic,latestClassic中的index就是latestIndex
    //而每当我们点击onPrevious的时候，加载的classic称作currentClassic,我们只需要去比对currentIndex是否等于latestIndex，就知道当前的current是否是最新一期的期刊

    // http.request({
    //   url:'classic/latest',
    //   success:(res)=>{
    //     console.log(res)
    //   }
    // })


    // wx.request({
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
    //   header:{
    //     appKey:'RdshydjBvcYZhMZC'
    //   },
    //   //使用回调函数来接收异步调用的结果
    //   success:(res)=>{ //ES6箭头函数方式
    //     console.log(res);
    //   }
    // })
  },

  onLike:function(event){
    console.log(event);
    let behavior = event.detail.behavior;
    console.log(behavior);
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  
  onNext:function(event){
    // let index = this.data.classic.index;
    // classicModel.getNext(index,(res)=>{
    //   console.log(res);
    //   this.setData({
    //     classic:res,
    //     latest: classicModel.isLatest(res.index),
    //     first: classicModel.isFirst(res.index)
    //   })
    //   console.log('onNext是不是第一期' + this.data.first);
    //   console.log('onNext是不是最新一期' + this.data.latest);
    // })
    this._updateClassic('next');
  },
  onPrevious: function (event) {
    // let index = this.data.classic.index;
    //在监听函数中，调用classicModel下面的getPrevious这个方法，这个方法接收两个参数:index和回调函数（用箭头函数来实现）
    // classicModel.getPrevious(index,(res)=>{
    //   console.log(res);
    //   this.setData({
    //     classic:res,
    //     latest:classicModel.isLatest(res.index),
    //     first:classicModel.isFirst(res.index)
    //   })
    //   console.log('onPrevious是不是第一期' + this.data.first);
    //   console.log('onPrevious是不是最新一期' + this.data.latest);
    // })
    this._updateClassic('previous');
    
  },

  _updateClassic: function (nextOrPrevious){
    let index = this.data.classic.index;
    console.log('点前的index:' +index);
    classicModel.getClssic(index,nextOrPrevious,(res)=>{
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic:res,
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
      console.log('点击之后的index:'+this.data.classic.index);
    })
  },
  
  _getLikeStatus: function (artID, category) {//这个私有的方法接收两个参数
    likeModel.getClassicLikeStatus(artID, category,(res)=>{
      //在这个箭头函数中，我们已经拿到了要更新like组件的相关数据，所以我们要调用this.setData来做数据更新
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})