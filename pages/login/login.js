const config = require('../../libs/config.js')
const app = getApp()

Page({
  data: {
    username: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function () {
    /*wx.navigateTo({
      url: '../logs/logs'
    })*/
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    wx.hideTabBar({})
  },

  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录处理
  login: function () {
    var that = this;
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '正在登录...',
      })
      wx.request({
        url: config.routes.getUserId,
        method: 'post',
        data: {
          username: that.data.username,
          password: that.data.password
        },
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var openid = res.data.openid
          var name = res.data.user_name
          var jd = res.data.jd
          wx.hideLoading();
          if (openid) {
            var user = {
              openid: openid,
              name: name,
              jd: jd
            }
            wx.setStorageSync('user', user);
            wx.switchTab({
              url: '/index/index'
            })
          } else {
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({
            title: '登录失败,请重新登录',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
})