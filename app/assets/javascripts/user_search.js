
$(function(){
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <input name='chat_group[user_ids][]' type='hidden'>
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
                  </a>
                </div>`
    $("#user-search-result").append(html);
  }
  function appendUserList(user_id, user_name) {

    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }
  var keyupStack = [];
  $("#user-search-field").on('keyup', function(){
    var input = $.trim($(this).val());
    console.log(input)
    $("#user-search-result").empty();
    keyupStack.push(1);
    setTimeout(function(){
      keyupStack.pop();
      if ( input != '' && keyupStack.length === 0){
        $.ajax({
          url: '/users',
          type: 'GET',
          data: { keyword: input },
          dataType: 'json',
        })
        .done(function(data){
          console.log(data);
          if (data.length !== 0) {
            data.forEach(function(user){

              appendUser(user);
            });
          }
        })
        .fail(function(){
          alert('検索できませんでした。');
        })
      }
    }.bind(this), 500);
  });
  $('#user-search-result').on('click', ".user-search-add", function(){
    var user_id = $(this).attr('data-user-id'),
        user_name = $(this).attr('data-user-name');
    appendUserList(user_id, user_name)
    $(this).parent().remove();
  })
  $('#chat-group-users').on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });
});