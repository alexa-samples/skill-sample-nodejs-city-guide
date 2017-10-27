var wordsmithKey = 'YOUR KEY HERE';
var Alexa = require('alexa-sdk');
var https = require('https');


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var languageStrings = {
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
var data = {
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

// Weather courtesy of the Yahoo Weather API.
// This free API recommends no more than 2000 calls per day

var myAPI = {
    host: 'query.yahooapis.com',
    port: 443,
    path: `/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(data.city)}%2C%20${data.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
    method: 'GET'
};
// 2. Skill Code =======================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        var say = this.t('WELCOME') + ' ' + this.t('HELP');
        this.emit(':ask', say, say);
    },

    'AboutIntent': function () {
        this.emit(':tell', this.t('ABOUT'));
    },

    'CoffeeIntent': function () {
        var restaurant = randomArrayElement(getRestaurantsByMeal('coffee'));
        this.attributes['restaurant'] = restaurant.name;

        var say = 'For a great coffee shop, I recommend, ' + restaurant.name + '. Would you like to hear more?';
        this.emit(':ask', say);
    },

    'BreakfastIntent': function () {
        var restaurant = randomArrayElement(getRestaurantsByMeal('breakfast'));
        this.attributes['restaurant'] = restaurant.name;

        var say = 'For breakfast, try this, ' + restaurant.name + '. Would you like to hear more?';
        this.emit(':ask', say);
    },

    'LunchIntent': function () {
        var restaurant = randomArrayElement(getRestaurantsByMeal('lunch'));
        this.attributes['restaurant'] = restaurant.name;

        var say = 'Lunch time! Here is a good spot. ' + restaurant.name + '. Would you like to hear more?';
        this.emit(':ask', say);
    },

    'DinnerIntent': function () {
        var restaurant = randomArrayElement(getRestaurantsByMeal('dinner'));
        this.attributes['restaurant'] = restaurant.name;

        var say = 'Enjoy dinner at, ' + restaurant.name + '. Would you like to hear more?';
        this.emit(':ask', say);
    },

    'AMAZON.YesIntent': function () {
        var restaurantName = this.attributes['restaurant'];
        var restaurantDetails = getRestaurantByName(restaurantName);

        var say = restaurantDetails.name
            + ' is located at ' + restaurantDetails.address
            + ', the phone number is ' + restaurantDetails.phone
            + ', and the description is, ' + restaurantDetails.description
            + '  I have sent these details to the Alexa App on your phone.  Enjoy your meal! <say-as interpret-as="interjection">bon appetit</say-as>' ;

        var card = restaurantDetails.name + '\n' + restaurantDetails.address + '\n'
            + data.city + ', ' + data.state + ' ' + data.postcode
            + '\nphone: ' + restaurantDetails.phone + '\n';

        this.emit(':tellWithCard', say, restaurantDetails.name, card);

    },

    'AttractionIntent': function () {
        var distance = 200;
        if (this.event.request.intent.slots.distance.value) {
            distance = this.event.request.intent.slots.distance.value;
        }

        var attraction = randomArrayElement(getAttractionsByDistance(distance));

        var say = 'Try '
            + attraction.name + ', which is '
            + (attraction.distance == "0" ? 'right downtown. ' : attraction.distance + ' miles away. Have fun! ')
            + attraction.description;

        this.emit(':tell', say);
    },

    'GoOutIntent': function () {

        getWeather( (weatherData) => {
            let say = `The high temperature will be ${weatherData.temp} in ${weatherData.city} and conditions are forecast to be ${weatherData.conditions}.`;

            this.emit(':tell', say, say);
            // getWordsmithNarrative({data: weatherData}, (say) => {
            //     this.emit(':tell', say, say);
            // })
        });
    },

    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', this.t('HELP'));
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP'));
    }

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function getRestaurantsByMeal(mealtype) {

    var list = [];
    for (var i = 0; i < data.restaurants.length; i++) {

        if(data.restaurants[i].meals.search(mealtype) >  -1) {
            list.push(data.restaurants[i]);
        }
    }
    return list;
}

function getRestaurantByName(restaurantName) {

    var restaurant = {};
    for (var i = 0; i < data.restaurants.length; i++) {

        if(data.restaurants[i].name == restaurantName) {
            restaurant = data.restaurants[i];
        }
    }
    return restaurant;
}

function getAttractionsByDistance(maxDistance) {

    var list = [];

    for (var i = 0; i < data.attractions.length; i++) {

        if(parseInt(data.attractions[i].distance) <= maxDistance) {
            list.push(data.attractions[i]);
        }
    }
    return list;
}

// Abstraction layer for weather conditions
var condMap = {
    rain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 35, 37, 38, 39, 40, 45, 47],
    snow: [13, 14, 15, 16, 17, 18, 41, 42, 43, 46],
    cloudy: [19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 44]
}

function getWeather(callback) {
    var https = require('https');


    var req = https.request(myAPI, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });
        res.on('end', () => {
            let channelObj = JSON.parse(returnData).query.results.channel;
            let condition = 'clear';
            Object.keys(condMap).forEach(function(key) {
                if (condMap[key].indexOf(parseInt(channelObj.item.forecast.code)) !== -1) condition = key;
            })
            weatherData = {
                city: channelObj.location.city,
                state: channelObj.location.region,
                temp: channelObj.item.forecast[0].high,
                conditions: condition,
                wind: channelObj.wind.speed
            }

            callback(weatherData);

        });

    });
    req.end();
}
function randomArrayElement(array) {
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}

function getWordsmithNarrative(data, callback) {
    let wordsmithOpts = {
        host: 'api.automatedinsights.com',
        path: '/v1.5/projects/wordsmith-alexa-weather/templates/wordsmith-alexa-weather-template/outputs',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${wordsmithKey}`,
            'User-Agent': 'Voicehacks Wordsmith Alexa Weather'
        },
        method: 'POST'
    }

    let req = https.request(wordsmithOpts, res => {
        res.setEncoding('utf8');
        let returnData = '';

        res.on('data', chunk => {
            returnData += chunk;
        });
        res.on('end', () => {
            console.log(returnData);
            let narrative = JSON.parse(returnData).data.content;
            callback(narrative);
        });
    })
    req.write(JSON.stringify(data));
    req.end();
}