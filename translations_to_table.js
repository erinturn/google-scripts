// This script takes translations that are formatted with one language in each column and a [TITLE] at the beginning of each string. 
// It then reformats them into three columns, TITLE, LANG, COPY. 
// It splits the [TITLE] at the beginning of the string into one column, and the copy after into a separate column

function onOpen() {
  // Add a custom menu to the Google Doc.
  SpreadsheetApp.getUi()
      .createMenu('Automate-it!')
      .addItem('Reformat Translations', 'menuItem1')
      .addToUi();
}

// Creates a "Interim" sheet with transposed copy, then hides the sheet and copies the text
function menuItem1() { 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.insertSheet("Interim");

  var sheet = SpreadsheetApp.getActiveSheet();
  var cell = sheet.getRange("A1");
  cell.setFormula("=TRANSPOSE(Sheet1!A1:X100)"); 
  sheet.hideSheet();

// Created a new sheet and copies the text from the "Interim" sheet onto it
  ss.insertSheet("Responsys");
  var sheet = SpreadsheetApp.getActiveSheet();
  var cell = sheet.getRange("E1");
// Uses google scripts to insert formulas into cells that then move and format the copy
  cell.setFormula("=filter(unique({Interim!B:B;Interim!C:C;Interim!D:D;Interim!E:E;Interim!F:F;Interim!G:G;Interim!H:H;Interim!I:I;Interim!J:J;Interim!K:K;Interim!L:L;Interim!M:M;Interim!N:N;Interim!O:O;Interim!P:P;Interim!Q:Q;Interim!R:R;Interim!S:S;Interim!T:T;Interim!U:U;Interim!V:V;Interim!W:W;Interim!X:X;Interim!Y:Y;Interim!Z:Z}),NOT(ISBLANK(unique({Interim!B:B;Interim!C:C;Interim!D:D;Interim!E:E;Interim!F:F;Interim!G:G;Interim!H:H;Interim!I:I;Interim!J:J;Interim!K:K;Interim!L:L;Interim!M:M;Interim!N:N;Interim!O:O;Interim!P:P;Interim!Q:Q;Interim!R:R;Interim!S:S;Interim!T:T;Interim!U:U;Interim!V:V;Interim!W:W;Interim!X:X;Interim!Y:Y;Interim!Z:Z}))))"); 
// Find the text before the end bracket "]" in copy -- this is the title text
  var cell = sheet.getRange("A1");
  cell.setFormula("=TRIM(LEFT(D1, FIND(\"]\", D1)))");
// Add the "lang" column values in the order that corresponds to the original translation order
  var cell = sheet.getRange("B1");
  cell.setFormula("=TRANSPOSE(SPLIT(JOIN(\"\,\"\, ARRAYFORMULA(REPT(SPLIT(\"en,fr,de,it,ja,pl,pt,es,tr\",\"\,\"\)&\"\,\"\, 1))), \"\,\"\))");

  var range = sheet.getRange("E1:E600");
  var lastRow = sheet.getLastRow();
  range.copyValuesToRange(sheet, 4, 4, 1, lastRow); 
// Find the text after the end bracket "]" in copy -- this is the copy
  var cell = sheet.getRange("C1");
  cell.setFormula("=TRIM(RIGHT(D1,LEN(D1)-FIND(\"]\",D1)))");
// At this point, we've moved copy around and the below is getting it all back in the right order
// Sometimes we copy and paste *values only* so the copy can be referred to from another sheet without breaking
  var oneRowCopy = sheet.getRange("C1");
  var targetRows = sheet.getRange(1,3,sheet.getLastRow(), 1);
  oneRowCopy.copyTo(targetRows);  
  
  sheet.deleteColumn(5);
  
  var range = sheet.getRange("C1:C600");
  var lastRow = sheet.getLastRow();
  range.copyValuesToRange(sheet, 3, 3, 1, lastRow);
  
  var oneRowCopy = sheet.getRange("A1");
  var targetRows = sheet.getRange(1,1,sheet.getLastRow(), 1);
  oneRowCopy.copyTo(targetRows);
  
  var range = sheet.getRange("A1:A600");
  var lastRow = sheet.getLastRow();
  range.copyValuesToRange(sheet, 1, 1, 1, lastRow);
  sheet.deleteColumn(4);
  
  var range = sheet.getRange("B1:B9");
  var lastRow = sheet.getLastRow();
  range.copyValuesToRange(sheet, 2, 2, 1, lastRow);
// Take the brackets out from around the [TITLE] values
  var cell = sheet.getRange("H1");
  cell.setFormula("=SUBSTITUTE(SUBSTITUTE(A1, \"]\", \"\"), \"[\", \"\")");
  
  var oneRowCopy = sheet.getRange("H1");
  var targetRows = sheet.getRange(1,8,sheet.getLastRow(), 1);
  oneRowCopy.copyTo(targetRows);  
  
  var range = sheet.getRange("H1:H600");
  var lastRow = sheet.getLastRow();
  range.copyValuesToRange(sheet, 1, 1, 1, lastRow);
  sheet.deleteColumn(8);
  sheet.insertRowBefore(1);

// Name the three columns with the values below
  var values = [
    [ "TITLE", "LANG", "COPY" ]
  ];
  var range = sheet.getRange("A1:C1");
  range.setValues(values);
}
