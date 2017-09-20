function onOpen() {
// Add a custom menu to the Google Doc.
  SpreadsheetApp.getUi()
      .createMenu('Automate-it!')
      .addItem('Find and Replace', 'menuItem1')
      .addToUi();
}

function menuItem1() { 
  var r=SpreadsheetApp.getActiveSheet().getDataRange();
  var rws=r.getNumRows();
  var cls=r.getNumColumns();
  var i,j,a,find1,repl1,find2,repl2,find3,repl3,find4,repl4,find5,repl5;
// Assign each "find" variable a corresponding "repl" variable, the script will search each cell for any of the "find" text and replace with the corresponding value
  find1="EXAMPLE_1";
  repl1="REPLACE_1";
  find2="EXAMPLE_2";
  repl2="REPLACE_2";
  find3="EXAMPLE_3";
  repl3="REPLACE_3";
  find4="EXAMPLE_4";
  repl4="REPLACE_4";
  find5="EXAMPLE_5";
  repl5="REPLACE_5";
  for (i=1;i<=rws;i++) {
    for (j=1;j<=cls;j++) {
      a=r.getCell(i, j).getValue();
      if (r.getCell(i,j).getFormula()) {continue;}
      try {
        a=a.replace(find1,repl1);
        a=a.replace(find2,repl2);
        a=a.replace(find3,repl3);
        a=a.replace(find4,repl4);
        a=a.replace(find5,repl5);
        r.getCell(i, j).setValue(a);
      }
      catch (err) {continue;}
    }
  }
}