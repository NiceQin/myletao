
$(function () {
    var letao = new Letao();
    letao.initScroll();
    letao.leftData();
    letao.rightData();
})
var Letao =function () {  };
Letao.prototype = {   
    leftData: function () {
        // 左侧数据
        $.ajax({
            url: '/category/queryTopCategory',
            success: function (data) {
                // console.log(data);
                var html = template('left', data)
                // console.log(html);
                $('.left ul').html(html);
            }
        })
    },
    rightData: function () {
        getData(1);
        $('.left ul').on('click', 'a', function () {
            var id = $(this).data('id');
            getData(id);
            $(this).parent().addClass('active').siblings().removeClass('active');
        })
        
        function getData(id) {
            $.ajax({
                url: '/category/querySecondCategory',
                data: {
                    id: id
                },
                success: function (data) {
                    var html = template('right', data);
                    if (html) {

                    $('.right .mui-row').html(html);
                    } else {
                        $('.right .mui-row').html('<h3 style="text-align: center;color: red">没有这个商品</h3>');
                    }
                }
            })
          }
    },
    initScroll: function () {
        var options = {
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏  值越大滚动越慢
            bounce: true //是否启用回弹  
        }
        mui('.mui-scroll-wrapper').scroll(options);
    },
}