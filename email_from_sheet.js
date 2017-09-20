function onOpen() {
  // Add a custom menu to the Google Doc.
  SpreadsheetApp.getUi()
      .createMenu('Automate-it!')
      .addItem('Email Translation Request', 'menuItem1')
      .addToUi();
}

function menuItem1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetlink = ss.getUrl();
// Have a cell in the sheet with the email address you wish to send to separated by commas, replace "A1" below with the cell that you have the email addresses in 
  var recipient = ss.getRange("A1").getValue();
// You can edit the subject and body of the email below. The body can pull in information from the sheet, such as sheet URL, cell text, etc.
  MailApp.sendEmail({
    to: recipient,
    subject: "New Translation Request",
    htmlBody: "Hi, <br><br>We have a new translation request. You can find the English copy " + "<a href='" + sheetlink + "'>here</a>" + ". <br><br> Please let me know if you have any questions!"
  }); 
}