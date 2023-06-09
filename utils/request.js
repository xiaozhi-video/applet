// import { UserStore } from "../store/user"

class Request {
	constructor(options = {}) {
		// 请求的根路径
		this.baseUrl = options.baseUrl || ''
		// 请求的 url 地址
		this.url = options.url || ''
		// 请求方式
		this.method = 'GET'
		// 请求的参数对象
		this.data = null
		// header 请求头
		this.header = options.header || {}
		this.beforeRequest = null
		this.afterRequest = null
	}

	get(url, data = {}) {
		this.method = 'GET'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	post(url, data = {}) {
		this.method = 'POST'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	put(url, data = {}) {
		this.method = 'PUT'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	delete(url, data = {}) {
		this.method = 'DELETE'
		const s = '?' + Object.entries(data).map(e => e[0] + '=' + e[1]).join('&')
		this.url = this.baseUrl + url + s
		return this._()
	}

	_() {
		// 清空 header 对象
		this.header = {}
		// 请求之前做一些事
		this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this)
		// 发起请求
		return new Promise((resolve, reject) => {
			let weixin = wx
			// 适配 uniapp
			if ('undefined' !== typeof uni) {
				weixin = uni
			}
			weixin.request({
				url: this.url,
				method: this.method,
				data: this.data,
				header: this.header,
				dataType: this.dataType,
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				},
				complete: (res) => {
					// 请求完成以后做一些事情
					this.afterRequest && typeof this.afterRequest === 'function' && this
						.afterRequest(res)
					// 对响应错误做点什么
					if(res.statusCode === 408) {
						uni.showToast({ 
							title: '网络超时',
							icon: 'error'
						})
					} else if(res.statusCode === 504) {
						uni.showToast({
							title: '网络连接错误',
							icon: 'error'
						})
					} else if(res.statusCode === 401) {
						uni.switchTab({
							url: '/pages/mine/mine'
						})
						uni.showToast({ 
							title: '未登录',
							icon: 'error'
						})
						wx.clearStorage()
					  return Promise.reject()
					} else if(res.statusCode !== 200) {
						if(res.data) {
							const message = res.data.detail || res.data.message
							uni.showToast({
							title: message,
							icon: 'error'
							})
						}
					}
				}
			})
		})
	}
}

export const $http = new Request()