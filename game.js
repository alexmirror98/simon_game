var buttonColours = ["red", "blue", "green", "yellow"]; //aray for the game

var gamePattern = []; //empty array for a new game

var userClickedPattern = []; //player pattern array

var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id"); //handler to store id of the button that got clicked
    userClickedPattern.push(userChoosenColor); //add cliked color to the player's array 
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audioGO = new Audio("sounds/wrong.mp3");
        audioGO.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, press any key to Restart");
        startOver();
        console.log("wrong");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4); //random number from 0 to 3
    var randomChoosenColour = buttonColours[randomNumber]; //choose the random color from array by helping randomNumber
    gamePattern.push(randomChoosenColour); //add new chosen color to array
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animatin for the button by helping jQuery
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); //choose the sound for the button
    audio.play(); 
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
