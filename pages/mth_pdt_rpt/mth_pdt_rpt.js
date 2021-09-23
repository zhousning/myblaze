// pages/mth_pdt_rpt/mth_pdt_rpt.js
const config = require('../../libs/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fct: null,
    mth_pdt_rpt: null,
    state: null,
    jd: null,
    state: null,
    outflow: null,  
    avg_outflow: null,
    end_outflow: null,
    inf: null,
    eff: null,
    emr: null,
    avg_emq: null,
    emq: null,
    end_emq: null,
    yoy: null,
    mom: null,
    md: null,
    mud: null,
    chemicals: null,
    power: null
  },

  /**
   * 生命周期函数--监听页面加载,初始化参数
   */
  onLoad: function (options) {
    this.setData({
      fct: options.fct,
      mth_pdt_rpt: options.mth_pdt_rpt,
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
    var openid = wx.getStorageSync('openid');
    var fct = this.data.fct;
    var mth_pdt_rpt = this.data.mth_pdt_rpt;
    //var url =  config.routes.host + 'factories/' + fct + '/mth_pdt_rpts/' + mth_pdt_rpt + '/cmp_verifying';
    var url =  config.routes.host + '/factories/' + fct + '/mth_pdt_rpts/' + mth_pdt_rpt + '/verify_show';
    
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
          outflow: obj.outflow,  
          avg_outflow: obj.avg_outflow,
          end_outflow: obj.end_outflow,
          inf: obj.inf,
          eff: obj.eff,
          emr: obj.emr,
          avg_emq: obj.avg_emq,
          emq: obj.emq,
          end_emq: obj.end_emq,
          yoy: obj.yoy,
          mom: obj.mom,
          md: obj.md,
          mud: obj.mud,
          chemicals: obj.chemicals,
          power: obj.power
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
    var openid = wx.getStorageSync('openid');
    var fct = this.data.fct;
    var mth_pdt_rpt = this.data.mth_pdt_rpt;
    var url =  config.routes.host + '/factories/' + fct + '/mth_pdt_rpts/' + mth_pdt_rpt + '/cmp_verifying';
    
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
    var openid = wx.getStorageSync('openid');
    var fct = this.data.fct;
    var mth_pdt_rpt = this.data.mth_pdt_rpt;
    var url =  config.routes.host + '/factories/' + fct + '/mth_pdt_rpts/' + mth_pdt_rpt + '/upreport';
 
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
    var openid = wx.getStorageSync('openid');
    var fct = this.data.fct;
    var mth_pdt_rpt = this.data.mth_pdt_rpt;
    var url =  config.routes.host + '/factories/' + fct + '/mth_pdt_rpts/' + mth_pdt_rpt + '/rejected';
    
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