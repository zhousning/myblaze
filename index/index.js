const config = require('../libs/config.js');
const app = getApp();
Component({
  data: {
    day_rpts: []
  },

  pageLifetimes: {
    show() {
      wx.showLoading({
        title: '数据加载中',
      })
      var user = wx.getStorageSync('user');
      if (!user) {
        wx.redirectTo({
          url: '../pages/login/login'
        })
        return;
      }
      var that = this;
      var url = '';
      if (app.globalData.fct_role.indexOf(user.jd) != -1) {
        url = config.routes.host + '/day_pdts/verify_index';
      } else if (app.globalData.fct_role.indexOf(user.jd) != -1 || app.globalData.grp_role.indexOf(user.jd) != -1) {
        url = config.routes.host + '/day_pdt_rpts';
      }
      wx.request({
        url: url,
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        data: {
          openid: user.openid
        },
        success: function (res) {
          var objs = res.data.results;
          var day_rpts = [];
          for (var i = 0; i < objs.length; i++) {
            day_rpts.push({
              url: '/pages/day_rpt/day_rpt?fct=' + objs[i].fct + '&day_pdt=' + objs[i].day_pdt + '&jd=' + user.jd,
              factory: objs[i].name,
              state: objs[i].state
            })
          }
          that.setData({
            day_rpts: day_rpts
          })
          wx.hideLoading();
        },
        fail: function () {
          wx.hideLoading();
        }
      })

      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})