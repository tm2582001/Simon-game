var green = $("#green"), red = $("#red"), yellow = $("#yellow"), blue = $("#blue")  //button value
var task = []   //array containing input task for user
var level=0;    //level user is currently playing

var buttonArray= $(".btn");    //array of button because it is same as even.currentTarget
var userClicked = [];           //array for user input

var gameOverValue = false;  // for different sound after gameover
var z=0;  //if game over occur too many time then keyboard input === no of time game over to prevent that this variable is used

// to generate random variable
function randomVariable(){
    level++;
    $("#level-title").text("Level " + level);
    var pattern = Math.random()*4;
    pattern = Math.floor(pattern);
    switch (pattern) {
        case 0:
            animation(buttonArray[0]);      
            task.push("green");                     //to enter task given in this level
            break;
        case 1:
            animation(buttonArray[1]);
            task.push("red");                        //to enter task given in this level
            break;
        case 2:
            animation(buttonArray[2]);
            task.push("yellow");                    //to enter task given in this level
            break;
        case 3:
            animation(buttonArray[3]);
            task.push("blue");                      //to enter task given in this level
            break;
    }
}


// for animation while click
function animation(button){
    switch(button){

        // green button
        case buttonArray[0]:

            // animation after button pressed 
            green.addClass("pressed");
            setTimeout(function (){green.removeClass("pressed")},200);

            // after game over
            if(gameOverValue===true){
                var gameOverSound = new Audio("sounds/wrong.mp3");
                gameOverSound.play();
                gameOverValue=false;
            }else{                                                                  //after correct option
                var greenSound = new Audio("sounds/green.mp3");
                greenSound.play();
            }
            break;

        // red button
        case buttonArray[1]:

            // animation after button pressed 
            red.addClass("pressed");
            setTimeout(function (){red.removeClass("pressed")},200);


            // after game over
            if(gameOverValue===true){
                var gameOverSound = new Audio("sounds/wrong.mp3");
                gameOverSound.play();
                gameOverValue=false;
            }else{                                                                   //after correct option
                var redSound = new Audio("sounds/red.mp3");
                redSound.play();}
            break;
        
        // yellow button
        case buttonArray[2]:

            // animation after button pressed
            yellow.addClass("pressed");
            setTimeout(function (){yellow.removeClass("pressed")},200);


            // after game over
            if(gameOverValue===true){
                var gameOverSound = new Audio("sounds/wrong.mp3");
                gameOverSound.play();
                gameOverValue=false;
            }else{                                                              //after correct option
                var yellowSound = new Audio("sounds/yellow.mp3");
                yellowSound.play();}
            break;

        // blue button
        case buttonArray[3]:

                
            // animation after button pressed 
            blue.addClass("pressed");
            setTimeout(function (){blue.removeClass("pressed")},200);


            // after game over
            if(gameOverValue===true){
                var gameOverSound = new Audio("sounds/wrong.mp3");
                gameOverSound.play();
                gameOverValue=false;
            }else{                                                              //after correct option
                var blueSound = new Audio("sounds/blue.mp3");
                blueSound.play();}
            break;
    }
}


// after game over
function gameOver(){
    
    // background animation after game over
    $("body").addClass("game-over");
    setTimeout(function (){$("body").removeClass("game-over")},200);
    // value is true mean when you press button gameover sound plays
    gameOverValue=true;

    // for title
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // reseting progress
    userClicked = [];
    task=[];
    level=0;
    z=0;  //keybord input will work
    keyboardInput();

    // keyboard input after game over
    // $(document).one("keydown",function (){
        
        // require because upper function consider multiple inputs if game over multiple time in a row
    //     if(z===0){
    //         console.log("called by second keyboard");
    //         //for restarting game
    //         setTimeout( function (){randomVariable();},400);
    //         z++;
    //     }
    // });            
}

// checks if input is correct or not
function check(){
    // algo to check if user input correct answer
    for(var i=0;i<userClicked.length;i++){
        if(task[i]===userClicked[i]){
            if(i===(level-1)){
                
                //for next level
                setTimeout( function (){randomVariable();},300);

                //this is require because user need to enter value of privious level
                userClicked=[];
            }
        }else{
            gameOver();
        }
    }
}


// i created this because if if we give error before starting game keybord input will run two time and i am leaving privious 
// code so that i can under stand thid line
// privious code
// $(document).one("keydown",function (){
//     console.log("called by 1st keyboard input");
//     randomVariable();
// });
function keyboardInput(){
    //for keyboard input
    $(document).one("keydown",function (){
    if(z===0){
        setTimeout( function (){randomVariable();},300);
        z++;
    }
    });
}

// user input
$(".btn").on("click",function(event){

    // event.currentTarget contains information about button pressed
    switch(event.currentTarget){
        case buttonArray[0]:
            userClicked.push("green");     //saves user input
            break;
        case buttonArray[1]:
            userClicked.push("red");    //saves user input
            break;
        case buttonArray[2]:
            userClicked.push("yellow");     //saves user input
            break;
        case buttonArray[3]:
            userClicked.push("blue");       //saves user input
            break;
    }
    check();
    animation(event.currentTarget);         //call for animation
});

// keyboard input at the start of game
keyboardInput();




/*       Things that i learned and they are wierd        */

/* 1. event.currentTarget contains information about button i pressed and i can use .addClass 
 but if i pass its to another value it just passes html of button and i cannot use .add class */

/*2. when we store value of button in an array then we can use array.addClass
 but if we try array[1].addClass it wont work because array[1] contains only button html
 while single variable works fine*/

/*3. if event listener(i tried only jquery event listener) is called inside a function and function is called 
 multiple times then eventLister will run multiple time even it takes only one input
 (means you give only one input in this code case it takes input only one time)  */

/* according to third pint i understand that event listener store itself in some kind of storage and 
 when that event happen it call itself */