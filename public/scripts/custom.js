var fixes = [];
$.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost:3000/fix/fixlist",
    success: function(data){
        console.log("success");
        console.log(data);
        for(var i = 0; i <data.length; i++){
            fixes.push(data[i].fixNumber)
        }
        for(var i = 0;i<fixes.length; i++){
            $("#"+fixes[i]+"testCompleteModal").modal('attach events', "#"+fixes[i]+"testComplete", 'show');
        }
    }
})

//login form validation
$(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            username: {
              identifier  : 'username',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your userid'
                }/*,
                {
                  type   : 'username',
                  prompt : 'Please enter a valid e-mail'
                }*/
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your password'
                },
                {
                  type   : 'length[6]',
                  prompt : 'Your password must be at least 6 characters'
                }
              ]
            }
          }
        })
      ;
    })
  ;

function test_Complete(fixID){
    console.log("test complete: "+fixID);
    $("#"+fixID+"-testCompleteModal").modal('attach events', "#"+fixID+"-testComplete", 'show');
}

$('select').dropdown();
$('.dropdown').dropdown();

$('#addFixModal').modal('attach events','#addFix','show');//when #addfix button is sclicked, #addfixModal is run

$('#addItemModal').modal('attach events','#addItem','show');


//$('.testCompleteModal').modal('attach events','.testComplete','show');

$('.menu .item').tab();