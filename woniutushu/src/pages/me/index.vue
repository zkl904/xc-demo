<template>
<div class="container">
	<div class="userinfo ph-20 bg-gray-999" v-if="userInfo" >
		<!--用户头像-->
		<img :src="userInfo.avatarUrl" alt="" class="head-img">
		<p class="header-name">{{userInfo.nickName}}</p>
	</div>
	<button open-type="getUserInfo" bindgetuserinfo="login" @click="login">获取用户信息</button>
	<button class="user-btn" @click="scanBook">添加图书</button>
</div>
</template>

<script type="text/ecmascript-6">
  import {get, showSuccess} from '@/util'
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config'
  import {mapActions} from 'vuex'
  import axios from 'axios'
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
      ...mapActions(['getUserInfo']),
      async login () {
        // const res = await get('/weapp/demo')
        let res = await this.getUserInfo({
          mobileNo: '15757855221'
        })
	      console.log(222222)
        console.log(123, res)
        // 设置登录地址
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:5757/weapp/demo',
        //   data: {
        //     mobileNo: 'Fred'
        //   },
        //   responseType: 'blob'
        // }).then(response => {
        //   console.log(1111)
        // }).catch((error) => {
        //
        // })
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

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.container {
	padding: 0 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.userinfo
	margin-top:30rpx;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	img
		width: 150rpx;
		height:150rpx;
		margin: 20rpx;
		border-radius: 50%;
.user-btn
	color:white;
	background:#EA5A49;
	margin-bottom: 10px;
	padding-left: 15px;
	padding-left: 15px;
	border-radius: 2px;
	font-size: 16px;
	line-height: 40px;
	height: 40px;
	width: 100%;
.user-btn:active
	background: #FA5A49;
</style>
