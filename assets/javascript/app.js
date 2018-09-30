//The JS that works for GifTastic!
//the buttons that are there already
var topics = ['Brooklyn 99', 'The Nanny', 'The Good Place', 'Dynasty', 'Seinfeld', 'The Golden Girls', 'Will and Grace', 'Dr. House' ];


//function that makes a button for each of series
function printSeries() {

    for (let i = 0; i < topics.length; i++) {

        $newButton = $('<button>');
        $newButton.attr('type', 'button');
        $newButton.addClass('btn btn-dark btn-sm m-1 gif-button');
        $newButton.text(topics[i]);

    $('.button-wrapper').append($newButton);
    }
}

//function to create a newButton with user input
function newButton() {

    event.preventDefault();

    var newSeries = $('#submit-form').val().trim();
    if (newSeries==""){
        return null;
    }
    $newButton = $('<button>');
    $newButton.attr('type', 'button');
    $newButton.addClass('btn btn-dark btn-sm m-1 gif-button');
    $newButton.text(newSeries);
    topics.push(newSeries);

$('.button-wrapper').append($newButton);
$('#submit-form').val('');
}


$(document).ready(function () {

printSeries();

//click listener? creates buttons with what the user just wrote
$('#submit-button').on('click', function () {
    
newButton();    
})


// AJAX Call
$(document).on('click', '.gif-button', function () {

    event.preventDefault();

    var search = $(this).text().toLowerCase().replace(/ /g, "+");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=ZoGjTUTQeN4wCe8yV7zf3WC1PTYpMR4G&limit=10';

    //console.log(queryURL);
    $.ajax({

    url: queryURL,
    method: 'GET'

    }).then(function (response) {

    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

        var gifCard = $('<div class="card">'); 
        var imageGif = $('<img>'); 
        var cardText = $('<p>');
        // Storing the result item's rating
        var rating = results[i].rating;

        imageGif = gifAttribute(imageGif, results[i]); //for still and animate
        cardText.text("Rating: "+rating); //rating
        gifCard.addClass('m-1')

        gifCard.prepend(imageGif);
        gifCard.append(cardText);

        $('.gif-wrapper').prepend(gifCard);

    }

})

//Animate Listener

$(document).on('click', '.gif', function () {

    var state = $(this).attr('data-state');

    if (state === 'still') {

    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');

    } else {

    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
    }
})

})

// Still and Animate Gif

function gifAttribute(gif, results) {

    gif.attr('src', results.images.fixed_width_still.url);
    gif.attr('data-still', results.images.fixed_width_still.url);
    gif.attr('data-animate', results.images.fixed_width.url);
    gif.attr('data-state', 'still');
    gif.addClass('gif card-img-top');
    return gif;
    
}})