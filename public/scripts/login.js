let typed_id = "";
let wrong_id = false;

function checkID() {
  // If id is in database, login
  if(Object.keys(all_data.users).includes(typed_id)) {
    login(typed_id);
  } else {
    // Reset variables
    wrong_id = true;
    typed_id = "";

    // Show login error
    $('#login-error').css('visibility', 'visible');
    $("#login-enter").text(typed_id);
  }
}

function login(login_id) {
  // Set local storage for persistent login
  localStorage.setItem("employeeID", login_id);

  // Set global variables
  typed_id = "";
  wrong_id = false;
  
  updatePageStatus(2, "login", "home");
  updateUser(all_data.users[login_id]);

  // Hide login screen elements
  $('#login-enter').text(typed_id);
  $('#login-error').css('visibility', 'hidden');
  $('#login-screen').hide();

  // Setup home screen elements
  $('#home-name').text(user.name);
  $('#home-department').text(user.department);
  $('#home-screen').css('display', 'flex');

  //populateEmails();
}

function logout() {
  localStorage.removeItem("employeeID");

  // Empty user data
  updateUser();

  closeModal('new-email');
  $('#home-screen').hide();
  $('#login-screen').css('display', 'flex');
  stage = 1;
}

function backspace() {
  typed_id = typed_id.slice(0, -1);
  $("#login-enter").text(typed_id);
}

function loginType(char) {
  typed_id += char;
  $("#login-enter").text(typed_id);
}