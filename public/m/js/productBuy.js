

var letao;
$(function () {
    letao = new Letao();  
    var id = getQueryString('id');
    letao.getPro(id);
    letao.addCar();
  })


  var Letao = function () {  };
  Letao.prototype = {
    //   初始化轮播图
      slider: function () {
          var gallery = mui('.mui-slider');
          gallery.slider({
              interval: 3000
          });
        },
        // 购买的商品的详细信息
        getPro: function (id) {
            $.ajax({
                url:'/product/queryProductDetail',
                data: {
                    id:id
                },
                success: function (backData) { 
                    var start = backData.size.split('-')[0]-0;
                    var end = backData.size.split('-')[1]-0;
                    var arr =[];
                    for(var i = start;i <= end;i++){
                        arr.push(i);
                    }
                    backData.size = arr;
                    var html = template('title',backData);
                    $('.proInfo').html(html);
                    mui('.mui-numbox').numbox();
                     var $html = template('slides',backData);
                     
                     $('.mui-slider').html($html);
                    letao.slider();   
                    
                    
                 }
            })
          },
        //   加入购物车
        addCar: function () {
            $('.proInfo').on('tap','.num',function () {
               $(this).addClass('active').siblings().removeClass('active');
                
              })
            $('.btn-car').on('tap',function () {
                var $num = $('.proInfo .num.active').length;
                if ($num != 1) {
                    // toast第一个参数就是提示的内容 第二参数是一个对象duration提示时间 type类型div 
                    mui.toast('请选择尺码', { duration: 'short', type: 'div' });
                    return;
                }
                //获取数字框选中的数字 使用MUI的方法
                var num = mui('.mui-numbox').numbox().getValue(); 
                if (!num) {
                   
                    mui.toast('请选择数量', { duration: 'short', type: 'div' });
                    return;
                }
                mui.confirm('添加成功， 是否去购物车查看？', '温馨提示', ['是', '否'], function (e) {
                    // 回调函数可以传递参数 e  e.index == 0 表示点击了左边的是 为1 表示点击了右边的否
                    if (e.index == 0) {
                        console.log('正在进入购物车');
                    } else if (e.index == 1) {
                        console.log('请继续选择尺码数量');
                    }
                });
              })
          },
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