// This script uses information filled out within a document/brief to create a Trello Card
// You will need to get authentication from the Trello API for this to work

// Create menu item to run script from
function onOpen() {
  DocumentApp.getUi()
      .createMenu('Automate-it!')
      .addItem('Create Trello Card', 'menuItem1')
      .addToUi();
}

function menuItem1() {
 var body = DocumentApp.getActiveDocument().getBody()
 var doc = DocumentApp.getActiveDocument()
 var link = doc.getUrl()
 var title = DocumentApp.getActiveDocument().getName()

// Find the pieces of respective text (ie, "Author") and get the text that immediately follows them
// This allows you to get information that has already been filled out in the document so there's no need to manually copy and paste
 var requestor = body.findText('Author:').getElement().getParent().getText()
 var overview = body.findText('Overview').getElement().getParent().getNextSibling().getText()
 var KPI = body.findText('KPI:').getElement().getParent().getText()
 var channels = body.findText('Channels:').getElement().getParent().getText()
 var merch = body.findText('Merchandising:').getElement().getParent().getText()
 var localize = body.findText('Localized:').getElement().getParent().getText()
 var launch = body.findText('Launch/End Date:').getElement().getParent().getText()
 var audience = body.findText('Audience: ').getElement().getParent().getText()
 var audsize = body.findText('Audience Size:').getElement().getParent().getText()
 var segmentation = body.findText('Segmentation').getElement().getParent().getNextSibling().getText()
 var test = body.findText('Test Experience').getElement().getParent().getNextSibling().getText()
 
 // This section loads the copy from above into a Trello card. It includes Trello specific formatting.
 // Insert the id of the list you wish to add to the card to.
 var payload = {"name":title, 
                  "desc": requestor + 
                  '\n\n ------------' + '\n **Overview**' + 
                  '\n ============== \n' + overview + 
                  '\n\n **Prioritization**' + '\n ============== \n' +
                  '- ' + audsize + '\n' + '- ' + KPI + '\n' + '- Expected lift if successful:' +
                  '\n'+ '- Priority for your team: HIGH / MEDIUM / LOW' + '\n \n' +
                  '**Execution Details**' + '\n' + '==============' + '\n' + '- ' + channels + 
                  '\n' + '- ' + audience + '\n' + '- Segmentation: ' + segmentation + '\n' + '- ' + merch +
                  '\n' + '- New creative?' + '\n' + '- ' + localize + '\n' + '- Test experience: ' + test +
                  '\n' + '- ' + launch + '\n' + '- Other: (landing page, banner, survey, special tracking, etc.)\n\n'
                  + '------------\n' + '**Related briefs:** ' + link + '\n\n**Related cards:** (Brand, Analytics, Strategy, etc.)', 
                  "pos":"bottom", 
                  "idList":"<INSERT ID LIST HERE>", 
                 };
// Insert your Trello API authentication key and token below
  var url = 'https://api.trello.com/1/cards?key=<FILL IN KEY HERE>&token=<FILL IN TOKEN HERE>'
  var options = {"method" : "post",
                  "payload" : payload};
   
  UrlFetchApp.fetch(url, options); 
}