/*
 * @Author: danny dannybaobaoo@163.com
 * @Date: 2022-10-15 01:07:08
 * @LastEditors: danny dannybaobaoo@163.com
 * @LastEditTime: 2022-10-15 20:28:51
 * @FilePath: /code/assets/js/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function() {
    // 调用getUserinfo这个函数就能获取用户的基本信息
    getUserInfo()

    // 点击按钮，实现退出功能
    let layer = layui.layer
    $('#btnLogout').on('click',function() {
        // console.log('ok')
        // 提示用户是否退出
        layer.confirm('老公，不要走啦！', {icon: 3, title:'给老公看的'}, function(index){
            //do something
            // console.log('ok')
            // 退出成功之后的事情就是登录成功的反方向
            // 分别是：
            localStorage.removeItem('token')
            location.href = '/login.html'

            // 关闭对应的index弹出层（询问框）
            layer.close(index);
          })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        // 导入之前的自己封装的baseapi
        url: '/my/userinfo',
        // 权限接口
        // headers就是请求头配置对象
        // 值就在localstorage
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // res.data请求到的数据
            // 成功则渲染头像，代码逻辑太多，单独封装再调用就行了
            renderAvator(res.data)
        }

        // 控制用户访问权限功能,单独抽出去不用每次有ajax请求就复制一遍
        // 不论成功还是失败都会调用complete这个回调函数
        // 可以这样看出：在登录页，直接输入index闯入后台首页，但是控制台看获取身份失败1，header为之前赋的空值，下面打印complete的res，发现在responseJSON有跟闯入一样的结果。
        // bug注意是小写c
        // complete: function(res) {
        //     // console.log('执行了complete函数')
        //     // console.log(res)
        //     // 在complete回调函数中，可以使用responseJSON属性拿到服务器响应回来的数据
        //     // bug注意判断环境，找了半天逻辑应该是逻辑或
        //     if(res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败!') {
        //         // 1.强制清空键token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转登录页
        //         location.href = '/login.html'
        //     }
        // }

    })
}

// 渲染头像的函数
// 注意，定义的user相当于变量接收请求到的全部数据（对象）,相当于res.data
function renderAvator(user) {
    // 1.获取用户的名称
    let name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户的头像
    if(user.user_pic !== null) {
        // 3.1渲染图片头像
        // 同时获取左边和右上头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avator').hide()
    }else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        // 3.2字符可能是小写，转成大写
        // 名字的字符串可以当作是数组的
        let first = name[0].toUpperCase()
        $('.text-avator').html(first).show()
    }
}