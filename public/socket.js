var socket = io();

socket.on('all_data', function(data) {
  all_data = data;
  dataLoaded();
})

socket.on('error', function(data) {
  if(localStorage.getItem("employeeID") != null) {
    if(data.id == 'all' || data.id == localStorage.getItem("employeeID")) {
      $('.warning-heading').text('ERROR');
      $('.warning-body').text(data.text.toUpperCase());
      $('.warning').show();
    }
  }
})

socket.on('email', function(data) {
  updateData(data);
  if(localStorage.getItem("employeeID") != null) {
    populateEmails();
    newEmail();
  }
})