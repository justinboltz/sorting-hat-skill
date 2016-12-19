/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

'use strict';

var express = require('express');
var request = require('request');

var app = express();

var GA_TRACKING_ID = 'UA-89072533-1';

function trackEvent(category, action, label, value, callback) {
    var data = {
        v: '1', // API Version.
        tid: GA_TRACKING_ID, // Tracking ID / Property ID.
        // Anonymous Client Identifier. Ideally, this should be a UUID that
        // is associated with particular user, device, or browser instance.
        cid: '555',
        t: 'event', // Event hit type.
        ec: category, // Event category.
        ea: action, // Event action.
        el: label // Event label.
    };

    request.post(
        'http://www.google-analytics.com/collect', {
            form: data
        },
        function(err, response) {
            if (err) { return callback(err); }
            if (response.statusCode !== 200) {
                return callback(new Error('Tracking failed'));
            }
            callback();
        }
    );
}


var questions = [
    {
        "You need to cross a bridge with two friends, but a troll insists on fighting one of you before you can cross. What do you do?": [
            { answer: "Volunteer to fight", house: "Gryffindor"},
            { answer: "Trick the troll, and pass without fighting", house: "Ravenclaw"},
            { answer: "Suggest drawing straws to see who fights", house: "Hufflepuff"},
            { answer: "Suggest ganging up on the troll", house: "Slytherin"}
        ]
    },
    {
        "Which of these two options do you prefer?": [
            { answer: "Dawn", house: "Gryffindor", house2: "Ravenclaw"},
            { answer: "Dusk", house: "Hufflepuff", house2: "Slytherin"}
        ]
    },
    {
        "Which of these two options do you prefer?": [
            { answer: "Forest", house: "Gryffindor", house2: "Ravenclaw"},
            { answer: "River", house: "Hufflepuff", house2: "Slytherin"}
        ]
    },
    {
        "Which of these two options do you prefer?": [
            { answer: "Moon", house: "Ravenclaw", house2: "Slytherin"},
            { answer: "Stars", house: "Gryffindor", house2: "Hufflepuff"}
        ]
    },
    {
        "Which of the following do you find most difficult to deal with?": [
            { answer: "Hunger", house: "Ravenclaw", house2: "Hufflepuff"},
            { answer: "Cold", house: "Hufflepuff", house2: "Slytherin"},
            { answer: "Loneliness", house: "Gryffindor", house2: "Hufflepuff"},
            { answer: "Boredom", house: "Gryffindor", house2: "Slytherin"},
            { answer: "Being Ignored", house: "Ravenclaw", house2: "Slytherin"}
        ]
    },
    {
        "What are you most looking forward to learning at Hogwarts?": [
            { answer: "Transfiguration", house: "Ravenclaw"},
            { answer: "Hexes and Jinxes", house: "Slytherin"},
            { answer: "All about magical creatures", house: "Hufflepuff"},
            { answer: "Secrets about the castle", house: "Gryffindor"},
            { answer: "Flying on a broomstick", house: "Gryffindor", house2: "Hufflepuff"},
            { answer: "Apparition and Disapparition", house: "Ravenclaw", house2: "Slytherin"}
        ]
    },
    {
        "If someone conjured a love potion for you, which of these scents would it have?": [
            { answer: "A crackling log fire", house: "Gryffindor"},
            { answer: "Fresh parchment", house: "Ravenclaw"},
            { answer: "Your Home", house: "Hufflepuff"},
            { answer: "The sea", house: "Slytherin"}
        ]
    },
    {
        "You enter an enchanted garden. What would you be most curious to examine first?": [
            { answer: "The statue of an old wizard with a strangely twinkling eye", house: "Gryffindor"},
            { answer: "The silver leafed tree bearing golden apples", house: "Ravenclaw"},
            { answer: "The fat red toadstools that appear to be talking to each other", house: "Hufflepuff"},
            { answer: "The bubbling pool, in the depths of which something luminous is swirling", house: "Slytherin"}
        ]
    },
    {
        "Four goblets are placed before you. Which would you choose to drink?": [
            { answer: "The golden liquid that makes sunspots dance around the room", house: "Gryffindor"},
            { answer: "The foaming frothy silvery liquid that sparkles as though containing ground diamonds", house: "Ravenclaw"},
            { answer: "The smooth thick richly purple drink that has the scent of chocolate and plums", house: "Hufflepuff"},
            { answer: "The mysterious black liquid that gleams like ink and gives off fumes that make you see strange visions", house: "Slytherin"}
        ]
    },
    {
        "Which kind of instrument most pleases your ears?": [
            { answer: "The drum", house: "Gryffindor"},
            { answer: "The piano", house: "Ravenclaw"},
            { answer: "The trumpet", house: "Hufflepuff"},
            { answer: "The violin", house: "Slytherin"}
        ]
    },
    {
        "Which of the following would you most hate people to call you?": [
            { answer: "Cowardly", house: "Gryffindor"},
            { answer: "Ignorant", house: "Ravenclaw"},
            { answer: "Selfish", house: "Hufflepuff"},
            { answer: "Ordinary", house: "Slytherin"}
        ]
    },
    {
        "After you died, what would you most like people to do when they hear your name?": [
            { answer: "Tell stories about your adventures", house: "Gryffindor"},
            { answer: "Think about your achievements", house: "Ravenclaw"},
            { answer: "Miss you, but smile", house: "Hufflepuff"},
            { answer: "You don't care what people think about you, you lived life how you wanted", house: "Slytherin"}
        ]
    },
    {
        "How would you like to be known to history?": [
            { answer: "The Bold", house: "Gryffindor"},
            { answer: "The Wise", house: "Ravenclaw"},
            { answer: "The Good", house: "Hufflepuff"},
            { answer: "The Great", house: "Slytherin"}
        ]
    },
    {
        "A muggle confronts you and says they know you are a magical. What do you do?": [
            { answer: "Agree and walk away, leaving them to wonder", house: "Gryffindor"},
            { answer: "Ask what makes them think so", house: "Ravenclaw"},
            { answer: "Tell them you are worried about their mental health and offer to call a doctor", house: "Hufflepuff"},
            { answer: "Agree and ask whether they'd like a free sample of a jinx", house: "Slytherin"}
        ]
    },
    {
        "Which nightmare would frighten you most?": [
            { answer: "An eye at the keyhole of a dark windowless room in which you are locked", house: "Gryffindor"},
            { answer: "Standing on top of something very high with nothing to hold onto", house: "Ravenclaw"},
            { answer: "Waking up to find that your friends and family don't know who you are", house: "Hufflepuff"},
            { answer: "Being forced to speak in a silly voice that makes everyone laugh at you", house: "Slytherin"}
        ]
    },
    {
        "If you could invent a potion that would guarantee you one thing, which would you choose?": [
            { answer: "Glory", house: "Gryffindor"},
            { answer: "Wisdom", house: "Ravenclaw"},
            { answer: "Love", house: "Hufflepuff"},
            { answer: "Power", house: "Slytherin"}
        ]
    },
    {
        "If you could have any power, which would you choose?": [
            { answer: "Invisibility", house: "Gryffindor"},
            { answer: "Mind reading", house: "Ravenclaw"},
            { answer: "Speaking to animals", house: "Hufflepuff"},
            { answer: "Change the past", house: "Slytherin"}
        ]
    },
    {
        "Which road tempts you most?": [
            { answer: "The twisting, leaf-strewn path through the woods", house: "Gryffindor"},
            { answer: "The cobbled street lined with ancient buildings", house: "Ravenclaw"},
            { answer: "The wide sunny grassy lane", house: "Hufflepuff"},
            { answer: "The narrow dark lantern-lit alley", house: "Slytherin"}
        ]
    },
    {
        "Walking alone at night, you hear a peculiar cry that you believe to have a magical source. What do you do?": [
            { answer: "Draw your wand and search out the source of the sound", house: "Gryffindor"},
            { answer: "Withdraw into the shadows to mentally review spells", house: "Ravenclaw"},
            { answer: "Proceed with caution, keeping one hand on your wand", house: "Hufflepuff"},
            { answer: "Draw your wand and stand your ground", house: "Slytherin"}
        ]
    },
    {
        "Which would you rather be?": [
            { answer: "Praised", house: "Gryffindor"},
            { answer: "Envied", house: "Ravenclaw"},
            { answer: "Trusted", house: "Hufflepuff"},
            { answer: "Feared", house: "Slytherin"}
        ]
    }
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

      if (event.session.application.applicationId !== "amzn1.ask.skill.69547a25-1e61-417d-8393-82550090f3f1") {
         context.fail("Invalid Application ID");
      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        trackEvent(
            'Intent',
            'Answer Intent',
            'answer with other speech',
            null,
            function(err) {
                if (err) {
                    return next(err);
                }
            }
        );
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        trackEvent(
            'Intent',
            'Answer Intent',
            'answer only',
            null,
            function(err) {
                if (err) {
                    return next(err);
                }
            }
        );
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        trackEvent(
            'Intent',
            'Start Intent',
            'game started',
            null,
            function(err) {
                if (err) {
                    return next(err);
                }
            }
        );
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}


// ------- Skill specific business logic -------

var GAME_LENGTH = 7;
var CARD_TITLE = "Sorting Hat"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Time to get you sorted. I will ask you " + GAME_LENGTH.toString()
            + " questions. Just say the number of the answer you desire. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),        
        currentQuestionIndex = 0,
      
        spokenQuestion = Object.keys(gameQuestions[currentQuestionIndex])[0],
        roundAnswers = shuffleArray(gameQuestions[currentQuestionIndex][spokenQuestion]),
        repromptText = "Question 1. " + spokenQuestion + " ",
        i, j;

    for (i = 0; i < roundAnswers.length; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i].answer + ". ";
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "questions": gameQuestions,
        "answersArray": [],
        "roundAnswers": roundAnswers
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = {};
    var index = questions.length;
    var rand;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){

      while(rand === undefined || indexList[rand]) {
        rand =  Math.floor(Math.random() * index);
      }
      
      indexList[rand] = true;
    
      gameQuestions.push(questions[rand]);
    }
    return gameQuestions;
}

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function mode(arr) {
  return arr.sort(function(a,b){
    return arr.filter(function(v){ return v===a }).length - arr.filter(function(v){ return v===b }).length;
  }).pop();
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var gameQuestions = session.attributes.questions,
        currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
        spokenQuestion = Object.keys(gameQuestions[currentQuestionIndex])[0],
        roundAnswers = session.attributes.roundAnswers;
    var answerSlotValid = isAnswerSlotValid(intent, roundAnswers);

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no sorting game in progress. Do you want to start a new sorting game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid) {
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + roundAnswers.length + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var answersArray = session.attributes.answersArray;

        console.log(gameQuestions[currentQuestionIndex]);
        console.log(parseInt(intent.slots.Answer.value));
        console.log(roundAnswers[parseInt(intent.slots.Answer.value-1)]);
      
        answersArray.push((gameQuestions[currentQuestionIndex][Object.keys(gameQuestions[currentQuestionIndex])[0]])[parseInt(intent.slots.Answer.value-1)].house); 
        // if there is a second house on the answer, add that to the array as well
        if ((gameQuestions[currentQuestionIndex][Object.keys(gameQuestions[currentQuestionIndex])[0]])[parseInt(intent.slots.Answer.value-1)].house2) {
            answersArray.push((gameQuestions[currentQuestionIndex][Object.keys(gameQuestions[currentQuestionIndex])[0]])[parseInt(intent.slots.Answer.value-1)].house2);
        }
        
        console.log(answersArray);

        // We've reached the end and can determine the user's house
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = "Alright, now let me see. Hmm, difficult. Very difficult. Where to put you?";
            var topHouse = mode(answersArray);
            speechOutput += "Better be, " + topHouse.toString() + ". Congratulations!";
            trackEvent(
                'Game Completion',
                'House Assignment',
                topHouse.toString(),
                null,
                function(err) {
                    if (err) {
                        return next(err);
                    }
                }
            );
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } 
        // Game is still going on and there are more questions to answer
        else {
            currentQuestionIndex += 1;
            spokenQuestion = Object.keys(gameQuestions[currentQuestionIndex])[0],
            roundAnswers = shuffleArray(gameQuestions[currentQuestionIndex][spokenQuestion]);
            var questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < roundAnswers.length; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i].answer + ". ";
            }
            speechOutput += randomResponse() + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "questions": gameQuestions,
                "answersArray": answersArray,
                "roundAnswers": roundAnswers
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function randomResponse() {
    var responseArray = ["Hmm, interesting. ",  "I see. Okay. ", "Hmm, alright then. "];
    
    return shuffleArray(responseArray)[0];
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.
    
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent, roundAnswers) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (roundAnswers.length + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

