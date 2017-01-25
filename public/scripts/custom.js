var fixes = [];
var items = [];
$.ajax({//get all fixes from server, to be used as needed in the application
    type: "GET",
    dataType: "json",
    url: "http://localhost:3000/fix/fixlist",
    success: function(data){
        console.log("success");
        console.log(data);
        //now push each fix id into fixes[]. 
        //the original problem here was that I need the testCompleteModal to be called for each fix in the fixList, but each time it is called it needs to be unique to each fix
        //so that it sends the right information to the server. in this case that it lets the server know, mark fixxxxx as testComplete. Typically a modal doesnt store view data, 
        //i.e. when ypu click a button and it shows a modal, the modal doesnt care what button was click, it simply responds to that button/id/element.
        //so I had to find a way to inject data into it. and thats what I'm doing here. Using the fixID to create a unique element ID, I attach a specific modal show event to each fix
        //in the list. 
        for(var i = 0; i <data.length; i++){
            fixes.push(data[i].fixNumber)
        }
        for(var i = 0;i<fixes.length; i++){
            $("#"+fixes[i]+"testCompleteModal").modal('attach events', "#"+fixes[i]+"testComplete", 'show');
        }
    },
    fail: function(jqXHR, textStatus){
      console.log(textStatus);
      console.log(jqXHR);
    }
})
$.ajax({//get all items for server, to be used as needed in the application
  type: "GET",
  dataType: "json",
  url: "http://localhost:3000/items/itemList",
  success: function(data){
    //console.log(data);
    for(var i = 0; i< data.length; i++){
      items.push(data[i].id);
    }
    console.log(items);

    for(var i = 0; i<items.length;i++){
      $("#"+items[i]+"-editItemModal").modal("attach events", "#"+items[i]+"-editItem", "show");

      //$("#"+items[i]+"-deleteItemModal").modal("attach events", "#"+items[i]+"-deleteItem", "show");
    }
  },
  fail: function(jqXHR, textStatus){    
    console.log(textStatus);
    console.log(jqXHR);
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
                /*{
                  type   : 'length[6]',
                  prompt : 'Your password must be at least 6 characters'
                }*/
              ]
            }
          }
        })
      ;
    })
;

//transition messages
$( '.message .close' )
  .on( 'click', function () {
    $( this )
      .closest( '.message' )
      .transition( 'fade' )
    ;
} )
;

function test_Complete(fixID){
    console.log("test complete: "+fixID);
    $("#"+fixID+"-testCompleteModal").modal('attach events', "#"+fixID+"-testComplete", 'show');
}

$('select').dropdown();
$('.dropdown').dropdown();

$('#addFixModal').modal('attach events','#addFix','show');//when #addfix button is sclicked, #addfixModal is run

$('#addItemModal').modal('attach events','#addItem','show');

$('#calendar').calendar();

//$('.testCompleteModal').modal('attach events','.testComplete','show');

$('.menu .item').tab();

var drop = function(){
  console.log("drop called");
  $('#createProjectModal').transition('drop');
}

