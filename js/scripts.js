$(document).ready(function () {
  const substringMatcher = function (strs) {
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

  const randomizer = {
    "Apple": "🍎",
    "Banana": "🍌",
    "Coconut": "🥥",
    "Tomato": "🍅",
    "Avocado": "🥑",
    "Eggplant": "🍆",
    "Carrot": "🥕",
    "Broccoli": "🥦",
    "get3": function () {
      let arr = [];
      let stringArr = [];
      let max = Object.keys(randomizer).length - 1;
      while (arr.length < 3) {
        let randomNum = Math.floor(Math.random() * Math.floor(max))
        let key = Object.keys(randomizer)[randomNum];
        if (!arr.includes(randomizer[key])) {
          arr.push(randomizer[key]);
          stringArr.push(randomizer[key] + " " + Object.keys(randomizer)[randomNum])
        }
      }
      return stringArr;
    }
  }
//TODO add all emoji foods to db
//TODO add recipe suggestion section
//TODO add isVegan isVegetarian props

  const affinityDb = {
    "apple": {
      affinities: {
        0: ["Allspice", "Cinnamon", "Cloves", "Ginger", "Maple Syrup", "Orange"],
        1: ["almonds", "cinnnamon", "rosemary"],
        2: ["caramel", "nuts"],
        3: ["cloves", "cranberries", "oranges"],
        4: [""],
        5: [""]
      }
    },
    "black beans": {
      affinities : {
        0: ["Bell Peppers", "Corn", "Scallions"],
        1: ["Chiles", "Cilantro", "Lime", "Oregano", "Red Onions"],
        2: ["Mango", "Quinoa"],
        3: ["Oregano", "Sage", "Thyme"],
        4: ["Chili Powder", "Cumin", "Garlic", "Onions", "Tomatoes"],
        5: ["Kale", "Sweet Potatoes"]
      }
    },
    "banana": {
      affinities: {
        0: ["Almond Milk", "Nutmeg", "Vanilla"],
        1: ["Almonds", "Oatmeal"],
        2: ["Apple Juice", "Cinnamon"],
        3: ["Apricots", "Yogurt"],
        4: ["Cashews", "Pineapple"],
        5: ["Peaches", "Raspberries"]
      },
    },
    "broccoli": {
      affinities: {
        0: ["Chiles", "Garlic Powder", "Olive Oil"],
        1: ["Garlic", "Ginger" , "Sesame Oil", "Tamari"],
        2: []

      }
    },
    "coffee": {

    },
    "coconut": {
      affinities: {
        0: ["Curry", "Peanuts", "Tofu"],
        1: ["Brown Sugar", "Vanilla", "Ginger"],
        2: ["Cranberries", "Granola", "Hazelnuts"],
        3: ["Lemongrass", "Passionfruit"],
        4: ["Pineapple", "Rum"],
        5: ["Curry Powder", "Sweet Potatoes"]

      }
    },
    "tomato": {
      affinities: {
        0: ["Avocados", "Chiles", "Cilantro", "Garlic", "Scallions", "Vinegar"],
        1: ["Balsamic Vinegar", "Basil", "Garlic", "Olive Oil"]
      }
    }
  }

  let myThree = randomizer.get3()
  for (i = 0; i < 3; i++) {
    $(".suggestionButton").eq(i).text(myThree[i]);
  }

  $("#createButton").on('click', function () {
    var value = $("#ing1").val()
    console.log(value);
    $("#mainIngName").val(value);
  })

  $("#submitButton").on('click', function () {
    var mainIng = $("#mainIngName").val()
    var combWith = $("#added-ing-text").val()
    var arr = [combWith]
    affinityDb[mainIng] = arr
  })

  $('#ing1').on('input', function () {
    console.log(this.value);
    if (this.value === "") {
      $(".nonExist").addClass("d-none");
      $(".results1").addClass("d-none");
      $(".orTry").removeClass("d-none")
    }
  })

  $('.suggestionButton').on('click', function () {
    var t = $(this).text()
    var strippedT = emojiStrip(t).trim()
    console.log(t);
    $("#ing1").val(t);
    lookupTool(t);
  });

  const lookupTool = function (ingoo) {
    console.log(ingoo.toLowerCase())
    let strippedIngoo = emojiStrip(ingoo).trim().toLowerCase()
    if (affinityDb.hasOwnProperty(strippedIngoo)) {
      $(".card").each(function (index) {
        let strippedT = emojiStrip(ingoo).trim()
        if (!$(this).hasClass("loadMoreCard")) {
          $(this).children(".card-title").html(ingoo + " &");
          $(this).children(".card-body").html(affinityDb[strippedIngoo].affinities[index].toString().split(',').join(" & <br />"));
          $('.results1').removeClass("d-none");
          $('.orTry').addClass('d-none')
        }
      });
    } else {
      console.log("not found");
      $(".nonExist").removeClass("d-none");
      $(".orTry").addClass("d-none");
    }
  }


  $('#ing1').on('typeahead:selected', function (evt, item) {
    lookupTool(item.value)
  })

  let engine = new Bloodhound({
    local: Object.keys(affinityDb),
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