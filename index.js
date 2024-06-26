var blue = new Audio('./sounds/blue.mp3');
var red = new Audio('./sounds/red.mp3');
var green = new Audio('./sounds/green.mp3');
var yellow = new Audio('./sounds/yellow.mp3');

const computerPattern = [];
const playerPattern = [];

var readyToPlay = false;
var shouldClick = true;

var level = 1;
var playerButtonsPressed = -1;

$(document).ready(function() {
    $(".btn").on("click", function() {
        var colorClicked = this.id;
        $("#" + colorClicked).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);
        playColorSound(colorClicked);
        playerPattern.push(colorClicked);
        playerButtonsPressed++;
        checkIfCorrect(colorClicked);
    });
});

document.addEventListener('keydown', function(event) {
    toggleReady();
});


function playColorSound(colorClicked) {

    switch(colorClicked) {
        case 'blue':
            blue.play();
            break;
        case 'red':
            red.play();
            break;
        case 'green':
            green.play();
            break;
        case 'yellow':
            yellow.play();
            break;
        default:
            break;
    }
}

function pickNextNumber() {
    return Math.floor(Math.random() * (4 - 1 + 1) + 1);
}

function addToComputerSequence() {
    var nextToAdd = pickNextNumber();
    switch(nextToAdd) {
        case 1:
            computerPattern.push('green');
            break;
        case 2:
            computerPattern.push('red');
            break;
        case 3:
            computerPattern.push('yellow');
            break;
        case 4:
            computerPattern.push('blue');
            break;
        default:
            break;
    }
}

function playPattern() {
    for (var i = 0; i < computerPattern.length; ++i) {
        // Use setTimeout to delay each iteration
        setTimeout(function(index) {
            playColorSound(computerPattern[index]);
            $("#" + computerPattern[index]).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);
        }, i * 500, i); // Multiply by 500 for 0.5 seconds delay (500 milliseconds)
    }
}

function toggleReady() {
    if (!readyToPlay && shouldClick) {
        readyToPlay = true;
        shouldClick = false;
        // $("#level-title").text("Level " + level);
        playTurn();
    } 
}

function playTurn() {
    // play the computer pattern at the beginning of the turn
    $("#level-title").text("Level " + level);
    if (readyToPlay) {
        while (computerPattern.length < level) {
            addToComputerSequence();
        }
        console.log(computerPattern);
        playPattern();
    }
}

function reset() {
    $('body').css('background-color', '#011F3F');
    var wrong = new Audio('./sounds/wrong.mp3');
    wrong.play();
    playerPattern.splice(0, playerPattern.length);
    computerPattern.splice(0, computerPattern.length);
    level = 1;
    playerButtonsPressed = -1;
    readyToPlay = false;
    shouldClick = true;
    $("#level-title").text("Press A Key to Start");
}

function levelUp() {
    level++;
    $("#level-title").text("Level " + level);
    setTimeout(function() {
        playerPattern.splice(0, playerPattern.length);
        playerButtonsPressed = -1;
        playTurn();
    }, 1000);
}

function checkIfCorrect() {
    if (playerPattern[playerButtonsPressed] === computerPattern[playerButtonsPressed]) {
        console.log("Correct")
        if (playerPattern.length === computerPattern.length) {
            levelUp();
        }
    } else {
        console.log("Incorrect");
        $('body').css('background-color', 'red').animate({backgroundColor: '#011F3F'}, 100, function() {
            reset();
        });
    }
}


// - - - - - - - - - - - - - - -