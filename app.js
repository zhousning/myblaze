const appUtils = require('./libs/app-utils.js')
const config = require('./libs/config.js')

App({
  onLaunch: function () {

  },
  globalData: {
    fct_role: [0, 1, 2],
    fct_leader_role: [3],
    grp_role: [4]
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