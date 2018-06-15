

var letao;
$(function () {
    letao = new Letao();
    letao.getVcode();
    letao.register();

})

var vcode = '';
var Letao = function () { };
Letao.prototype = {
    getVcode: function () {
        $('.btn-vcode').on('tap',function () { 
            $.ajax({
                url: '/user/vCode',
                success: function (data) {
                    console.log(data);
                    vcode = data.vCode;
                }
            })
         })
        
      },
   register: function () {
       $('.register').on('tap',function () {
           var obj = {
               mobile: $('.mobile').val().trim(),
               user: $('.user').val().trim(),
               password: $('.password').val().trim(),
               password2: $('.password2').val().trim(),
               $vcode: $('.vcode').val().trim(),
           };
            if (!obj.mobile) {
                mui.toast('请输入手机号', { duration: 'short', type: 'div' });
                return;
            }
           if (!obj.user) {
               mui.toast('请输入用户名', { duration: 'short', type: 'div' });
               return;
           }
           if (!obj.password || !obj.password2 ) {
               mui.toast('请输入密码', { duration: 'short', type: 'div' });
               return;
           }
           if (obj.password != obj.password2) {
               mui.toast('密码不一致', { duration: 'short', type: 'div' });
               return;
           }
           if (obj.$vcode != vcode) {
               mui.toast('验证码有误', { duration: 'short', type: 'div' });
               return;
           }
            $.ajax({
                url: '/user/register',
                type: 'post',
                data:{
                    'username': obj.user, 'password': obj.password, 'mobile': obj.mobile,
                     'vCode': obj.$vcode
                },
                success: function (data) {  
                    if (data.success) {
                        mui.toast('注册成功', { duration: 'short', type: 'div' });
                        // 跳转到登录页面去登录
                        window.location.href = 'login.html'
                    } else {
                        mui.toast(data.message, { duration: 'short', type: 'div' });
                    }
                }
            })

         })






     }
}

//获取url地址栏的参数的函数  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}