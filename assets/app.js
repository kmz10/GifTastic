
$( document ).ready(function() {
    // call the function to create the buttons
    addButtons();

});



//this is the array  for the first appearing btns on the web page
var topics = ["goku", "vegeta","frieza","cell","gohan","jiren","bardock","krillin","bulma","trunks","raditz","goten","videl","nappa","dende","korin","android 18","android 17","android 16","master roshi"];

console.log(topics);

//purpose of this code is to dynamically generate buttons using only jquery

function addButtons(){
    $("#btnCollection").empty();
    for (var i = 0; i < topics.length; i++) {
        var createBtn = $("<button>");
        createBtn.addClass("topic btn btn-primary");
        createBtn.attr("data-name", topics[i]);
        createBtn.text(topics[i]);
        $("#btnCollection").append(createBtn);
    }
};


$("#add-topic").on("click", function (event) {
    event.preventDefault();

    var topic = $("#topic-input").val().toLowerCase().trim();
    alert(topic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=e1arkG0TiWUMmfNe2QL6VXZs2iX0JmZZ";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        if (response.data.length == 0) {
            alert("No Gifs found for topic");
        }
        else if (topics.indexOf(topic) != -1) {
            alert("Topic already exists");
        }
        else {
            topics.push(topic);
            addButtons();
        }
    });
});



function displayGifs () {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=e1arkG0TiWUMmfNe2QL6VXZs2iX0JmZZ";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      console.log(response);

      $(".imgColection").empty();
      for (var i = 0; i < response.data.length; i++) {

          var amount = response.data.length;
          console.log(amount);

          if (i < 10) {
          var gifDiv = $("<div>");
          gifDiv.addClass("gifDiv col-4");
          gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

          var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          gifImage.addClass("gif");

          var imageDiv = $("<div>");
          imageDiv.addClass("play");
          imageDiv.attr("data-state", "still");
          imageDiv.attr("data-name", topic);
          imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
          imageDiv.attr("data-animate",response.data[i].images.fixed_height.url)
          
          $(imageDiv).append(gifImage);
          $(gifDiv).append(imageDiv);
          $(".imgColection").append(gifDiv);
      
          }
    }

    });
};


function playGif () {

    if ($(this).attr("data-state") == "still") {
        $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).html("<img src='" + $(this).attr("data-still") + "'>");
        $(this).attr("data-state", "still");
    }

};

$(document).on("click", ".topic", displayGifs);
$(document).on("click", ".play", playGif);



