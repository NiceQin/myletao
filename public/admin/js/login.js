var letao;
$(function () {
    letao = new Letao();
    letao.login();
  })

  var Letao = function () {  };
  Letao.prototype = {
      login: function () { 
          $('.btn-login').click(function () {  
              var user = $('.user').val().trim();
              var password = $('.password').val().trim();
                  $('.btn-login').popover('show');
            
              
          })
       }
  }
 