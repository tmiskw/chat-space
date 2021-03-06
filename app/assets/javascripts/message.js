$(function(){ 
  function buildHTML(message){
    var messageImage = message.image ? `<img class="lower-message__image" src="${message.image}">` : `` ;
    var html = ` <div class= "message" data-message-id="${message.id}">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.user_name}
    </div>
    <div class="upper-message__date">
    ${message.date}
    </div>
    </div>
    <div class="lower-message">
                        <div class="lower-message__content">
                          ${message.content}
                          </div>
                          ${messageImage}
                       </div> 
                       </div>`
       return html;
    } 

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function(data){
        var html = buildHTML(data);
         $('.messages').append(html);      
         $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
         $('#new_message')[0].reset();
       })
       .fail(function(){
         alert('error');
       })
       .always(function(){
         $('.form__submit').prop('disabled', false);
        });
      });

    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $(".message:last").data("message-id");
  
        $.ajax({
          url: "api/messages",
          type: 'GET',
          dataType: 'json',
          data: {last_id: last_message_id},
        })
        .done(function (data) {
          console.log(data)
          if(data.length > 0){
            var insertHTML = '';
            data.forEach(function (message) {
              insertHTML += buildHTML(message);
            })
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
      }
    };
    setInterval(reloadMessages, 5000);
  })
