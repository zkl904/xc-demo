const state = {
  userInfo: null
}

const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  }
}

const actions = {
  getUserInfo({commit, dispatch, rootState}, payload) {
    console.log('开始')
    return new Promise(async (resolve, reject) => {
      try {
        let params = {
          tag: 'getUserInfo',
          url: '/weapp/demo',
          type: 'post',
          data: {
            mobileNo: payload.mobileNo
          }
        }
        let {data} = await dispatch('gmNetwork', params)
        if (data.errorCode === rootState.code.CODE_XHR_SUCCESS) {
          resolve()
        } else {
          reject(data)
        }
      } catch (e) {
        console.log(1111, e)
      }
    })
  }
}

const getters = {
  userInfo: (state) => state.userInfo
}

export default {
  state,
  mutations,
  actions,
  getters
}
