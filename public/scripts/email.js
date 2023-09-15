let reply_to = "";

function populateEmails() {
  let html_email;

  $('#email-grid').children().not(':first-child').remove()

  // Create html table row to append to email list
  for(const [id, email] of Object.entries(emails)) {
    //html_email = `<tr><td>${email.from}</td><td>${email.subject}</td><td>${email.message}</td></tr>`;
    //html_email = `<tr><td>${email.from}</td><td>${email.subject}</td><td>${email.message}</td><span>REPLY</span></tr>`;
    
    //$('#email-table tr:first').after(html_email);

    /*
    html_email = `
      <div class="email-row">
      <div class="email-cell email-from">${email.from}</div>
      <div class="email-cell email-subject">${email.subject}</div>
      <div class="email-cell email-message">${email.message}</div>
      </div>
    `;
    */

    
    html_email = `
      <div class="email-row">
      <div class="email-cell email-from">${email.from}</div>
      <div class="email-cell email-subject">${email.subject}</div>
      <div class="email-cell email-message">${email.message}</div>
      <div class="email-cell email-reply"><a class="reply-span" onclick="reply('${email.from}')">REPLY</a></div>
      </div>
    `;
    
    $('#email-grid div:first').after(html_email);
  }
}

function newEmail() {
  // New email modal alert trigger
  if(stage != 4) {
    $('#home-email span').show();
    $('.new-email').css('right', '-10px');
  }
}

function reply(to) {
  $('.reply-email').css('display', 'flex');

  reply_to = to;
}

function sendReply() {
  let message = $('#reply-body').val();
  console.log(message);

  socket.emit('reply', {from: user.name, to: reply_to, text: message});

  closeModal('reply-email');
}