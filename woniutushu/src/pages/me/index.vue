<template>
<div class="container">
	<div class="userinfo" v-if="userInfo">
		<!--用户头像-->
		<img :src="userInfo.avatarUrl" alt="" class="head-img">
		<p class="header-name">{{userInfo.nickName}}</p>
	</div>
	<button open-type="getUserInfo" bindgetuserinfo="login" @click="login">获取用户信息</button>
	<button class="btn" @click="scanBook">添加图书</button>
</div>
</template>

<script type="text/ecmascript-6">
  import {get, showSuccess} from '@/util'
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config'
	export default {
    data () {
      return {
        userInfo: null
      }
    },
		created () {
      let user = wx.getStorageSync('userInfo')
			if (user) {
        this.userInfo = user || null
			}
		},
		methods: {
      async login () {
        const res = await get('/weapp/demo')
        console.log(123, res)
        // 设置登录地址
        let user = wx.getStorageSync('userInfo')
	      console.log(user)
        if (!user) {
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success: function (userInfo) {
              console.log('登录成功', userInfo)
              showSuccess('登陆成功')
              wx.setStorageSync('userInfo', userInfo)
            },
            fail: function (err) {
              console.log('登录失败', err)
            }
          })
        } else {
          console.log('已在登陆中')
        }
      },
      scanBook () {
        wx.scanCode({
          success: (res) => {
            // if (res.result) {
            //   // this.addBook(res.result)
            // }
	          console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        })
      }
		}
	}
</script>

<style lang="scss">
.container {
	padding: 0 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.userinfo{
	margin-top:30rpx;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	img{
		width: 150rpx;
		height:150rpx;
		margin: 20rpx;
		border-radius: 50%;
	}
}
</style>