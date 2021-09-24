// pages/day_rpt/day_rpt.js
const config = require('../../libs/config.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fct: null,
    day_pdt: null,
    state: null,
    jd: null,
    cm_inf_cod: 0,
    cm_inf_bod: 0,
    cm_inf_nhn: 0,
    cm_inf_tn: 0,
    cm_inf_tp: 0,
    cm_inf_ss: 0,
    cm_inf_ph: 0,
    on_inf_cod: 0,
    on_inf_bod: 0,
    on_inf_nhn: 0,
    on_inf_tn: 0,
    on_inf_tp: 0,
    on_inf_ss: 0,
    on_inf_ph: 0,
    cm_eff_cod: 0,
    cm_eff_bod: 0,
    cm_eff_nhn: 0,
    cm_eff_tn: 0,
    cm_eff_tp: 0,
    cm_eff_ss: 0,
    cm_eff_ph: 0,
    on_eff_cod: 0,
    on_eff_bod: 0,
    on_eff_nhn: 0,
    on_eff_tn: 0,
    on_eff_tp: 0,
    on_eff_ss: 0,
    on_eff_ph: 0,
    cm_sed_cod: 0,
    cm_sed_bod: 0,
    cm_sed_nhn: 0,
    cm_sed_tn: 0,
    cm_sed_tp: 0,
    cm_sed_ss: 0,
    cm_sed_ph: 0,
    inflow: 0,
    outflow: 0,
    power: 0,
    inmud: 0,
    outmud: 0,
    mst: 0,
    md: 0,
    mdrcy: 0,
    mdsell: 0,
    chemicals: [],
    tspmuds: [],
    desc: ''
  },

  /**
   * 生命周期函数--监听页面加载,初始化参数
   */
  onLoad: function (options) {
    this.setData({
      fct: options.fct,
      day_pdt: options.day_pdt,
      jd: options.jd
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
    var that = this;
    var user = wx.getStorageSync('user');
    var openid = user.openid;
    var fct = that.data.fct;
    var day_pdt = that.data.day_pdt;
    var url = '';
    if (app.globalData.fct_role.indexOf(user.jd) != -1) {
      url = config.routes.host + '/factories/' + fct + '/day_pdts/' + day_pdt + '/verify_show';
    } else if (app.globalData.fct_role.indexOf(user.jd) != -1 || app.globalData.grp_role.indexOf(user.jd) != -1) {
      url = config.routes.host + '/factories/' + fct + '/day_pdt_rpts/' + day_pdt
    }

    wx.showLoading({
      title: '数据加载中',
    })
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
        var obj = res.data.results;
        that.setData({
          state: obj.state,
          cm_inf_cod:  obj.cm_inf_cod,
          cm_inf_bod:  obj.cm_inf_bod,
          cm_inf_nhn:  obj.cm_inf_nhn,
          cm_inf_tn:  obj.cm_inf_tn,
          cm_inf_tp:  obj.cm_inf_tp,
          cm_inf_ss:  obj.cm_inf_ss,
          cm_inf_ph:  obj.cm_inf_ph,
          on_inf_cod:  obj.on_inf_cod,
          on_inf_nhn:  obj.on_inf_nhn,
          on_inf_tn:  obj.on_inf_tn,
          on_inf_tp:  obj.on_inf_tp,
          cm_eff_cod:  obj.cm_eff_cod,
          cm_eff_bod:  obj.cm_eff_bod,
          cm_eff_nhn:  obj.cm_eff_nhn,
          cm_eff_tn:  obj.cm_eff_tn,
          cm_eff_tp:  obj.cm_eff_tp,
          cm_eff_ss:  obj.cm_eff_ss,
          cm_eff_ph:  obj.cm_eff_ph,
          on_eff_cod:  obj.on_eff_cod,
          on_eff_nhn:  obj.on_eff_nhn,
          on_eff_tn:  obj.on_eff_tn,
          on_eff_tp:  obj.on_eff_tp,
          cm_sed_cod:  obj.cm_sed_cod,
          cm_sed_bod:  obj.cm_sed_bod,
          cm_sed_nhn:  obj.cm_sed_nhn,
          cm_sed_tn:  obj.cm_sed_tn,
          cm_sed_tp:  obj.cm_sed_tp,
          cm_sed_ss:  obj.cm_sed_ss,
          cm_sed_ph:  obj.cm_sed_ph,
          inflow:  obj.inflow,
          outflow:  obj.outflow,
          power:  obj.power,
          inmud:  obj.inmud,
          outmud:  obj.outmud,
          mst:  obj.mst,
          md:  obj.md,
          mdrcy:  obj.mdrcy,
          mdsell:  obj.mdsell,
          chemicals:  obj.chemicals,
          tspmuds:  obj.tspmuds,
          desc:  obj.desc
        })
        wx.hideLoading();
      },
      fail: function() {
        wx.hideLoading();
      }
    })
  },
  
  cmpVerifying: function () {
    var that = this;
    var user = wx.getStorageSync('user');
    var openid = user.openid;
    var fct = that.data.fct;
    var day_pdt = that.data.day_pdt;
    var url =  config.routes.host + '/factories/' + fct + '/day_pdts/' + day_pdt + '/cmp_verifying';
    
    wx.showModal({
      title: '确认提交审核？',
      content: '',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '系统处理中',
          })
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
              var obj = res.data.result;
              if (obj.status == 'success'){
                that.setData({
                  state: obj.state
                })
                wx.hideLoading();
              } else if (obj.status == 'fail') {
                wx.hideLoading();
              }
              
            },
            fail: function() {
              wx.hideLoading();
            }
          })
        }
      }
    })

  },

  upreport: function () {
    var that = this;
    var user = wx.getStorageSync('user');
    var openid = user.openid;
    var fct = that.data.fct;
    var day_pdt = that.data.day_pdt;
    var url =  config.routes.host + '/factories/' + fct + '/day_pdts/' + day_pdt + '/upreport';
 
    wx.showModal({
      title: '确认上报水务集团？',
      content: '上报后不能修改',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '系统处理中',
          })
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
              var obj = res.data.result;
              if (obj.status == 'success'){
                that.setData({
                  state: obj.state
                })
                wx.hideLoading();
              } else if (obj.status == 'fail') {
                wx.hideLoading();
              }
              
            },
            fail: function() {
              wx.hideLoading();
            }
          })
        }
      }
    })

  },

  rejected: function () {
    var that = this;
    var user = wx.getStorageSync('user');
    var openid = user.openid;
    var fct = that.data.fct;
    var day_pdt = that.data.day_pdt;
    var url =  config.routes.host + '/factories/' + fct + '/day_pdts/' + day_pdt + '/rejected';
    
    wx.showModal({
      title: '确认驳回？',
      content: '',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '系统处理中',
          })
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
              var obj = res.data.result;
              if (obj.status == 'success'){
                that.setData({
                  state: obj.state
                })
                wx.hideLoading();
              } else if (obj.status == 'fail') {
                wx.hideLoading();
              } 
            },
            fail: function() {
              wx.hideLoading();
            }
          })
        }
      }
    })


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