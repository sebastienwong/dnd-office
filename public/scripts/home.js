function workClicked() {
  setupWork();

  // Hide home screen
  $('#home-screen').hide();

  // Show work screen
  $('#work-screen').css('display', 'flex');

  updatePageStatus(3, "home", "work");
}

function emailClicked() {
  populateEmails();

  // Hide home screen
  $('#home-screen').hide();
  $('#home-email span').hide();

  //Show work screen
  $('#email-screen').css('display', 'flex');

  updatePageStatus(4, "home", "email");
}