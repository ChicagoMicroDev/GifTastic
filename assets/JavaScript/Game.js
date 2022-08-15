var topics = ["Tom Brady", "Top Gun", "Bf4", "World Cup", "Chicago",
    "Arizona", "Baseball", "Samsung", "Dank", "Football",
    "Hacking", "Westworld", "Driving", "Lebron", "Nba Finale",
    "Black Hawk down", "Training day", "Ricky Bobby"];
var numberOfGIFs = 10;
var cutOffRating = "PG";

function renderButtons(){
    for(var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn");
        newButton.addClass("gif-button");
        newButton.text(topics[i]);
        $("#button-container").append(newButton);
    }
    $(".gif-button").unbind("click");
    $(".gif-button").on("click", function(){
        $(".gif-image").unbind("click");
        $("#gif-container").empty();
        $("#gif-container").removeClass("dotted-border");
        populateGIFContainer($(this).text());
    });

}

function addButton(show){
    if(topics.indexOf(show) === -1) {
        topics.push(show);
        $("#button-container").empty();
        renderButtons();
    }
}

function populateGIFContainer(show){
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + show +
        "&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
        method: "GET"
    }).then(function(response){
        response.data.forEach(function(element){
            console.log(response);
            newDiv = $("<div>");
            newDiv.addClass("col col-md-4 p-4");
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gif-image");
            newImage.attr("state", "still");
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animated-data", element.images.fixed_height.url);
            newDiv.append(newImage);
            $("#gif-container").append(newDiv);
        });
    });
}

$(document).ready(function(){
    renderButtons();
    $("#submit").on("click", function(){
        event.preventDefault();
        addButton($("#gif-show").val().trim());
        $("#gif-show").val("");
    });
});
//Not finish need to work on running the gif and stopping the gif.
// Also need to add some styling