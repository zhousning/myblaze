const config = require('../libs/config.js')

Component({
  data: {
    day_rpts: []
  },

  pageLifetimes: {
    show() {
      wx.showLoading({
        title: '数据加载中',
      })
      var openid = wx.getStorageSync('openid');
      var url = config.routes.host + '/day_pdts/verify_index';
      if (!openid) {
        wx.redirectTo({
          url: '../pages/login/login'
        })
        return;
      }
      var that = this;
      wx.request({
        url: url,
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        data: {
          openid: openid
        },
        success: function (res) {
          var objs = res.data.results;
          var day_rpts = [];
          for (var i = 0; i < objs.length; i++) {
            day_rpts.push({
              url: '/pages/day_rpt/day_rpt?fct=' + objs[i].fct + '&day_pdt=' + objs[i].day_pdt + '&state=' + objs[i].state + '&jd=' + objs[i].jd,
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