//check password
function checkPasswordMatch() {
  var password = $("#inputpasswordone").val();
  var confirmPassword = $("#inputpasswordtwo").val();

  if (password != confirmPassword)
      $("#divCheckPasswordMatch").html("Passwords do not match!");
  else
      $("#divCheckPasswordMatch").html("Passwords match.");
}
 
$('.newuserModal').modal('hide');
//vars
var usernameHolder;
var idholder;
//onclick for mmodal
$(document).on("click", ".newuserBtn", showNewuser);
function showNewuser(){
  console.log('clicked');
  $('.newuserModal').modal('toggle');
}
$(document).ready(function() {
  $('.newuserModal').modal('hide');
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  //newuserform
  $(document).on("submit", ".newuserForm", handlenewuserSubmit);

  //checkpassword
  $("#inputpasswordtwo").keyup(checkPasswordMatch);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);
//on click for new user



//fucntions to show modals

  // Getting the initial list of user
  getusersPage();

  // A function to handle what happens when the form is submitted to create a new user
  function handlenewuserSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if ((!$("#firstName").val().trim())
    && (!$("#lastName").val().trim())
    &&(!$("#emailAddress").val().trim())
    &&(!$("#userName").val().trim())
    &&(!$("#inputpasswordone").val().trim())
    &&(!$("#inputpasswordtwo").val().trim())) {
      return;
    }
    usernameHolder =$("#userName").val();
    console.log(usernameHolder);
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertAuthor({
      firstname:$("#firstName").val(),
      lastname:$("#lastName").val(),
      email:$("#emailAddress").val(),
  username:$("#userName").val(),
  password: $("#inputpasswordone").val()
    });
  }

  // A function for creating an author. Calls usersId upon completion
  function upsertAuthor(authorData) {
    $.post("/api/Users", authorData)
      .then(usersId);
  }

    // Function for retrieving authors and getting them ready to be rendered to the page
    function usersId() {
      $.get("/api/Users/" + usernameHolder, function(data) {
        console.log(data);
        idholder =data.id;
        getusersPage();
   
      });
    }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getusersPage() {
    $.get("/api/Usersid/" + idholder, function(data) {
      console.log(data);
     movetoUsers();
 
    });
  }
  function movetoUsers(){
    $.get("/home")
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/Users/" + id
    })
      .then(getusersPage);
  }
});
