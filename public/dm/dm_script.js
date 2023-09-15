let all_data;

var socket = io();

socket.on('all_data', function(data) {
  all_data = data;

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(all_data));
  $('.download').attr('href', dataStr);

  setup();
})

socket.on('email', function(data) {
  let all_data = data;

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(all_data));
  $('.download').attr('href', dataStr);
})

socket.on('reply', function(data) {
  let reply = data;

  $('.replies').append(`<div style="border: black 1px solid; margin-top: 20px"><p>From: ${reply.from}</p><p>To: ${reply.to}</p><p>${reply.text}</p></div>`);
})

function setup() {
  $('.user-select').find('option').remove();
  
  let ids = Object.keys(all_data.users);
  for(let i = 0; i < ids.length; i++) {
    $('.user-select').append(`<option value="${ids[i]}"> ${all_data.users[ids[i]].name}</option>`);
  }
}

function send() {
  let type = $('.send-select').val();

  if(type == 'error') {
    socket.emit($('.send-select').val(), {id: $('.user-select').val(), text: $('#error-text').val().toUpperCase()});
  } else if(type == 'email') {
    socket.emit($('.send-select').val(), {id: $('.user-select').val(), from: $('#email-from').val(), subject: $('#email-subject').val(), body: $('#email-body').val()});
  }

  $('input').val('');
  $('textarea').val('');
}

function sendChange(select) {
  let val = select.value;
  $('.input-field').hide();
  $(`#${val}-text`).show();
}

function download() {
  socket.emit('download');
}



