$(document).ready(function () {
    $(".btnCreate").on('click', function () {
        var value = $("#ing1").val()
        $("#mainIngName").val(value);
        $("#mainIngNameRecipe").val(value);
      })

  function getTitleFromUrl(inputURL) {
    $.ajax({
      url: "http://textance.herokuapp.com/title/" + inputURL,
      complete: function(data) {
        $("#recipeName").val(data.responseText);
      }
});}

$("#submitNewIngButton").on('click', function () {
  console.log("submitNewIngButton hit");
});

$("#submitRecipeButton").on('click', function () {
  console.log("submitRecipeButton hit");
});

$("#ingPlusButton").on('click', function () {
  console.log("ingPlusButton hit");
})

$(".submitButton").on('click', function () {
  console.log("submit clicked");
})
function writeTestData() {
  firebase.database().ref('bababooey').set("bababooey");
}

function addSympatico(mainIng, secondIngs) {
  const newPostKey = firebase.database().ref().child('posts').push().key;
  firebase.database().ref(mainIng + "/" + "affinities/" + newPostKey).set(secondIngs);
}

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}
//TODO Validate URL Input
  $("#modalSearchButton").on("click", function() {
    let url = $("#ingURL").val()
    $("#recipeName").val(getTitleFromUrl(url)); 
    $("#recipeSource").val(extractHostname(url))
    // writeTestData();
    let testSympatico = ["clove", "cardamom"]
    addSympatico("grape", testSympatico);
  } )
})