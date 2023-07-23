let stage = 1;
let previous_screen;
let previous_stage;
let current_screen;

let all_data;

let id = "";
let wrong_id = false;

let user;
let user_name;

let words;
let incomplete_word = "";
let complete_word = "";
let counter = 0;

let selected = 0;
let matched = 0;

let emails;

function setup() {
  //loadData();
}

/*
function loadData() {
  fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    all_data = data;
  })
  .catch(error => console.log(error));
}
*/

function keyPressed() {
  if(keyCode === BACKSPACE) {
    switch(stage) {
      case 1:
        id = id.slice(0, -1);
        $("#login-enter").text(id);

        break;
      default:
        break;
    }
  } else if(keyCode === ENTER) {
    switch(stage) {
      case 1:
        if(checkID(id)) {
          wrong_id = false;
          stage = 2;
          $('#login-screen').hide();
          $('#home-screen').css('display', 'flex');

          words = all_data.words;
          
          user = all_data.users[id];
          user_name = user.name;
          emails = user.emails;

          $('#home-name').text(user_name);

          populateEmails();

        } else {
          wrong_id = true;
          $('#login-error').css('visibility', 'visible');
          id = "";
          $("#login-enter").text(id);
        }

        break;
      default:
        break;
    }
  } else {
    let char = String.fromCharCode(keyCode).toUpperCase();

    switch(stage) {
      case 1:
        id += char;

        $("#login-enter").text(id);

        break;
      case 3:
        if(user.work_type == "words") {
          if(char == incomplete_word.charAt(0)) {
            if(incomplete_word.length > 1) {
              if(incomplete_word.charAt(1) == "&") {
                incomplete_word = incomplete_word.slice(6);
                complete_word += (char + "&nbsp");
              } else {
                incomplete_word = incomplete_word.slice(1);
                complete_word += char;
              }
              
              $("#work-word-complete").html(complete_word);
              $("#work-word-incomplete").html(incomplete_word);
            } else {
              incomplete_word = pickWord();
              $('#work-word-incomplete').html(incomplete_word);
  
              complete_word = "";
              $("#work-word-complete").text(complete_word);
  
              counter++;
              $('#work-counter').text(counter);
            }
          }
        }

        break;
      default:
        break;
    }
  }
}

function checkID(id) {
  return Object.keys(all_data.users).includes(id);
}

function workClicked() {
  $('#home-screen').hide();
  $('#work-screen').css('display', 'flex');

  previous_stage = stage;
  stage = 3;
  previous_screen = "home";
  current_screen = "work";

  setupWork();

  
}

function setupWork() {
  if(user.work_type == "match") {
    $('#match-container').css('display', 'flex');

    let equips = pickMatch(words.equipment, 'equipment');
    let classes = pickMatch(words.classes, 'class');
    let match_words = equips.concat(classes);

    let order = shuffleArray([0, 1, 2, 3, 4, 5]);

    for(let i = 0; i < order.length; i++) {
      let n = i+1;
      $('.match-button:nth-child(' + n + ')').text(match_words[order[i]].word);
      $('.match-button:nth-child(' + n + ')').addClass(match_words[order[i]].type);
      $('.match-button:nth-child(' + n + ')').on("click", function() {
        if(!$(this).hasClass('matched')) {
          if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            selected--;
          } else {
            $(this).addClass('selected');
            selected++;
  
            if(selected == 2) {
              if($('.selected').hasClass('equipment') && $('.selected').hasClass('class')) {
                $('.selected').addClass('matched');
                $('.selected').removeClass('selected');
                selected = 0;
                matched++;

                if(matched == 3) {
                  counter++;
                  $('#work-counter').text(counter);
                  resetMatch();
                }
            } else {
              $('.selected').removeClass('selected');
              selected = 0;
            }
            }
          }
        }
      });
    }

  } else {
    $('#words-container').show();

    complete_word = "";
    incomplete_word = pickWord();

    $('#work-word-incomplete').html(incomplete_word);
    $('#work-word-complete').html(complete_word);
  }

  $('#work-counter').text(counter);
}

function pickWord() {
  let categories = Object.keys(words);
  let index = categories.indexOf('equipment');
  if (index !== -1) {
    categories.splice(index, 1);
  }
  let category = words[categories[categories.length * Math.random() << 0]];
  let word = category[Math.floor(Math.random()*category.length)].toUpperCase().replace(' ', '&nbsp');
  return word;
}

function pickMatch(category, type) {
  let words = []

  for(let i = 0; i < 3; i++) {
    words.push({"word": category[Math.floor(Math.random()*category.length)].toUpperCase(), "type": type});
  }

  return words;
}

function resetMatch() {
  let equips = pickMatch(words.equipment, 'equipment');
  let classes = pickMatch(words.classes, 'class');
  let match_words = equips.concat(classes);

  selected = 0;
  matched = 0;

  let order = shuffleArray([0, 1, 2, 3, 4, 5]);

  $('.matched').removeClass('matched');
  $('.equipment').removeClass('equipment');
  $('.class').removeClass('class');

  for(let i = 0; i < order.length; i++) {
    let n = i+1;
    $('.match-button:nth-child(' + n + ')').text(match_words[order[i]].word);
    $('.match-button:nth-child(' + n + ')').addClass(match_words[order[i]].type);
  }
}

function emailClicked() {
  $('#home-screen').hide();
  $('#email-screen').css('display', 'flex');

  previous_stage = stage;
  stage = 4;
  previous_screen = "home";
  current_screen = "email";

  $('#home-email span').hide();
}

function populateEmails() {
  let html_email;
  emails = user.emails;

  $("#email-table").find("tr:gt(0)").remove();

  for(const [id, email] of Object.entries(emails)) {
    html_email = `<tr><td>${email.from}</td><td>${email.subject}</td><td>${email.message}</td></tr>`;
    $('#email-table tr:first').after(html_email);
  }
}

function newEmail() {
  if(stage != 4) {
    $('#home-email span').show();
    $('.new-email').css('right', '-10px');
  }
}

function goBack() {
  $('#' + current_screen + '-screen').hide();
  $('#' + previous_screen + '-screen').css('display', 'flex');
  stage = previous_stage;

  $('.work-container').hide();
}

function closeModal(el) {
  if(el == 'warning') {
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
          
  user = new_data.users[id];
  user_name = user.name;
  emails = user.emails;
}



