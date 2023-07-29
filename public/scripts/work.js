let words;
let incomplete_word = "";
let complete_word = "";
let counter = 0;

let selected = 0;
let matched = 0;

function setupWork() {
  words = all_data.words;

  // Setup match work
  if(user.work_type == "match") {
    $('#match-container').css('display', 'flex');

    // Get three words from each category
    let equips = pickMatch(words.equipment, 'equipment');
    let classes = pickMatch(words.classes, 'class');
    let match_words = equips.concat(classes);

    // Shuffle indexes
    let order = shuffleArray([0, 1, 2, 3, 4, 5]);

    // Add text, class, and listener to each button
    for(let i = 0; i < order.length; i++) {
      let n = i+1;
      $('.match-button:nth-child(' + n + ')').text(match_words[order[i]].word);
      $('.match-button:nth-child(' + n + ')').addClass(match_words[order[i]].type);
      $('.match-button:nth-child(' + n + ')').on("click", function() {
        matchClickEvent(this);
      });
    }

  // Setup words work
  } else {
    $('#words-container').show();

    // Get word to type
    complete_word = "";
    incomplete_word = pickWord();

    $('#work-word-incomplete').html(incomplete_word);
    $('#work-word-complete').html(complete_word);
  }

  $('#work-counter').text(counter);
}

function pickWord() {
  // From all categories except equipment, gather all words and pick one
  let categories = Object.keys(words);
  let index = categories.indexOf('equipment');
  if (index !== -1) {
    categories.splice(index, 1);
  }
  let category = words[categories[categories.length * Math.random() << 0]];
  let word = category[Math.floor(Math.random()*category.length)].toUpperCase().replace(' ', '&nbsp');
  return word;
}

function workType(char) {
  if(user.work_type == "words") {
    // Check if typed char == next letter
    if(char == incomplete_word.charAt(0)) {
      // If not last letter
      if(incomplete_word.length > 1) {
        //If next letter is a space, splice whole entity and append to complete word
        if(incomplete_word.charAt(1) == "&") {
          incomplete_word = incomplete_word.slice(6);
          complete_word += (char + "&nbsp");
        // Otherwise, move letter to complete word
        } else {
          incomplete_word = incomplete_word.slice(1);
          complete_word += char;
        }
        
        $("#work-word-complete").html(complete_word);
        $("#work-word-incomplete").html(incomplete_word);

      // Otherwise last letter, pick new word and reset
      } else {
        incomplete_word = pickWord();
        complete_word = "";
        counter++;

        $('#work-word-incomplete').html(incomplete_word);
        $("#work-word-complete").text(complete_word);
        $('#work-counter').text(counter);
      }
    }
  }
}

function pickMatch(category, type) {
  let words = []

  // Gather three words from the given category, make them with a type for comparing
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

function matchClickEvent(el) {
  // If the button hasn't already been matched
  if(!$(el).hasClass('matched')) {
    // If the button is selected, deselect
    if($(el).hasClass('selected')) {
      $(el).removeClass('selected');
      selected--;
    } else {
      $(el).addClass('selected');
      selected++;

      // If two have been selected
      if(selected == 2) {
        // And if the two match, deselect and add to matched
        if($('.selected').hasClass('equipment') && $('.selected').hasClass('class')) {
          $('.selected').addClass('matched');
          $('.selected').removeClass('selected');
          selected = 0;
          matched++;

          // If all three matches are found, reset
          if(matched == 3) {
            counter++;
            $('#work-counter').text(counter);
            resetMatch();
          }
        // And they don't match, deselect all
        } else {
          $('.selected').removeClass('selected');
          selected = 0;
        }
      }
    }
  }
}