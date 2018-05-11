var topics = ["celtic", "river", "jazz", "big band", "break", "kids", "pop n lock", "krumping", "salsa", "afrobeat", "partner", "interpretive", "k-pop", 
                "modern", "running man", "moonwalk", "dab", "nay nay", "nursing home", "old people", "white people"];
    //API call to Giphy

var originalImageUrl;
var stillImageUrl;
var newImage;
var queryURL;
        
// Your app should take the topics in this array and create buttons in your HTML.
// * Try using a loop that appends a button for each string in the array.

function apiCall() {
    console.log(queryURL + "1");
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {

                //calls the original image gif and the original still from the object and assign those URL's to attributes in a new img
                for(i = 0; i < 10; i++) {
                    console.log(response.data[i])
                    originalImageUrl = response.data[i].images.original.url;
                    stillImageUrl = response.data[i].images.original_still.url;
                    var rating = response.data[i].rating;
                    console.log(rating);
                    newImage = $("<img src='" + stillImageUrl + "' data-still='" + stillImageUrl +  "' data-animate='" + originalImageUrl + "' data-state='still' class='gif border border-white'>");
                    newImageP = $("<p class = 'rating'>");
                    newDiv = $("<div class = 'mr-2 text-center border border-white'>");
                    $(newImageP).text("Rated: " + rating)
                    $(newImage).append(newImageP);
                        
                    //adds the img HTML just created to the HTML in the second row.
                    $(newDiv).append(newImage, newImageP);
                    $(".secondRow").prepend(newDiv);
                    
                    console.log(newImage);
                }
                //calls the function for when the user clicks on the image to stop/start it
            
            });
} 


function clear() {
    $(".firstRow").empty();
}
                                        
function buttonBuilder() {
    for (i = 0; i < topics.length; i++) {
        var buttonBuild = $("<button type = 'button' class = 'buttonDiv p-2 ml-2 mt-2 col-1 btn btn-warning border border-danger rounded'>" + topics[i] + "</button>");
        $(".firstRow").append(buttonBuild);
    };

}     

function newButton() {
     // 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
     $(document).on("click", "#userButton", function(event) {
        event.preventDefault();
        var userInput =  $("#exampleDanceInput")
        .val()
        .trim();
        console.log(userInput);
        topics.push(userInput);
        console.log(topics);
        clear();
        buttonBuilder();
    });
}

function makeGif() {
    $(document).on("click", ".buttonDiv", function(e) {
        var searchTerm = e.target.textContent;
        console.log(searchTerm + " dancing");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "+dancing&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        apiCall();
    });
}


$(document).ready(function() {
    buttonBuilder();
    newButton();
    makeGif();
})

$(document).on("click", ".gif", function() {
    console.log("You clicked the gif");
    var state = $(this).attr("data-state");
    console.log(state + "1");
    //if the state of the image is still, change the URL in the source attribute to the URL that's in the data-animate attribute
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        //change the data state attribute to "animate" now
        $(this).attr("data-state", "animate");
        console.log(state + "2");
        console.log($(this).attr("src"));
    } else {
        //if the data state attribute is set anything else, change the source attribute to the URL in the data-still attribute
        $(this).attr("src", $(this).attr("data-still"));
            //change the data state attribute to "still" now
        $(this).attr("data-state", "still");
        console.log(state + "3");
    }
});