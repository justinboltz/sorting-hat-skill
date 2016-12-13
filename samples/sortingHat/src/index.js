/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "You need to cross a bridge with two friends, but a troll insists on fighting one of you before you can cross. What do you do?": [
            "Volunteer to fight",
            "Trick the troll, and pass without fighting",
            "Suggest drawing straws to see who fights",
            "Suggest ganging up on the troll"
        ]
    },
    {
        "What love potion scent would you be most attracted to?": [
            "A crackling log fire",
            "Fresh parchment",
            "Home",
            "The sea"
        ]
    },
    {
        "You enter an enchanted garden. What would you be most curious to examine first?": [
            "The statue of an old wizard with a strangely twinkling eye",
            "The silver leafed tree bearing golden apples",
            "The fat red toadstools that appear to be talking to each other",
            "The bubbling pool, in the depths of which something luminous is swirling"
        ]
    },
    {
        "Four goblets are placed before you. Which would you choose to drink?": [
            "The golden liquid that makes sunspots dance around the room",
            "The foaming frothy silvery liquid that sparkles as though containing ground diamonds",
            "The smooth thick richly purple drink that has the scent of chocolate and plums",
            "The mysterious black liquid that gleams like ink and gives off fumes that make you see strange visions"
        ]
    },
    {
        "Which kind of instrument most pleases your ear?": [
            "The drum",
            "The piano",
            "The trumpet",
            "The violin"
        ]
    },
    {
        "Which of the following would you most hate people to call you?": [
            "Cowardly",
            "Ignorant",
            "Selfish",
            "Ordinary"
        ]
    },
    {
        "After you died, what would you most like people to do when they hear your name?": [
            "Tell stories about your adventures",
            "Think about your achievements",
            "Miss you, but smile",
            "You don't care what people think about you, you lived life how you wanted"
        ]
    },
    {
        "How would you like to be known to history?": [
            "The Bold",
            "The Wise",
            "The Good",
            "The Great"
        ]
    },
    {
        "A muggle confronts you and says they know you are a magical. What do you do?": [
            "Agree and walk away, leaving them to wonder",
            "Ask what makes them think so",
            "Tell them you are worried about their mental health and offer to call a doctor",
            "Agree and ask whether they'd like a free sample of a jinx"
        ]
    },
    {
        "Which nightmare would frighten you most?": [
            "An eye at the keyhole of a dark windowless room in which you are locked",
            "Standing on top of something very high with nothing to hold onto",
            "Waking up to find that your friends and family don't know who you are",
            "Being forced to speak in a silly voice that makes everyone laugh at you"
        ]
    },
    {
        "If you could invent a potion that would guarantee you one thing, which would you choose?": [
            "Glory",
            "Wisdom",
            "Love",
            "Power"
        ]
    },
    {
        "If you could have any power, which would you choose?": [
            "Invisibility",
            "Mind reading",
            "Speaking to animals",
            "Change the past"
        ]
    },
    {
        "Which road tempts you most?": [
            "The twisting, leaf-strewn path through the woods",
            "The cobbled street lined with ancient buildings",
            "The wide sunny grassy lane",
            "The narrow dark lantern-lit alley"
        ]
    },
    {
        "Walking alone at night, you hear a peculiar cry that you believe to have a magical source. What do you do?": [
            "Draw your wand and search out the source of the sound",
            "Withdraw into the shadows to mentally review spells",
            "Proceed with caution, keeping one hand on your wand",
            "Draw your wand and stand your ground"
        ]
    },
    {
        "Which would you rather be?": [
            "Praised",
            "Envied",
            "Trusted",
            "Feared"
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

      if (event.session.application.applicationId !== "amzn1.ask.skill.02b4832d-0d50-4f1f-890c-fbc7ce9a486f") {
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

    // add any session init logic here
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
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
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

var ANSWER_COUNT = 4;
var GAME_LENGTH = 7;
var CARD_TITLE = "Sorting Hat"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Time to get you sorted. I will ask you " + GAME_LENGTH.toString()
            + " questions. Just say the number of the answer you desire. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
//        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        //roundAnswers = populateRoundAnswers(gameQuestions, 0, 0),

        currentQuestionIndex = 0;
var
        spokenQuestion = Object.keys(gameQuestions[currentQuestionIndex])[0],
        //TODO: change this when you want to randomize the questions         
        roundAnswers = gameQuestions[currentQuestionIndex][spokenQuestion],
        repromptText = "Question 1. " + spokenQuestion + " ",
        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". ";
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "questions": gameQuestions,
        "gryffScore": 0,
        "ravenScore": 0,
        "huffleScore": 0,
        "slythScore": 0
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
      
      
//        index -= 1;
//        var temp = indexList[index];
//        indexList[index] = indexList[rand];
//        indexList[rand] = temp;
      gameQuestions.push(questions[rand]);
    }
    return gameQuestions;
}

// function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
//     // Get the answers for a given question, and place the correct answer at the spot marked by the
//     // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
//     // only ANSWER_COUNT will be selected.
//     var answers = [],
//         answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
//         temp, i;

//     var index = answersCopy.length;

//     if (index < ANSWER_COUNT){
//         throw "Not enough answers for question.";
//     }

//     // Shuffle the answers, excluding the first element.
//     for (var j = 1; j < answersCopy.length; j++){
//         var rand = Math.floor(Math.random() * (index - 1)) + 1;
//         index -= 1;

//         var temp = answersCopy[index];
//         answersCopy[index] = answersCopy[rand];
//         answersCopy[rand] = temp;
//     }

//     // Swap the correct answer into the target location
//     for (i = 0; i < ANSWER_COUNT; i++) {
//         answers[i] = answersCopy[i];
//     }
//     temp = answers[0];
//     answers[0] = answers[correctAnswerTargetLocation];
//     answers[correctAnswerTargetLocation] = temp;
//     return answers;
// }

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no sorting game in progress. Do you want to start a new sorting game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex);
        var gryffScore = session.attributes.gryffScore,
            ravenScore = session.attributes.ravenScore,
            huffleScore = session.attributes.huffleScore,
            slythScore = session.attributes.slythScore;

        if (parseInt(intent.slots.Answer.value) == 1) {
            gryffScore++;
        } else if (parseInt(intent.slots.Answer.value) == 2) {
            ravenScore++;
        } else if (parseInt(intent.slots.Answer.value) == 3) {
            huffleScore++;
        } else {
            slythScore++;
        }
        // if currentQuestionIndex is 1 less than game length, we've reached the end and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = "Hmm, difficult. Very difficult. Where to put you?";
            var houseScores = {
                Gryffindor: gryffScore,
                Ravenclaw: ravenScore,
                Hufflepuff: huffleScore,
                Slytherin: slythScore
            };
            var topHouse,
                topScore;
                
            for (var key in houseScores) {
                console.log(houseScores[key]);
                console.log(topHouse);
                console.log(key);
                if (houseScores[key] > topScore || topHouse === undefined) {
                    topHouse = key;
                    topScore = houseScores[key];
                }
            }
            speechOutput += "Better be, " + topHouse.toString() + ". Congratulations!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            console.log("next question");
            var spokenQuestion = Object.keys(gameQuestions[currentQuestionIndex])[0],
                roundAnswers = gameQuestions[currentQuestionIndex][spokenQuestion],
                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += "Hmm, interesting. " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "questions": gameQuestions,
                "gryffScore": gryffScore,
                "ravenScore": ravenScore,
                "huffleScore": huffleScore,
                "slythScore": slythScore
            };
            console.log("Gryffindor score: " + gryffScore);
            console.log("Ravenclaw score: " + ravenScore);
            console.log("Hufflepuff score: " + huffleScore);
            console.log("Slytherin score: " + slythScore);
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, session.attributes.repromptText, false));
        }
    }
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

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
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

