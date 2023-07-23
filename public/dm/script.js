let all_data;

fetch('../data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    all_data = data;

    setup();
  })
  .catch(error => console.log(error));

var socket = io();

function setup() {
  let ids = Object.keys(all_data.users);
  for(let i = 0; i < ids.length; i++) {
    $('.user-select').append(`<option value="${ids[i]}"> ${ids[i]} </option>`);
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



