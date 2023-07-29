let stage = 1;
let previous_screen;
let previous_stage;
let current_screen;

let all_data;

let user;
let emails;

function setup() {
  // P5 SETUP, used for keypresses
  console.log("setting up");
}

function dataLoaded() {
  console.log("data loaded");

  // Check if user was already logged in, if so login
  if(localStorage.getItem("employeeID") != null) {
    login(localStorage.getItem("employeeID"));
  }
}

function keyPressed() {
  if(keyCode === BACKSPACE) {
    if(stage == 1) {
      backspace();
    }
  } else if(keyCode === ENTER) {
    if(stage == 1) {
      checkID();
    }
  } else {
    let char = String.fromCharCode(keyCode).toUpperCase();

    if(stage == 1) {
      loginType(char);
    } else if(stage == 3) {
      workType(char);
    }
  }
}

function updatePageStatus(new_stage, prev_screen, new_screen) {
  previous_stage = stage;
  stage = new_stage;
  previous_screen = prev_screen;
  current_screen = new_screen;
}

function updateUser(new_user) {
  user = new_user ? new_user : {};
  emails = new_user ? new_user.emails : {};
}

function goBack() {
  $('#' + current_screen + '-screen').hide();
  $('#' + previous_screen + '-screen').css('display', 'flex');
  stage = previous_stage;

  $('.work-container').hide();
}

function closeModal(el) {
  if(el == 'warning' || el == "reply-email") {
    $(`.${el}`).hide()
  } else if(el == 'new-email') {
    $(`.${el}`).css('right', '-300px');
  }
}

function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function updateData(new_data) {
  all_data = new_data;
  
  if(localStorage.getItem("employeeID") != null) {
    updateUser(new_data.users[localStorage.getItem("employeeID")]);
  }
}



