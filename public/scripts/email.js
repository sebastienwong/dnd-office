function populateEmails() {
  let html_email;

  $("#email-table").find("tr:gt(0)").remove();

  // Create html table row to append to email list
  for(const [id, email] of Object.entries(emails)) {
    html_email = `<tr><td>${email.from}</td><td>${email.subject}</td><td>${email.message}</td><span>REPLY</span></tr>`;
    
    $('#email-table tr:first').after(html_email);

    html_email = `
      <div class="email-row">
      <div class="email-cell email-from">${email.from}</div>
      <div class="email-cell email-subject">${email.subject}</div>
      <div class="email-cell email-message">${email.message}</div>
      <div class="email-cell email-reply"><a class="reply-span" onclick='reply()'>REPLY</a></div>
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

function reply() {
  $('.reply-email').css('display', 'flex');
}