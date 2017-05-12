 // JavaScript function that wraps everything

 $(document).ready(function() {
    console.log("Start js")
    // --------------------------------------------- //
    // ------  Initialize Global Variables --------  //

    var count = 0; 
    var numCorrect = 0;
    var numWrong = 0;
    var numUnanswered = 0;
    var userAns = "";
    var ansWait = 1000;
    var questBank = [
        {   QID: 1,
            question: "What does the appraisal district do?",
            ans1: "Set my taxes",
            ans2: "Appraise property",
            ans3: "Collect Taxes",
            anscorrect: "ans2",
            anscmnt: "The appraisal district only Appraises property.  Tax rates are set by local elected officials and taxes are collected by the Tax Office."
        },
        {   QID: 2,
            question: "What values does the appraisal district determine?",
            ans1: "Market",
            ans2: "Assessed",
            ans3: "Taxable",
            anscorrect: "ans1",
            anscmnt: "The appraisal district will use appraisal models to determine the Market value of property each year.  The Assessed and Taxable value are calculated based on formulas which are set by state law and cannot be changed by the appraisal district."
        },
        {   QID: 3,
            question: "The market value is determined only when a property sells.",
            ans1: "True",
            ans2: "False",
            ans3: "",
            anscorrect: "ans2",
            anscmnt: "Market value is determined every year.  The appraisal district must determine the most probable price a property would sell for as of January 1 of each year regardless of whether is has sold."
        },
        {   QID: 4,
            question: "The price a property would sell for is the definition of what type of value?",
            ans1: "Market",
            ans2: "Assessed",
            ans3: "Taxable",
            anscorrect: "ans1",
            anscmnt: "Market value is the price the property would sell for on the open market from a willing buyer to a willing seller. Appraisal districts are constitutionaly mandated to appraise all property at market value."
        },
        {   QID: 5,
            question: "What lowers a homeowners property taxes by reducing the value they are taxed on?",
            ans1: "Rebates",
            ans2: "Exemptions",
            ans3: "Tax Credits",
            anscorrect: "ans2",
            anscmnt: "The amount of the Exemptions is subtracted from the Assessed value to determine a taxable value."
        },
        {   QID: 6,
            question: "Which value is multipled by the tax rate to determine the homeowners taxes due each year?",
            ans1: "Market",
            ans2: "Assessed",
            ans3: "Taxable",
            anscorrect: "ans3",
            anscmnt: "The Taxable value times the tax rate equals the amount of taxes owed."
        },
        {   QID:7,
            question: "If a property owner has a homestead exemption their market value can never change.",
            ans1: "True",
            ans2: "False",
            ans3: "",
            anscorrect: "ans2",
            anscmnt: "The market value will change to reflect the current real estate market and will go up or down accordingly.  The local Board of Realtors, Real Estate Agents/Brokers and real estate websites like Trullia, Zillow, Realtor.com etal have current listings of home sales that can give you an idea of what is happening in the real estate market in your area."
        },
        {   QID: 8,
            question: "The homestead exemption does more than subtract an exemption amount?",
            ans1: "True",
            ans2: "False",
            ans3: "",
            anscorrect: "ans1",
            anscmnt: "In addition to the exemption amount, property owners with a homestead exemption are entitled to a homestead limitation.   This limited value is called the Assessed value and can only go up ten percent per year.  Important to remember that the Market and Assessed values are not the same."
        },
        {   QID: 9,
            question: "The value that is limited in increases is called?",
            ans1: "Market",
            ans2: "Assessed",
            ans3: "Taxable",
            anscorrect: "ans2",
            anscmnt: "The Assessed value provides property tax savings by limiting future Assessed value increases.  The first year a property owner qualifies for a homestead exemptions sets the base value.  Each year after the assessed value is recalculated as the lower of - the previous years value plus ten percent, or, the current market value."
        },
        {   QID: 10,
            question: "Market, Assessed and Taxable are all just names for the same thing.",
            ans1: "True",
            ans2: "False",
            ans3: "",
            anscorrect: "ans2",
            anscmnt: "Market value is the price a property would sell for,  Assessed value is the limitation value based on last years value plus ten percent, and Taxable value is the Assessed value minus and exemptions."
        },
        {   QID: 11,
            question: "The fee to file a homestead exemption is:",
            ans1: "$25",
            ans2: "$50",
            ans3: "Free",
            anscorrect: "ans3",
            anscmnt: "Filing a homestead application is FREE.  Applications can be printed from the Travis CAD website, can be picked up at our offices, or can be filed online."
        },
        {   QID: 12,
            question: "Property owners who disagree with the appraisal districts determination of value can protest their value.",
            ans1: "True",
            ans2: "False",
            ans3: "",
            anscorrect: "ans1",
            anscmnt: "Property owners have until May 31 to file a protest of property value.  They will then be scheduled with a meeting before the appraisal review board which will hear evidence and determine if the value should be changed."
        },
        {   QID: 13,
            question: "Which values can you protest?",
            ans1: "Market",
            ans2: "Assessed",
            ans3: "Taxable",
            anscorrect: "ans1",
            anscmnt: "Only the Market value can be protested.  The Assessed and Taxable values are calculated based on state mandated formulas that cannot be changed."
        },
        {   QID: 14,
            question: "Appraisal disrticts decide if taxes go up.",
            ans1: "True",
            ans2: "False",
            ans3: "",
            anscorrect: "ans2",
            anscmnt: "Appraisal districts ONLY set the Market value and calculate the Assessed and Taxable values based on state formulas.  The elected officials of the taxing enties determine the tax rate."
        },
        {   QID: 15,
            question: "If my value goes up, my taxes will.",
            ans1: "Go up",
            ans2: "Stay the same",
            ans3: "Depends on the tax rate.",
            anscorrect: "ans3",
            anscmnt: "An increase in appraised value does NOT automatically mean an increase in taxes.  As appraised values go up the tax rate should go DOWN."
        },
        {   QID: 16,
            question: "The Effectivie rate generates:",
            ans1: "Same amount of taxes as last years",
            ans2: "Ten percent more taxes",
            ans3: "Taxes to fund this year's budgets",
            anscorrect: "ans1",
            anscmnt: "The Effective rate generates the SAME amount of taxes as last year.  It acts as a 'reset', so if the appraised values go up the Effective rate goes down so that the amount of taxes remains the same as the previous year. Effective rate is the starting point for taxing unit tax rate decisions"
        },
        {   QID: 17,
            question: "The Effective rate resets each year based on. ",
            ans1: "Appraised values",
            ans2: "Last years tax rate",
            ans3: "Annual CPI",
            anscorrect: "ans1",
            anscmnt: "If the appraised values go up the Effective rate goes down so that the amount of taxes remains the same as the previous year."
        },
        {   QID: 18,
            question: "The Rollback rate is:",
            ans1: "Last years tax rate",
            ans2: "The max rate that can be set before voter election",
            ans3: "The rate that lowers taxes",
            anscorrect: "ans2",
            anscmnt: "The maximum rate elected official can adopt without and election is the Rollback rate.  If they adopt a rate above the Rollback rate taxpayers can petition to have an election to roll the rate back down to the Rollback rate"
        },
         {   QID: 19,
            question: "The Proposed rate is the rate suggested by:",
            ans1: "Taxpayers",
            ans2: "Taxing Units",
            ans3: "State law",
            anscorrect: "ans2",
            anscmnt: "The proposed rate is the rate suggested by Taxing units that will generate the amount of taxes needed to fund the local government budget for the coming year."
        },
         {   QID: 20,
            question: "The Adopted tax rate is set by:",
            ans1: "Taxpayers at an election",
            ans2: "Locally elected officials",
            ans3: "The State of Texas",
            anscorrect: "ans2",
            anscmnt: "Before a Locally elected officials of a taxing unit can adopt the tax rate they must hold public hearings and give taxpayers an opportunity to voice their concerns about the amount of taxes that will be collected."
        },
    ];

  
    

    // --------------------------------------------- //
    //  --------   Declare global functions ------   //

    // Create countdown timer   //
    var countdownTimer = {
         time: 30,
         reset: function() {
            if (count < questBank.length -1) {
               countdownTimer.stop();
               countdownTimer.time = 30;
               $("#timer").html(countdownTimer.time);
               nextQuestion();
            }
            else {
                console.log("Game Over");
                gameOver();
            }
            },
        start: function() {
            intervalId = setInterval(countdownTimer.count, 1000);
            },
        stop: function() {
            console.log("stop reached")
            clearInterval(intervalId);
            },
        count: function() {
            countdownTimer.time--;
                console.log("timer is set: " + countdownTimer.time);
            if (countdownTimer.time < 0) {
                console.log("calls to stop and reset")
                countdownTimer.reset();
            }  
            else {
                $("#timer").html(countdownTimer.time);
            };
            },
    };


    function buildQuestion() {
        $("#quest-feed").empty();
        $("#answers").empty();
        $("#start-comment").empty();

        var mainQuest = $("<h4>");
            mainQuest.addClass("question");
            console.log("Built question index: " + count);
            mainQuest.text(questBank[count].question)
            $("#quest-feed").append(mainQuest);
        var mainAns1 = $("<p>");
            mainAns1.addClass("q-answer");
            mainAns1.attr("data-name", "ans1")
            mainAns1.text(questBank[count].ans1)
            $("#answers").append(mainAns1);
        var mainAns2 = $("<p>");
            mainAns2.addClass("q-answer");
            mainAns2.attr("data-name", "ans2")
            mainAns2.text(questBank[count].ans2)
            $("#answers").append(mainAns2);
        var mainAns3 = $("<p>");
            mainAns3.addClass("q-answer");
            mainAns3.attr("data-name", "ans3")
            mainAns3.text(questBank[count].ans3)
            $("#answers").append(mainAns3);
    };


    function nextQuestion(){
        console.log("start next question interval");
        count++
        buildQuestion();
        buildTimer();
        countdownTimer.start();
        //var showQuest = setInterval(buildQuestion, 3000);
    };

    function buildTimer(){
        $("#timer-head").html("Time remaining: ");
        $("#timer").html(countdownTimer.time);
        $("#timer-end").html(" seconds.")
    };


    function gameOver(){
        
        $("#quest-feed").empty();
        $("#answers").empty();
        $("#start-comment").empty();
        numUnanswered = questBank.length - numCorrect - numWrong;
        var totalScore = Math.round((numCorrect/questBank.length)*100);
        $("#timer-head").html("Your final score is ");
        $("#timer").html(totalScore);
        $("#timer-end").html(" % ");

        var score1 = $("<p>");
            score1.addClass("score");
            $("#answers").append("<h3> Correct Answers: "+ numCorrect + "</h3>");
            $("#answers").append("<h3> Wrong Answers: "+ numWrong + "</h3>");
            $("#answers").append("<h3> Unanswered Questions: "+ numUnanswered + "</h3><br><br>");    
        var restart = $("<button type='button'>");
            restart.addClass("btn btn-success btn-lg active");
            restart.attr("id","restart");
            restart.text("Start Over");
            $("#start-comment").append(restart);
    }


    
    // --------------------------------------------- //
    //  --------   Declare event listeners  ------   //

    // Listen for start button   //
    $("#start-comment").on("click", "#start", function(){
        console.log("button clicked");
        $("#start-comment").empty();
        buildQuestion();
        buildTimer();
        countdownTimer.start();        
        });


    // Click on answer  //
    $("#answers").on("click",".q-answer", function(){
        userAns = ($(this).attr("data-name"));
        if (userAns === questBank[count].anscorrect){
            numCorrect++;
            ansWait = 1000;
            console.log("correct answer");
            $(this).css("background-color", "#A0FF91");
            $("#timer-head").html("Correct Answer!! ");
            $("#timer").html(" ");
            $("#timer-end").html(" ");
           // $("#answers").append("<br><p class='AnsFeedback'>" + questBank[count].anscmnt + "</p>");
        }
        else {
            numWrong++;
            ansWait = 5000;
            console.log("wrong answer");
            $(this).css("background-color", "#FF777F");
            $("#timer-head").html("Nope, wrong answer...");
            $("#timer").html(" ");
            $("#timer-end").html(" ");
            $("#start-comment").append("<br><p class='ansFeedback'>" + questBank[count].anscmnt + "</p>");
        }
        countdownTimer.stop();
        $("#timer").html(" ");
        setTimeout(countdownTimer.reset, ansWait);

    });


 // Listen for start button   //
    $("#start-comment").on("click", "#restart",function(){
        console.log("button clicked");
        $("#start-comment").empty();
        count = 0; 
        numCorrect = 0;
        numWrong = 0;
        numUnanswered = 0;
        userAns = "";
        ansWait = 1000;
        countdownTimer.time = 30;
        buildQuestion();
        buildTimer();
        countdownTimer.start();        
        });


     
 


// --------------------------------------------- //
// ----------  Main program function  ---------  //
      

})  // end document.ready

