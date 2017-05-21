
 $(document).ready(function() {
    console.log("Start js Train Scheduler ");
    var testTime = moment().format("HH:mm");
    console.log("Test time is: " + testTime);


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDvFRrv73w1iZ436CulqHJgcE1YTooG_Bk",
    authDomain: "trainschedulermdc.firebaseapp.com",
    databaseURL: "https://trainschedulermdc.firebaseio.com",
    projectId: "trainschedulermdc",
    storageBucket: "trainschedulermdc.appspot.com",
    messagingSenderId: "20761412664"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    dbTrainName: trainName,
    dbDestination: destination,
    dbFirstTrainTime: firstTrainTime,
    dbFrequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.dbTrainName);
  console.log(newTrain.dbDestination);
  console.log(newTrain.dbFirstTrainTime);
  console.log(newTrain.dbFrequency);

 
   // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var csTrainName = childSnapshot.val().dbTrainName;
  var csDestination = childSnapshot.val().dbDestination;
  var csFirstTrainTime = childSnapshot.val().dbFirstTrainTime;
  var csFrequency = childSnapshot.val().dbFrequency;

  // Train Info
  console.log(csTrainName);
  console.log(csDestination);
  console.log(csFirstTrainTime);
  console.log(csFrequency);
  
 /* var convertedTime = moment(new Date(csFirstTrainTime));
  var timeDiff = 0;
 // timeDiff = moment().diff(convertedTime,"minutes");
  timeDiff = moment().diff(convertedTime,"minutes");
  console.log("The time diff is: " + timeDiff)
*/
  // Inline calculation for next train arrival time and minutes away 
  var firstTimeConverted = moment(csFirstTrainTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % csFrequency;
  var minutesAway = csFrequency - tRemainder;
  var calcNextArrival = moment().add(minutesAway, "minutes");
  var nextArrival = moment(calcNextArrival).format("hh:mm");
  
  
  // Add each train's data into the table
  $("#schedule-table > tbody").append("<tr><td>" + csTrainName + "</td><td>" + csDestination + "</td><td>" +
  csFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway +  "</td></tr>");
});

});
