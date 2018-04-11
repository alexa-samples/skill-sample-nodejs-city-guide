
// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const languageStrings = {
    'en': {
        'translation': {
            'WELCOME' : "Welcome to Gloucester Guide!",
            'HELP'    : "Say about, to hear more about the city, or say coffee, breakfast, lunch, or dinner, to hear local restaurant suggestions, or say recommend an attraction, or say, go outside. ",
            'ABOUT'   : "Gloucester Massachusetts is a city on the Atlantic Ocean.  A popular summer beach destination, Gloucester has a rich history of fishing and ship building.",
            'STOP'    : "Okay, see you next time!"
        }
    }
    // , 'de-DE': { 'translation' : { 'TITLE'   : "Local Helfer etc." } }
};
const data = {
    "city"        : "Gloucester",
    "state"       : "MA",
    "postcode"    : "01930",
    "restaurants" : [
        { "name":"Zeke's Place",
            "address":"66 East Main Street", "phone": "978-283-0474",
            "meals": "breakfast, lunch",
            "description": "A cozy and popular spot for breakfast.  Try the blueberry french toast!"
        },
        { "name":"Morning Glory Coffee Shop",
            "address":"25 Western Avenue", "phone": "978-281-1851",
            "meals": "coffee, breakfast, lunch",
            "description": "A homestyle diner located just across the street from the harbor sea wall."
        },
        { "name":"Sugar Magnolias",
            "address":"112 Main Street", "phone": "978-281-5310",
            "meals": "breakfast, lunch",
            "description": "A quaint eatery, popular for weekend brunch.  Try the carrot cake pancakes."
        },
        { "name":"Seaport Grille",
            "address":"6 Rowe Square", "phone": "978-282-9799",
            "meals": "lunch, dinner",
            "description": "Serving seafood, steak and casual fare.  Enjoy harbor views on the deck."
        },
        { "name":"Latitude 43",
            "address":"25 Rogers Street", "phone": "978-281-0223",
            "meals": "lunch, dinner",
            "description": "Features artsy decor and sushi specials.  Live music evenings at the adjoining Minglewood Tavern."
        },
        { "name":"George's Coffee Shop",
            "address":"178 Washington Street", "phone": "978-281-1910",
            "meals": "coffee, breakfast, lunch",
            "description": "A highly rated local diner with generously sized plates."
        },

    ],
    "attractions":[
        {
            "name": "Whale Watching",
            "description": "Gloucester has tour boats that depart twice daily from Rogers street at the harbor.  Try either the 7 Seas Whale Watch, or Captain Bill and Sons Whale Watch. ",
            "distance": "0"
        },
        {
            "name": "Good Harbor Beach",
            "description": "Facing the Atlantic Ocean, Good Harbor Beach has huge expanses of soft white sand that attracts hundreds of visitors every day during the summer.",
            "distance": "2"
        },
        {
            "name": "Rockport",
            "description": "A quaint New England town, Rockport is famous for rocky beaches, seaside parks, lobster fishing boats, and several art studios.",
            "distance": "4"
        },
        {
            "name": "Fenway Park",
            "description": "Home of the Boston Red Sox, Fenway park hosts baseball games From April until October, and is open for tours. ",
            "distance": "38"
        }
    ]
}

const SKILL_NAME = "Gloucester Guide";

// Weather courtesy of the Yahoo Weather API.
// This free API recommends no more than 2000 calls per day

