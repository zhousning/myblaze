const appUtils = require('./libs/app-utils.js')
const config = require('./libs/config.js')

App({
  onLaunch: function () {},
  globalData: {
    userInfo: null
  },
  createShareMessage: function () {
    var message = {
      title: '山东公用水务集团生产运营智能平台',
      imageUrl: './images/swjtlogo.png',
      path: 'index/index'
    }
    return message;
  }
})