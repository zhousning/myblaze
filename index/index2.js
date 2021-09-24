const config = require('../libs/config.js')
const app = getApp();

Component({
  data: {
    mth_pdt_rpts: []
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
      var url = '';
      if (app.globalData.fct_role.indexOf(user.jd) != -1) {
        url = config.routes.host + '/mth_pdt_rpts/verify_index';
      } else if (app.globalData.fct_role.indexOf(user.jd) != -1 || app.globalData.grp_role.indexOf(user.jd) != -1) {
        url = config.routes.host + '/mth_pdt_rpts';
      }
      var that = this;
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
          var mth_pdt_rpts = [];
          for (var i = 0; i < objs.length; i++) {
            mth_pdt_rpts.push({
              url: '/pages/mth_pdt_rpt/mth_pdt_rpt?fct=' + objs[i].fct + '&mth_pdt_rpt=' + objs[i].mth_pdt_rpt + '&jd=' + user.jd,
              factory: objs[i].name,
              state: objs[i].state
            })
          }
          that.setData({
            mth_pdt_rpts: mth_pdt_rpts
          })
          wx.hideLoading();
        },
        fail: function () {
          wx.hideLoading();
        }
      })

      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
})