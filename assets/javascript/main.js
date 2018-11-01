$(function() {
  var allTopics = ["batman", "justin bieber", "matrix", "racoon"];
  var bubble = [];
  var list = [];
 var number = 0;

//  creates default button for search

  function mainButtons() {
    $("#manyButtons").empty();

    for (var j = 0; j < allTopics.length; j++) {
      $("#manyButtons").append(
        "<button class='create'>" + allTopics[j] + "</buttons>"
      );
    }
  }
// get from API and add giphs and posters to the main screen
  function imageScreen(choice, count) {
    // $("#images").empty();

    // for (var i = 0; i < 2; i++) {
    choice = choice.split(" ").join("+");

    var giphURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      choice +
      "&api_key=oZTcaQVjm4g0tkmKLvunW5p5xmwZ0FKZ";

    $.ajax({
      url: giphURL,
      method: "GET"
    }).then(function(response) {
      var giph=$("<p>Giph by topic:</p>");
      var ImgGiph = $(
        "<div class='size'><img class='imgAnimate' data-giph-fav='" +
          count +
          "' src='" +
          response.data[count].images.original_still.url +
          "'></div>"
      );

      var btnGiphFav = $(
        "<button class='fav' data-giph-btn='" + count + "'>Favorite</button>"
      );

      var infoGiph = $("<p>The title is: " + response.data[count].title + "</p>");

      $("#images").append(giph,ImgGiph, infoGiph, btnGiphFav);
    });

    var omdbURL = "http://www.omdbapi.com/?s=" + choice + "&apikey=3231251c";

    $.ajax({
      url: omdbURL,
      method: "GET"
    }).then(function(response) {
      var poster=$("<p>Poster by topic:</p>");
      var ImgOMDB = $(
        "<div class='size'><img data-poster-fav='" +
          count +
          "' src='" +
          response.Search[count].Poster +
          "'></div>"
      );

      var btnPosterFav = $(
        "<button class='fav' data-poster-btn='" + count + "'>Favorite</button>"
      );
      var infoOMDB = $(
        "<p>The title is: " + response.Search[count].Title + "</p>"
      );

      if (response.Search[count].Poster != "N/A") {
        $("#images").append(poster,ImgOMDB, infoOMDB, btnPosterFav);
      }
    });
  }

    // add img to favorite and store in sessionStorage
  function favoriteFunct(yourChoice) {
    var blabla;
    
    $("#fav").removeClass("hide");

    if ($(yourChoice).attr("data-giph-btn")) {
      var choice = $(yourChoice).attr("data-giph-btn");
      var picture = $("img[data-giph-fav='" + choice + "']");
      var favImg = $(
        "<div class='size'><img class='favImg"+number+"' src='" +
          picture.attr('src') +
          "'></div>"
      );
      $("#favorite").append(favImg);
    } else if ($(yourChoice).attr("data-poster-btn")) {
      var choice = $(yourChoice).attr("data-poster-btn");
      var picture = $("img[data-poster-fav='" + choice + "']");
      var favImg = $(
        "<div class='size'><img class='favImg"+number+"' src='" +
          picture.attr('src') +
          "'></div>"
      );
      $("#favorite").append(favImg);
    }
    blabla = $(".favImg"+number).attr("src");

    list.push(blabla);

    sessionStorage.setItem("something", JSON.stringify(list));
    number++;
  }
// using for additional button creation
  $("#buttonCreator").click(function(e) {
    e.preventDefault();

    var addButton = $("#text").val();
    allTopics.push(addButton);
    mainButtons();
  });
// when additional button pressed add new img
  $(document).on("click", ".create", function(e) {
    e.preventDefault();
    var choice = $(this).text();
    var count = 0;
    for (var i = 0; i < 2; i++) {
      imageScreen(choice, count);
      count++;
    }
  });

  // make giph static or animate
  $(document).on("click", ".imgAnimate", function(e) {
    e.preventDefault();
    var src = $(this).attr("src");
    if ($(src.split("_")).last()[0] == "s.gif") {
      $(this).attr("src", src.replace("_s.gif", ".gif"));
    } else {
      $(this).attr("src", src.replace(".gif", "_s.gif"));
    }
  });

  // pressed button adds img to favorite
  $(document).on("click", ".fav", function(e) {
    e.preventDefault();
    var yourChoice = $(this);
    favoriteFunct(yourChoice);
  });
// main function calls
  mainButtons();
// retrieve data from sessionStorage
  bubble = JSON.parse(sessionStorage.getItem("something"));
  if (bubble != undefined) {
    bubble.forEach(function(list) {
      var blaca = $('<div class="size"><img src="' + list + '"></div>');
      $("#fav").removeClass("hide");
      $("#favorite").append(blaca);
    });
  }
});
