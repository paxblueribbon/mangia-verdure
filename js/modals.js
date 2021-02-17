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
        // return data.responseText
      }
});}

//su

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
  } )
})