/*
 * @Author: danny dannybaobaoo@163.com
 * @Date: 2022-10-14 04:02:21
 * @LastEditors: danny dannybaobaoo@163.com
 * @LastEditTime: 2022-10-15 20:25:55
 * @FilePath: /code/assets/js/baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 注意：每次调用$.get()或$.post()或$.ajax()的时候会先调用这个函数
// 在这个函数中，会拿到我们给ajax提供的的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url)
    options.url = 'http://www.liulongbin.top:3007' + options.url
    
    // 统一为有权限的接口，设置headers请求头,不用每次都手动加
    // indexof首次出现
    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            // 逻辑或''也可以对应后面用户强制登入后台主页
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
            // console.log('执行了complete函数')
            // console.log(res)
            // 在complete回调函数中，可以使用responseJSON属性拿到服务器响应回来的数据
            // bug注意判断环境，找了半天逻辑应该是逻辑或
            if(res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败!') {
                // 1.强制清空键token
                localStorage.removeItem('token')
                // 2.强制跳转登录页
                location.href = '/login.html'
            }
        }
})