

var letao;
$(function () {
    letao = new Letao();
   
    var id = getQueryString('id');
    letao.getPro(id);
  })


  var Letao = function () {  };
  Letao.prototype = {
      slider: function () {
          var gallery = mui('.mui-slider');
          gallery.slider({
              interval: 3000
          });
        },
        getPro: function (id) {
            $.ajax({
                url:'/product/queryProductDetail',
                data: {
                    id:id
                },
                success: function (backData) { 
                    console.log(backData);
                    
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
                     console.log($html)
                     $('.mui-slider').html($html);
                    letao.slider();   
                    
                    
                 }
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