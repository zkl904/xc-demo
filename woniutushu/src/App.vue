<script>
import {get, showSuccess} from './util'
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  async created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //
    // console.log('app created and cache logs by setStorageSync')
    // var qcloud = require('./bower_components/qcloud-weapp-client-sdk/index.js');

    // 设置登录地址
    // let user = wx.getStorageSync('userInfo')
    // if (!user) {
    //   qcloud.setLoginUrl(config.loginUrl)
    //   qcloud.login({
    //     success: function (userInfo) {
    //       console.log('登录成功', userInfo)
    //       showSuccess('登陆成功')
    //      wx.setStorageSync('userInfo', userInfo)
    //     },
    //     fail: function (err) {
    //       console.log('登录失败', err)
    //     }
    //   })
    // }
    // const res = await get('/weapp/demo')
    // console.log(123, res)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
