//https://www.bafangjies.cn
//https://47.104.224.87/
var configs = {
  routes: {
    host: 'http://192.168.100.114:3000',
    getUserId: 'http://192.168.100.114:3000/wx_users/get_userid',
    getDayPdtRpt: 'https://www.bafangjie.cn/day_pdt_rpts/get_day_pdt_rpt',
    updateUser: 'https://www.bafangjie.cn/wx_users/',
    topOneHundred: 'https://www.bafangjie.cn/scores/top_one_hundred',
    addScore: 'https://www.bafangjie.cn/scores/add_score',
    getRank: 'https://www.bafangjie.cn/scores/get_rank'
  },
  games: {
    rankScore: 10,
    changeQuestionTime: 100,
    tollGate: 60
  }
}

module.exports = configs