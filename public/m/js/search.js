

var letao;
$(function () {
    letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();


  })


var Letao = function () {  };
Letao.prototype = {
    // 添加历史纪录
    addHistory: function () {
        $('.btn-search').click(function () {
            var val = $('.input-search').val();
            if (!val.trim()) {
               
                return;
            }
            // var id = 0;
            var arr = window.localStorage.getItem('data');
            
            
            if (arr && JSON.parse(arr).length > 0) {
               arr = JSON.parse(arr);
                // id = arr[arr.length - 1].id +1;
            }else {
                arr = [];
                // id = 0;
            }
            for(var i = 0;i < arr.length;i++){
                if (arr[i].search == val) {
                    return;
                }
            }
            arr.push({
                'search':val,
                // 'id':id
            });
            window.localStorage.setItem('data',JSON.stringify(arr));
            
            letao.queryHistory();
            window.location.href = 'list.html';
          })
      },
   
   //查询历史记录
    queryHistory: function () { 
        var arr = window.localStorage.getItem('data');
        if (arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        }else {
            arr = [];
        }
        //让最近的搜索排在前面
        arr.reverse();
        var html = template('search',{'rows':arr});
        $('.content').html(html);
     },
    //删除历史纪录
     deleteHistory: function () {  
         $('.content').on('click','.btn-delete',function () {
            
             var arr = window.localStorage.getItem('data');
            //  var id = $(this).data('id');
            //  if (arr && JSON.parse(arr).length >0) {
             var $val = $(this).siblings().html();
             arr = JSON.parse(arr);
            //  }else{
                //  arr = [];
            //  }
             for(var i =0;i < arr.length;i++){
                 if (arr[i].search == $val) {
                    arr.splice(i,1);
                     
                } 
             }
           
             window.localStorage.setItem('data', JSON.stringify(arr));
             
              letao.queryHistory();
           })
       
     },



}