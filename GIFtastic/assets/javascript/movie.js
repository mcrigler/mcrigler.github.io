
 // JavaScript function that wraps everything

 $(document).ready(function() {
    console.log("Start js GIFtastic")

    // --------------------------------------------- //
    // ------  Initialize Global Variables --------  //

    var moviesArray = ["Kung Fu Hustle", "The Fifth Element", "Shawshank Redemption", "Fargo", "Die Hard", "Pulp Fiction", 
                       "Enter the Dragon", "The Last Dragon", "Blazing Saddles", "History of the World, Part I", "Young Frankenstein",
                       "Hot Fuzz", "Godfather",  "Guardians of the Galaxy", "True Lies", "Matrix",   "Miss Sloane", "Hidden Figures"]; 
    var movieSelected = "";
    var movieLimit = 10; 



    // --------------------------------------------- //
    // ------  Create Reusable Functions   --------  //

    // Build the movie buttons   //
    function buildButtons(){

      $("#movie-buttons").empty();
      console.log("Build Buttons for: " + moviesArray);

      for (var i=0; i < moviesArray.length; i++) {
        var mbutton = $("<button>");
          mbutton.addClass("movie-btn btn");
          mbutton.attr("data-name", moviesArray[i]);
          mbutton.text(moviesArray[i]);

        $("#movie-buttons").append(mbutton);
      }
    };



    // Get the movie data  //
    function getMovieData(){
      console.log("Get Movie Data");
      $("#movie-data").empty();
      var queryURLmovieData = "https://www.omdbapi.com/?t=" + movieSelected + "&y=&plot=short&r=json";
      console.log("The selected movie data URL is: " + queryURLmovieData);

      $.ajax({
        url: queryURLmovieData,
        method: "GET"
        }).done(function(response){
             console.log(response);

          var movieDataDiv = $("<div>");
            movieDataDiv.addClass("movieData mdata");

            var movieDataTitle = response.Title;
            var pTitle = $("<h2 class='mdata'>").text(movieDataTitle);
            movieDataDiv.append(pTitle);

            var movieDataYear = response.Year;
            var pYear = $("<p class='mdata'>").text("Year: " + movieDataYear);
            movieDataDiv.append(pYear);

            var movieDataGenre = response.Genre;
            var pGenre = $("<p class='mdata'>").text("Genre: " + movieDataGenre);
            movieDataDiv.append(pGenre);

            var movieDataRated = response.Rated;
            var pRated = $("<p class='mdata'>").text("Rated: " + movieDataRated);
            movieDataDiv.append(pRated);

            var movieDataPlot = response.Plot;
            var pPlot = $("<p class='mdata'>").text("Plot: " + movieDataPlot);
            movieDataDiv.append(pPlot);

          $("#movie-data").append(movieDataDiv);
        })
    };


    // Get the movie images  // 
    function getMovieImages(){
     console.log("Get Movie Images");
      $("#movie-images").empty();
      var queryURLmovieImage = "https://api.giphy.com/v1/gifs/search?q=" +
      movieSelected + "&api_key=dc6zaTOxFJmzC" + "&limit="+ movieLimit;
      console.log("The selected movie images URL is: " + queryURLmovieImage)

      $.ajax({
        url: queryURLmovieImage,
        method: "GET"
      }).done(function(response) {
           console.log(response);

          var imageResults = response.data;

          for (var i=0; i < imageResults.length; i++) {
             var movieImageDiv = $("<div>");
              movieImageDiv.addClass("movieImage mimage");

                var movieImage =$("<img>");
                movieImage.addClass("gif");
                movieImage.attr("src", imageResults[i].images.fixed_height_still.url);
                movieImage.attr("data-still", imageResults[i].images.fixed_height_still.url);
                movieImage.attr("data-animate", imageResults[i].images.fixed_height.url);
                movieImage.attr("data-state", "still");
              movieImageDiv.append(movieImage);

                var imageRating = imageResults[i].rating;
                var pImgRating = $("<p>").text("Rating: " + imageRating);
              movieImageDiv.append(pImgRating);

              $("#movie-images").append(movieImageDiv);
          }


        });
    };



    // --------------------------------------------- //
    // ----------  Event Listeners   --------------  //

    //  Add movie button   /
    $("#add-movie").on("click", function(event){
      event.preventDefault();
      var movieAdded = $("#movie-add").val().trim();
      moviesArray.push(movieAdded);
      console.log("New Movies List: " + moviesArray);
      buildButtons();
    })


    //  movie buttons  //
    $(document).on("click", ".movie-btn", function(){
        movieSelected = $(this).attr("data-name");
         console.log("Movie selected is: " + movieSelected);
        getMovieData();
        getMovieImages();
    });


    // movie images   //
    $(document).on("click", ".gif", function(){
      var state = $(this).attr("data-state");
      console.log( $(this).attr("src"));
      
      if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate")); 
        $(this).attr("data-state" ,"animate");
        } else {
           $(this).attr("src", $(this).attr("data-still")); 
           $(this).attr("data-state" ,"still");
        }  

    });





    // --------------------------------------------- //
    // ----------  Main Program Code    -----------  //
    console.log("Make call to build buttons")
    buildButtons();

  });