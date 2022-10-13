/*
 * @Author: danny dannybaobaoo@163.com
 * @Date: 2022-10-14 04:02:21
 * @LastEditors: danny dannybaobaoo@163.com
 * @LastEditTime: 2022-10-14 04:17:12
 * @FilePath: /code/assets/js/baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 注意：每次调用$.get()或$.post()或$.ajax()的时候会先调用这个函数
// 在这个函数中，会拿到我们给ajax提供的的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})