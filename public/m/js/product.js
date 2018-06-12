
var letao ;
$(function () {
    letao = new Letao();
    letao.downinit();
    letao.searchProduct();
    search = getQueryString('search');
    letao.productSort();
  })
var search;
var page = 1;
  var Letao = function () {  };
  Letao.prototype = {
    //   初始化上下拉刷新
      downinit: function () {
          mui.init({
              pullRefresh: {
                  container: "#refreshContainer",
                  down: {
                     
                      callback: function () { 
                          setTimeout(function () { 
                              letao.getProductInfo({'proName':search},function (backData) { 
                                  var html = template('product', backData);
                                  $('.main .pro').html(html);
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                               })
                           },1000)
                       },
                    },
                  up: {
                      
                      callback: function () {
                          setTimeout(function () {
                              letao.getProductInfo({
                                  'proName':search,
                                  'page':++page,
                              },function (backData) {  
                                  var html = template('product',backData);
                                  $('.main .pro').append(html);
                                  if (backData.data,length>0) {
                                      
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    page = 1;
                                  }else{
                                      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                  }
                              })
                          }, 1000)
                      },
                  }
              }
          });
        },
        // 搜索商品
        searchProduct: function () {
            $('.btn-search').on('tap',function () { 
                
                
                search = $('.input-search').val().trim();
                letao.getProductInfo({
                    "proName": search,
                    
                },function (backData) { 
                    var html = template('product', backData);
                    $('.main .pro').html(html);
                 });
                
             })
          },
         
         
          //   获取商品的信息
        getProductInfo: function (obj, callback) {

          $.ajax({
              url: '/product/queryProduct',
              data: {
                  page: obj.page || 1,
                  pageSize: obj.pageSize || 4,
                  proName: obj.proName,
                    price:obj.price,
                    num:obj.num

              },
              success: function (backData) {
                  if (callback) {
                      callback(backData);
                  }
              }

          })

      },

    //商品排序
    productSort: function () { 
        $('.orderbar a').on('tap',function () {
            var sortType = $(this).data('sort-type');
            var sort = $(this).data('sort');
            
            
            if (sort == 1) {
                sort = 2;
            }else{
                sort = 1;
            }
             $(this).attr('data-sort',sort);
        
            if (sortType=='price') {
                letao.getProductInfo({
                    'proName':search,
                    'price':sort
                },function (backData) {
                    var html = template('product',backData);
                    $('.main .pro').html(html);
                  })
            }else if(sortType=='num') {
                letao.getProductInfo({
                    'proName': search,
                    'num': sort
                }, function (backData) {
                    var html = template('product', backData);
                    $('.main .pro').html(html);
                })
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