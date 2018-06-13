

var letao;
$(function () {
    letao = new Letao();
    letao.login();
   
})


var Letao = function () { };
Letao.prototype = {
   login: function () {
       $('.login').on('tap',function () {  
           var user = $('.user').val().trim();
           var password = $('.password').val().trim();
            if (!user) {
                mui.toast('请输入用户名', { duration: 'long', type: 'div' }); 
                return;
            }
           if (!password) {
               mui.toast('请输入密码', { duration: 'long', type: 'div' });
                return;
           }
            $.ajax({
                url:'/user/login',
                data:{
                    'username':user,
                    'password':password
                },
                type:'post',
                success: function (data) { 
                    console.log(data);
                    if(data.success == true){
                        // 跳转到上一页
                        window.history.back();
                        
                        // window.location.href = 'register.html';
                    }else{
                        mui.toast(data.message, {
                            duration: 'long',
                            type: 'div'
                        });
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