const myAPI = {
    host: 'query.yahooapis.com',
    port: 443,
    path: `/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(data.city)}%2C%20${data.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
    method: 'GET'
};
// 2. Skill Code =======================================================================================================

const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        let say = this.t('WELCOME') + ' ' + this.t('HELP');
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'AboutIntent': function () {
        this.response.speak(this.t('ABOUT'));
        this.emit(':responseReady');
    },

    'CoffeeIntent': function () {
        let restaurant = randomArrayElement(getRestaurantsByMeal('coffee'));
        this.attributes['restaurant'] = restaurant.name;

        let say = 'For a great coffee shop, I recommend, ' + restaurant.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'BreakfastIntent': function () {
        let restaurant = randomArrayElement(getRestaurantsByMeal('breakfast'));
        this.attributes['restaurant'] = restaurant.name;

        let say = 'For breakfast, try this, ' + restaurant.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'LunchIntent': function () {
        let restaurant = randomArrayElement(getRestaurantsByMeal('lunch'));
        this.attributes['restaurant'] = restaurant.name;

        let say = 'Lunch time! Here is a good spot. ' + restaurant.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'DinnerIntent': function () {
        let restaurant = randomArrayElement(getRestaurantsByMeal('dinner'));
        this.attributes['restaurant'] = restaurant.name;

        let say = 'Enjoy dinner at, ' + restaurant.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'AMAZON.YesIntent': function () {
        let restaurantName = this.attributes['restaurant'];
        let restaurantDetails = getRestaurantByName(restaurantName);

        let say = restaurantDetails.name
            + ' is located at ' + restaurantDetails.address
            + ', the phone number is ' + restaurantDetails.phone
            + ', and the description is, ' + restaurantDetails.description
            + '  I have sent these details to the Alexa App on your phone.  Enjoy your meal! <say-as interpret-as="interjection">bon appetit</say-as>' ;

        let card = restaurantDetails.name + '\n' + restaurantDetails.address + '\n'
            + data.city + ', ' + data.state + ' ' + data.postcode
            + '\nphone: ' + restaurantDetails.phone + '\n';

        this.response.cardRenderer(SKILL_NAME, card);
        this.response.speak(say);
        this.emit(':responseReady');

    },

    'AttractionIntent': function () {
        let distance = 200;
        if (isNaN(this.event.request.intent.slots.distance.value)) {
            let say = 'Sorry, I didnt quite catch the distance you asked for. Can you ask that again?';

            this.response.speak(say).listen(say);;
            this.emit(':responseReady');
          } else {

            if (this.event.request.intent.slots.distance.value) {
              distance = this.event.request.intent.slots.distance.value;
            }

          let attraction = randomArrayElement(getAttractionsByDistance(distance));

          let say = 'Try '
              + attraction.name + ', which is '
              + (attraction.distance == "0" ? 'right downtown. ' : attraction.distance + ' miles away. Have fun! ')
              + attraction.description;

          this.response.speak(say);
          this.emit(':responseReady');
        }
    },

    'GoOutIntent': function () {

        getWeather( ( localTime, currentTemp, currentCondition) => {
            // time format 10:34 PM
            // currentTemp 72
            // currentCondition, e.g.  Sunny, Breezy, Thunderstorms, Showers, Rain, Partly Cloudy, Mostly Cloudy, Mostly Sunny

            // sample API URL for Irvine, CA
            // https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22irvine%2C%20ca%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys

            let say = 'It is ' + localTime
                + ' and the weather in ' + data.city
                + ' is '
                + currentTemp + ' and ' + currentCondition;
            this.response.speak(say);
            this.emit(':responseReady');

            // TODO
            // Decide, based on current time and weather conditions,
            // whether to go out to a local beach or park;
            // or recommend a movie theatre; or recommend staying home


        });
    },

    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak(this.t('HELP')).listen(this.t('HELP'));
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('STOP'));
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.response.speak(this.t('STOP'));
        this.emit(':responseReady');
    }

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function getRestaurantsByMeal(mealtype) {

    let list = [];
    for (let i = 0; i < data.restaurants.length; i++) {

        if(data.restaurants[i].meals.search(mealtype) >  -1) {
            list.push(data.restaurants[i]);
        }
    }
    return list;
}

function getRestaurantByName(restaurantName) {

    let restaurant = {};
    for (let i = 0; i < data.restaurants.length; i++) {

        if(data.restaurants[i].name == restaurantName) {
            restaurant = data.restaurants[i];
        }
    }
    return restaurant;
}

function getAttractionsByDistance(maxDistance) {

    let list = [];

    for (let i = 0; i < data.attractions.length; i++) {

        if(parseInt(data.attractions[i].distance, 10) <= maxDistance) {
            list.push(data.attractions[i]);
        }
    }
    return list;
}

function getWeather(callback) {
    let https = require('https');


    let req = https.request(myAPI, res => {
        res.setEncoding('utf8');
        let returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });
        res.on('end', () => {
            let channelObj = JSON.parse(returnData).query.results.channel;

            let localTime = channelObj.lastBuildDate.toString();
            localTime = localTime.substring(17, 25).trim();

            let currentTemp = channelObj.item.condition.temp;

            let currentCondition = channelObj.item.condition.text;

            callback(localTime, currentTemp, currentCondition);

        });

    });
    req.end();
}
function randomArrayElement(array) {
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
