const config = require('../libs/config.js');
const app = getApp();
Component({
  data: {
    factories: null,
    fct: null,
    index: 0,
    date: null,
    day_rpts: null
  },
  methods: {
    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value,
        fct: this.data.factories[e.detail.value].id
      })
      var fct = this.data.fct
      var date = this.data.date
      var user = wx.getStorageSync('user');
      var openid = user.openid;
    },
    bindDateChange: function(e) {
      var that = this;
      that.setData({
        date: e.detail.value
      })
      wx.showLoading({
        title: '数据加载中',
      })
      var user = wx.getStorageSync('user');
      var openid = user.openid;
      var date = this.data.date
      wx.request({
        url: config.routes.host + '/day_pdt_rpts/query',
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        data: {
          openid: openid,
          date: date
        },
        success: function (res) {
          var objs = res.data.results;
          var day_rpts = [];
          for (var i = 0; i < objs.length; i++) {
            day_rpts.push({
              url: '/pages/day_rpt/day_rpt?fct=' + objs[i].fct + '&day_pdt=' + objs[i].day_pdt + '&jd=' + user.jd,
              factory: objs[i].name
            })
          }
          that.setData({
            day_rpts: day_rpts
          })
          wx.hideLoading();
        },
      })
    },
  },

  lifetimes: {
    attached: function() {
      var that = this;

      wx.request({
        url: config.routes.host + '/factories',
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var obj = res.data.result;
          that.setData({
            factories: obj.fcts,
            date: obj.date
          })
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
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
 
      if (that.data.day_rpts) {
        wx.hideLoading();
        return;
      }

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