var socket = io();

socket.on('all_data', function(data) {
  all_data = data;
  console.log(data);
})

socket.on('error', function(data) {
  if(data.id == 'all' || data.id == id) {
    $('.warning-heading').text('ERROR');
    $('.warning-body').text(data.text.toUpperCase());
    $('.warning').show();
  }
})

socket.on('email', function(data) {
  updateData(data);
  populateEmails();
  newEmail();
})