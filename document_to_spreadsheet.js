// This script does the following:
// 1) Makes a copy of an existing google sheet (insert ID for it below <DOC_ID_GOES_HERE>) and renames it
// 2) Copies specific text in a document - anything that appears below the word "EMAIL" and has a bracket "[" in the line of text
// 3) Pastes that text into the copied goole sheet
// 4) Replaces "<<Insert Link>>" in the document with the link to the google sheet
// 5) Formats the sheet to title columns for each language/translation

function onOpen() {
// Add a custom menu to the Google Doc so you can run the script below without opening the script editor
DocumentApp.getUi()
.createMenu('Automate it!')
.addItem('Translation Spreadsheet', 'menuItem1')
.addToUi();
}

//The script below will run upon selecting the menu item above
function menuItem1() {
  var body = DocumentApp.getActiveDocument().getBody()
  var title = DocumentApp.getActiveDocument().getName()
  var docUrl = DocumentApp.getActiveDocument().getUrl()
  //Find template spreadsheet and make a copy of it, renaming to match document
  var sss = DriveApp.getFileById('<DOC_ID_GOES_HERE>').makeCopy(title + ' - Translations');

  //Get URL of spreadsheet and insert into document so you can access it later
  var link = sss.getUrl();
  var info = body.findText('<<Insert Link>>');
  var ss = SpreadsheetApp.openByUrl(link);
  SpreadsheetApp.setActiveSpreadsheet(ss); 
  if(info){ // if the text <<Insert Link>> exists in the document, replace it with the spreadsheet link
    var start = info.getStartOffset();
    var text = info.getElement().asText();
    text.replaceText("<<Insert Link>>",link);
    text.setLinkUrl(link);}

  //Find text between Heading 2 that says "EMAIL" and the next Heading 2
  var numChildren = body.getNumChildren()
  var range = numChildren - 1
  var ranger = range.toFixed(0)
  var sheets = ss.getSheets()[0]
  sheets.setColumnWidth(1, 500)
  var cellCounter = 2
  for(counter = 0; counter < ranger; counter++){
    if(body.getChild(counter).getHeading() == 'Heading 2'){
      if(body.getChild(counter).getText() == 'EMAIL'){
        counter++
        while(counter < ranger){
          if(body.getChild(counter).getHeading() == 'Normal'){
            copyText = body.getChild(counter).getText()
            sheets.getRange('A'+cellCounter).setValue(copyText).setWrap(true)
            counter++
            cellCounter++
            Logger.log(copyText)
          }
          else if(body.getChild(counter).getHeading() == 'Title'){
            copyText = body.getChild(counter).getText()
            sheets.getRange('A'+cellCounter).setValue(copyText).setFontWeight("bold").setWrap(true);
            counter++
            cellCounter++
            Logger.log(copyText)
          }
          else if(body.getChild(counter).getHeading() == 'Heading 2'){
            break
          }
        }
      }
    }
  }

//Resize columns to better fit copy
  for(columnCounter = 2; columnCounter < 7; columnCounter++){
    sheets.setColumnWidth(columnCounter, 375);
  }

//If line of text does not have "]" in it, then delete it. This takes out all extra copy that we don't need translations for. Any copy that we need translations for should include [TITLE_HERE] at the beginning of it
  var cell = sheets.getRange("B1");
  cell.setFormula("=IF(RegExMatch(A1,\"]\"),\"\",\"DELETE\")");
  var oneRowCopy = sheets.getRange("B1");
  var targetRows = sheets.getRange(1,2,sheets.getLastRow(), 1);
  oneRowCopy.copyTo(targetRows); 
  var rows = sheets.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var rowsDeleted = 0;
  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    if (row[1].indexOf("DELETE") > -1) {
      sheets.deleteRow((parseInt(i)+1) - rowsDeleted);
      rowsDeleted++;
    }
  }

//Name column headers with supported languages
  var range = sheets.getRange("B:B");
  range.clearContent();
  sheets.insertRowBefore(1)
  sheets.getRange('A1').setValue('English').setFontWeight("bold").setWrap(true);
  sheets.getRange('B1').setValue('French').setFontWeight("bold").setWrap(true);
  sheets.getRange('C1').setValue('German').setFontWeight("bold").setWrap(true);
  sheets.getRange('D1').setValue('Italian').setFontWeight("bold").setWrap(true);
  sheets.getRange('E1').setValue('Japanese').setFontWeight("bold").setWrap(true);
  sheets.getRange('F1').setValue('Polish').setFontWeight("bold").setWrap(true);
  sheets.getRange('G1').setValue('Portuguese').setFontWeight("bold").setWrap(true);
  sheets.getRange('H1').setValue('Spanish').setFontWeight("bold").setWrap(true);
  sheets.getRange('I1').setValue('Turkish').setFontWeight("bold").setWrap(true);

//Freeze the first column and row for easier navigation
  sheets.setFrozenColumns(1);
  sheets.setFrozenRows(1);
}
