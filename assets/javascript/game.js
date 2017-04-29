
  //  Initialize Global variables //
  var userWins = 0
  var userLosses = 0
  var userText = document.getElementById("user-text");
  var hangmanPhrases = ["The happiest place on earth!", "Life's messy, clean it up.", "Leave the driving to us.", 
    "Betcha can't eat just one.", "Believe in your smelf.", "The taste of a new generation.", "A passion for the road.",
    "We know money.", "Behold, the power of cheese!", "Get your own box.", "Does she or doesn't she?", "Play. Laugh. Grow.",
    "The best a man can get.", "Don't dream it. Drive it.", "Let your fingers do the walking.", "When you care enough to send the very best.",
    "A diamond is forever.", "Be all you can be.", "Can you hear me now?", "Don't leave home without it.", "Finger lickin' good!",
    "Have it your way.", "Just do it!", "Mmmm Mmmm Good.", "Snap! Crackle! Pop!", "The ultimate driving machine", "Your in good hands.",
    "You got the right one baby!", "Shave time. Shave money.", "Because your worth it.", "Melts in your mouth, not in your hands.", 
    "The quicker picker upper.", "Taste so good cats ask for it by name.", "We bring good things to life.", "Maybe she's born with it. Maybe it's ...",
    "The few. The proud. The ...", "Taste the rainbow.", "Eat fresh!", "Think outside the bun!", "Drivers wanted.", "Hot eats, cool treats",
    "You got chocolate in my peanut butter!", "They're magically delicious.", "Good to the last drop", "Sometimes you feel like a nut, sometimes you don't.",
    "Get the sensation", "What's in your wallet?", "For that deep down body thirst", "Life's a sport. Drink up!", "We do chicken right!",
    "The great American chocolate bar!", "You are free to move about the country", "Better ingredients. Better pizza.", "The relentless pursuit of perfection",
    "Crispety, crunchety, peanut buttery!"];
  var hangmanHints = ["Disney World", "Bissell", "Greyhound","Lay's", "Old Spice", "Pepsi","Mazda","AIG","American Dairy Association","Cheez-It",
    "Clairol","Fisher Price","Gillette","Jaguar","Yellow Pages","Hallmark","DeBeers", "US Army", "Verizon", "American Express", "Kentucky Fried Chicken",
    "Burger King","Nike","Campbells Soup", "Kellogs Rice Krispies", "BMW", "Allstate","Pepsi","Dollar Shave Club","L'Oreal","M&M","Bounty",
    "Meow Mix","General Electric","Maybelline","US Marines","Skittles","Subway","Taco Bell", "Volkswagon","Dairy Queen","Reese's Peanut Butter Cup","Lucky Charms",
    "Maxwell House","Almond Joy","York Peppermint Patty","Capital One","Gatorade","Gatorade","Kentucky Fried Chicken","Hershey Chocolate",
    "Southwest Airlines", "Papa John's", "Lexus","Butterfingers","Click the Play to start then ask for a hint"];
  var letters = /^[A-Za-z]+$/;  //sets this to all alpha letters //
    console.log("Wins: " + userWins + " Losses: " + userLosses + " round status " + " " + hangmanPhrases.length);
  var randomPhrase;
  var randomHint;
  var hangmanPlaceholder = "";
  var userGuess;
  var guessesLeft = 8
  var guessedLetter = [];
  var testLetter ="";
  var roundTestLetter ="";
  var wrongLetters = [];
  var hangImage = "hm1.jpg";
  var hangIndex = hangmanHints.length - 1
  var win = new Audio("assets/sounds/applause3.mp3");
  var lose = new Audio("assets/sounds/cwdaaaAah.mp3");
  

  // Action on key presses and main game function //
  document.onkeyup = function(event) {
          userText.textContent = event.key;
          userGuess = event.key;
          console.log("Letter guessed is: " + userGuess);
          playRound();
          checkWin();

        };


  // When Play button clicked build pieces to start the game   //
  function playGame() {
        console.log("Button clicked, Start to play game")
    hangIndex = Math.floor(Math.random() * hangmanPhrases.length);
    randomPhrase = hangmanPhrases[hangIndex].toLowerCase();
        console.log("The index is: " + hangIndex + " The random phrase is: " + randomPhrase)
    hangmanPlaceholder = buildPlaceHolder();
        console.log("The returned place holder is " + hangmanPlaceholder);
    document.getElementById("id-hangmanPlaceholder").innerHTML = hangmanPlaceholder;
    document.getElementById("id-hangmanImage").innerHTML = "<img src = assets/images/hm1.jpg>";
    document.getElementById("user-text").innerHTML = " use keyboard to guess a letter"
  };


  // When Hint button clicked show the hint  //
  function showHint(){
    randomHint = hangmanHints[hangIndex];
        console.log("the index is: " + hangIndex + " The random hint is: " + randomHint);
    document.getElementById("hints").innerHTML = randomHint;
  }


  // Initiliaze the variables at start and for each round  //
  function initVars(){
        console.log("intializing variables");
    randomPhrase = "";
    randomHint = "";
    hangmanPlaceholder ="";
    userGuess = "";
    //guessedLetter = [];
    guessesLeft = 8
    testLetter ="";
    roundTestLetter ="";
    wrongLetters = [];
    hangImage = "hm1.jpg";
    document.getElementById("hints").innerHTML = randomHint;
    document.getElementById("user-wrong").innerHTML = wrongLetters;
    document.getElementById("id-hangmanImage").innerHTML = "<img src=assets/images/"+ hangImage +">";
    document.getElementById("id-guessesLeft").innerHTML = guessesLeft;
    };                        


  //  Initial build of the placeholder //
  function buildPlaceHolder(){
    var Placeholder = ""
        console.log("phrase to be built is: " + randomPhrase);
        console.log("phrase length is: " + randomPhrase.length);
    for (var i = 0; i < randomPhrase.length; i++) {
      testLetter = randomPhrase.charAt(i);
      if (letters.test(testLetter))
         {
           Placeholder = Placeholder + "_" ;
          }  
      else {
           Placeholder = Placeholder + randomPhrase.charAt(i) ;   // special characters are free  //
          }
      };   
     
      hangmanPlaceholder = Placeholder; 
      return (hangmanPlaceholder);
  };


  // Rebuild the place holder with each letter guessed //
  function reBuildPlaceHolder() {
    var newPlaceHolder = "";
    for (var i = 0; i < randomPhrase.length; i++) {
    testLetter = randomPhrase.charAt(i);
      if (userGuess == testLetter)
         { newPlaceHolder = newPlaceHolder + randomPhrase.charAt(i);
         }  
      else
         { newPlaceHolder= newPlaceHolder + hangmanPlaceholder.charAt(i);
         }
    }   
    hangmanPlaceholder = newPlaceHolder;
        console.log("the new place holder is " + hangmanPlaceholder);
    document.getElementById("id-hangmanPlaceholder").innerHTML = hangmanPlaceholder; 
  };


  // Play the round and check each letter guessed  //
  function playRound() {
        console.log("Starting Round. Random phrase is " + randomPhrase + " placeholder is " + hangmanPlaceholder);
    // initialize the variables  //
     if (userGuess != roundTestLetter) 
        {
          roundTestLetter = userGuess
          if (randomPhrase.indexOf(userGuess) > -1) 
               { console.log("Match letter");
                  reBuildPlaceHolder();
                }
          else { wrongLetters.push(userGuess);
                  guessesLeft -= 1
                  console.log("Wrong letter:" + wrongLetters + " guesses left: " + guessesLeft);
                  hangImage = "hm" + (wrongLetters.length + 1) + ".jpg";
                  document.getElementById("user-wrong").innerHTML = wrongLetters;
                  document.getElementById("id-hangmanImage").innerHTML = "<img src=assets/images/"+ hangImage +">";
                  document.getElementById("id-guessesLeft").innerHTML = guessesLeft;
                }
        };
    roundTestLetter = "";
  };




  // Check after each letter to see if the round is over and the user wins or loses  //
  function checkWin(){
    if (wrongLetters.length > 7) 
      { userLosses += 1;
        console.log("User losses this round " + userLosses);
        document.getElementById("id-userLosses").innerHTML = userLosses;
        document.getElementById("user-text").innerHTML = "  ...Sorry Charlie, you lose!"
        document.getElementById("id-hangmanPlaceholder").innerHTML = randomPhrase; 
        lose.play();
            console.log("placeholder is: " + hangmanPlaceholder);
        setTimeout(function(){ 
            console.log("Wait a sec then reload");
            initVars();
            playGame();
               }, 3000);   // give a little wait //
      }
    else if (hangmanPlaceholder.toLowerCase() === randomPhrase.toLowerCase())
          { userWins +=1; 
                console.log("User wins this round "+ userWins);
            document.getElementById("id-userWins").innerHTML = userWins;
            document.getElementById("user-text").innerHTML = " Wahoo!!!  You Win!!!"
            win.play();
                console.log("placeholder is: " + hangmanPlaceholder);
            setTimeout(function(){ 
                  console.log("Wait a sec then reload");
               initVars();
               playGame();
               }, 3000);   // give a little wait //
          }
          else 
          { console.log("the round continues");
          }   
  };


