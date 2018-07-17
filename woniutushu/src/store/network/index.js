import axios from './axios'

const state = {
  requestList: {}
}

// 请求锁
const mutations = {
  setRequestLock: (state, payload) => {
    state.requestList[payload] = true
  },
  setRequestUnlock: (state, payload) => {
    delete state.requestList[payload]
  }
}

const actions = {
  gmNetwork: ({state, commit, dispatch, rootState}, payload) => {
    let tag = payload.tag
    let url = payload.url
    let type = payload.type || 'get'
    let data = payload.data || {}
    let showIndicator = payload.showIndicator || true   // 是否转圈
    // merge common request params from rootState.
    Object.assign(data, rootState.reqParams, {custNo: rootState.custNo ? rootState.custNo : (window.cookieStore.read('custNo') || '')})
    let headers = payload.headers || {}
    return new Promise(async (resolve, reject) => {
      // if (showIndicator) Indicator.open()
      try {
        if (!state.requestList[payload]) {
          commit('setRequestLock', tag)
          let res = await dispatch('sendRequest', {url: url, type: type, data: data, headers: headers})
          resolve(res)
        }
      } catch (err) {
        // alert('网络错误')
        console.log('网络错误')
        reject(err)
      } finally {
        commit('setRequestUnlock', tag)
      }
    })
  },
  sendRequest: ({commit, dispatch}, payload) => {
    payload.type = payload.type.toLowerCase()
    switch (payload.type) {
      case 'get':
      case 'put':
      case 'patch':
      case 'delete':
      case 'post':
        return new Promise((resolve, reject) => {
          axios({
            method: payload.type,
            url: payload.url,
            data: payload.data,
            headers: payload.headers
          }).then((res) => {
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
        })
        break
      case 'postmultipart':
        let formData = new FormData()
        for (let key in payload.data) {
          formData.append(key, payload.data[key])
        }
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url: payload.url,
            data: formData,
            headers: Object.assign(payload.headers, {'content-type': 'multipart/form-data'})
          }).then((res) => {
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
        })
        break
    }
  }
}

export default {
  state,
  mutations,
  actions
}
