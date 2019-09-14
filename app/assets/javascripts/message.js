$(function(){ 
     function buildHTML(message){
      var messageImage = message.image ? `<img class="lower-message__image" src="${message.image}">` : `` ;
      var html = ` <div class= "message" "data-message-id"=${message.id}>
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
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
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
         $('.submit-btn').prop('disabled', false);
        })
    })
});
