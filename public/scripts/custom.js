$('select').dropdown();
$('.dropdown').dropdown();

$('#addFixModal').modal('attach events','#addFix','show');//when #addfix button is sclicked, #addfixModal is run

$('#addItemModal').modal('attach events','#addItem','show');
$('.menu .item').tab();