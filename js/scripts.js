$(document).ready(function() {
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
       apple: {
           0: ["allspice", "cinnamon", "cloves", "ginger", "maple syrup", "orange"],
           1: ["almonds", "cinnnamon", "rosemary"],
           2: ["caramel", "nuts"],
           3: ["cloves", "cranberries", "oranges"],
           4: [""],
           5: [""]
       },
       black_beans: {

       },
       coffee: {}
    }

        $('#ing1').on('typeahead:selected', function(evt, item) {
                $(".card-body").each(function( index ) {
                    $(this).html(localDb[item][index].toString().split(',').join(" & <br />"));
                    console.log(index)
                });
            console.log(item)

        })
        
        $('#ing1').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
            {
                name: 'keys',
                source: substringMatcher(Object.keys(localDb))
            });
});