$(document).ready(function () {
  var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  var localDb = {
    "apple": {
      0: ["Allspice", "Cinnamon", "Cloves", "Ginger", "Maple Syrup", "Orange"],
      1: ["almonds", "cinnnamon", "rosemary"],
      2: ["caramel", "nuts"],
      3: ["cloves", "cranberries", "oranges"],
      4: [""],
      5: [""]
    },
    "black beans": {
      0: ["Allspice", "Cinnamon", "Cloves", "Ginger", "Maple Syrup", "Orange"],
      1: ["almonds", "cinnnamon", "rosemary"],
      2: ["caramel", "nuts"],
      3: ["cloves", "cranberries", "oranges"],
      4: [""],
      5: [""]
    },
    coffee: {}
  }

  $('#ing1').on('typeahead:selected', function (evt, item) {
    if (localDb.hasOwnProperty(item.value)) {
      $(".card").each(function (index) {

        if (!$(this).hasClass("loadMoreCard")) {
          $(this).children(".card-title").html(item.value + " &");
          $(this).children(".card-body").html(localDb[item.value][index].toString().split(',').join(" & <br />"));
          $('.results1').removeClass("d-none");
          // console.log(index)

        }

      });
    }
    else {
      console.log("not found");
      $(".nonExist").removeClass("d-none")
    }


    console.log(item.value)
  })
  let engine = new Bloodhound({
    local: Object.keys(localDb),
    remote: {
      wildcard: '%QUERY',
      url: 'https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=a28bfe4ec27d4aab800593279a6efcf7&query=%QUERY&number=10',
      // Map the remote source JSON array to a JavaScript object array
      transform: response => $.map(response, ing => ({
        value: ing.name
      }))
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.value);
    }
  })

  $('#ing1').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
    {
      name: 'bloodhound',
      display: 'value',
      source: engine
      // source: substringMatcher(Object.keys(localDb))
    });
});