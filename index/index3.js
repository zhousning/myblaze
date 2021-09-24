// index/index3.js
const app = getApp();
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    username: null
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {

        this.setData({
          username: wx.getStorageSync('user').name
        })
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    logout() {
      var user = wx.getStorageSync('user')
      if (user) {
        wx.removeStorageSync('user');
        wx.redirectTo({
          url: '../pages/login/login'
        })
        return;
      }
    }
  }
})