$(function() {
    // 点击去组册账号的链接
    $('#link_reg').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录的链接
    $('#link_login').on('click',function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象，像导入jquery就有了$对象那样，layui导入后就有了form对象
    let form = layui.form
    // layui弹出层对象
    let layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则,有多个用｜分隔
        //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位,且不能出现空格'] ,
    // 校验两次密码是否一致的规则
    // 因为已经加入到确认密码的规则里，如layui说的，value参数就是用户输入的值
    repwd: function(value) {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到前面密码框的内容
        // 然一个后进行一次等于的判断
        // 如果判断失败，则return一个提示消息即可
        let pwd = $('.reg-box [name=password]').val()
        if (pwd != value) {
            return '两次密码不一致'
        }

    }
  })
  

  //   监听注册表单的提交事件
    $('#form_reg').on('submit',function (e) {
        // 阻止默认的提交行为
        e.preventDefault()
        // 发起ajax的post请求
        // 小优化：把参数对象提取出来减少代码冗余
        let data = {username: $('#form_reg [name=username]').val(),  password: $('#form_reg [name=password]').val()}
        $.post('http://www.liulongbin.top:3007/api/reguser',data, function(res) {
            if(res.status !== 0) {
                // 注意用layui的弹出层，注意不能直接使用，变量接受这个对象
                // return console.log(res.message)
                return layer.msg('注册失败')
                }
            // console.log('注册成功')
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
            
         })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 可以用上面的取值方法，也可以这样快速取值
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登陆成功得到的token字符串保存到localstorage,需要就取，存到控制台application的storage那里。之前调试的时候登陆成功就会有token，跳走就不会看到了。
                // console.log(res.token)
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })

})

