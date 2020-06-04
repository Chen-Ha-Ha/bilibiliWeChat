// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'//导入classicBeh

//如果要播放音乐，我们首先要拿到背景音乐管理对象。wx.getBackgroundAudioManager()这个方法可以返回我们要的音乐管理对象。
//定义一个变量mMgr,然后调用wx.getBackgroundAudioManager()这个方法
const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc:"images/player@waitting.png",
    playSrc:"images/player@playing.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      //图片要切换
      //通过调用mMgr的相关属性和方法来完成播放音乐的控制
      let playing = this.data.playing;
      if (!playing) {
        this.setData({
          playing: !playing
        })
        mMgr.src = this.properties.src;
        mMgr.title = '不会错了'
      }else{
        
      }
      
      
      console.log(playing)
      console.log(this.properties.src)
      
    }
  }
})
