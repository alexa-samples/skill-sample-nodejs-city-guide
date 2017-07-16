var Alexa = require('alexa-sdk');
var http = require('http');

var states = {
    SEARCHMODE: '_SEARCHMODE',
    TOPFIVE: '_TOPFIVE',
};

var location = "Carrboro";

var numberOfResults = 3;

var APIKey = "4844d21f760b47359945751b9f875877";

var welcomeMessage = location + " Guide. You can ask me for an attraction, the local news, or  say help. What will it be?";

var welcomeRepromt = "You can ask me for an attraction, the local news, or  say help. What will it be?";

var locationOverview = "Carrboro is a city in the North Carolina triangle and is in Orange country. Located directly west of Chapel Hill, home of the University of North Carolina's flagship campus, Carrboro has a reputation as one of the most progressive communities in the Southern United States.  What else would you like to know?";

var HelpMessage = "Here are some things you  can say: Give me an attraction. Tell me about " + location + ". Tell me the top five things to do. Tell me the local news.  What would you like to do?";

var moreInformation = "See your  Alexa app for  more  information."

var tryAgainMessage = "please try again."

var noAttractionErrorMessage = "What attraction was that? " + tryAgainMessage;

var topFiveMoreInfo = " You can tell me a number for more information. For example, open number one.";

var getMoreInfoRepromtMessage = "What number attraction would you like to hear about?";

var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, have a nice time in " + location + ".";

var newsIntroMessage = "These are the " + numberOfResults + " most recent " + location + " headlines, you can read more on your Alexa app. ";

var hearMoreMessage = "Would you like to hear about another top thing that you can do in " + location +"?";

var newline = "\n";

var output = "";

var alexa;

var attractions = [
    { name: "Weaver Street Lawn", content: "Weaver Street Market,  a community owned grocery, has three locations and all host free live music events on Sundays.", location: "There are three locations. \n Carrboro:\n Street Address: 101 East Weaver Street\n Hillsborough\n Street Address: 228 South Churton Street \n Chapel Hill\n Street address: 716 Market Street\n", contact: "919 929 0010" },
    { name: "Farmers Market", content: "Touted as one of the finest local markets in the country, the Carrboro Farmers' Market has provided an opportunity for local farmers to sell their products directly to the consumer since 1979.", location: "Street Address: 301 W Main St\n", contact: "919 280 3326" },
    { name: "Cat's Cradle", content: "The Cat's Cradle is a music venue located in Carrboro. The Cat's Cradle hosts up and coming indie music acts, but also hosts established acts- including Nirvana, Pearl Jam, and Public Enemy. Tickets are very affordable and range from 8 to 20 dollars a piece.", location: "Street Address: 300 E Main Street\n", contact: "206 684 4075" },
    { name: "The Arts Center", content: "For thirty years the ArtsCenter in Carrboro has functioned as a dynamic artistic center for the community. It features a nonstop calendar of art classes, world-music, theater, children and family programming, and art exhibits. The facilities include a theater, classrooms, a dance studio, an informal performance space, and an art gallery.", location: "Street Address:\n 300-G East Main Street\n", contact: "919 929 2787" },
    { name: "The Taco Trucks!", content: "Carrboro has a taco truck on every corner. Tacos are delecious- and anyone who has eaten a taco from a taco truck can attest that they produce the world's best tacos.", location: "Street Address: Every Corner", contact: "1-800-TACO\n Warning: Not actually how you contact a taco truck.\n Taco trucks are decentralized and do not share a single number." },

];

var topFive = [
    { number: "1", caption: "Live and breathe the local food scene!", more: "Carrboro has an ecclectic and exciting local food and drink scene. Visit the critically acclaimed local resturants such as ACME and Pizzeria Mercato. After eating to satiation, have a night cap by visiting the local bars and asking for a pickleback- a local speciality drink.", location: "Mercato: \n408 W Weaver St, Carrboro, NC\nBaxter Barcade:\n 108 N Graham St, Carrboro, NC 27510\n", contact: "Mercato: 919 967 2277\nBaxter: 919 929 2263\n" },
    { number: "2", caption: "Run free at the local greenways.", more: "North Carolina is absolutely beautiful. One of the best ways to experience nature is through the parks system. Carrboro is one of the most pedestrian friendly areas of the entire state, and it shows through their paved and unpaved greenways and park system. When you're in the area- ensure you make time to explore the nature.", location: "Miscellaneous: Review the websites of Carrboro Parks and Recreation for more information", contact: "919 918 4475" },
    { number: "3", caption: "Geek out at Baxter and put your quarters to good use.", more: "Baxter Barcade is a staple for hip people in Carrboro. When walking in, patrons are greeted with the sounds of classic arcades, pinball flippers, and nostalgic flashign lights. Games are only 25 cents a pop, and Baxter often hosts community events like The Walking Dead night.", location: "108 N Graham St, Carrboro, NC 27510", contact: "919 869 7486" },
    { number: "4", caption: "Get caught up in the rivalry watching a Tar Heels game.", more: "Get caught up in the rivalry watching a Tar Heels game.", more: "The athletic rivalry between the Duke Blue Devils and North carolina tarheels is considered one of the most intense rivalries in all of sports according to a poll conducted by Sports Illustrated. Visit Franklin Street during a game night and you are guaranteed to be in the midst of hundreds of UNC students and enjoy the energy of the basketball game.", location: "Anywhere on Franklin Street", contact: "Anyone At UNC Chapel Hill" },
    { number: "5", caption: "Maximize your time giving back to the community by volunteering.", more: "Carrobo is a small town with a tight knight community. Find a non profit that really is powerful to you and make some time to make a difference in the community around you. ReCYCLEry and Weaver Street Market are both great places to start volunteering. Both coops are community owned and are geared towards making people empowered and partner up with disabled communities. Making positive impactful changes on the community around you embodies the Tarheel spirit.", location: "ReCYCLEry: \n108 N Graham St, Chapel Hill, NC 27516\nWeaver Street Market: 716 Market St, Chapel Hill, NC 27516", contact: "ReCYCLEry:\nbikes@recyclery.org Weaver Street Market: tablenc@gmail.com" }
];

var topFiveIntro = "Here are the top five things to  do in " + location + ".";

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
    'getNewsIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getNewsIntent');
    },
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getTopFiveIntent': function(){
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'getOverview': function () {
        output = locationOverview;
        this.emit(':askWithCard', output, output, locationOverview);

    },
    'getAttractionIntent': function () {
        var cardTitle = location;
        var cardContent = "";

        var attraction = attractions[Math.floor(Math.random() * attractions.length)];
        if (attraction) {
            output = attraction.name + " " + attraction.content + newline + moreInformation;
            cardTitle = attraction.name;
            cardContent = attraction.content + newline + attraction.contact;

            this.emit(':askWithCard', output, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage, tryAgainMessage);
        }
    },
    'getTopFiveIntent': function () {
        output = topFiveIntro;
        var cardTitle = "Top Five Things To See in " + location;

        for (var counter = topFive.length - 1; counter >= 0; counter--) {
            output += " Number " + topFive[counter].number + ": " + topFive[counter].caption + newline;
        }
        output += topFiveMoreInfo;
        this.handler.state = states.TOPFIVE;
        this.emit(':askWithCard', output, topFiveMoreInfo, cardTitle, output);
    },
    'AMAZON.YesIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.NoIntent': function () {
        output = HelpMessage;
        this.emit(':ask', HelpMessage, HelpMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'getNewsIntent': function () {
        httpGet(location, function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by New York Times\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = newsIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.response.docs.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData.response.docs[i].headline.main;
                        var index = i + 1;

                        output += " Headline " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " See your Alexa app for more information.";
            }

            var cardTitle = location + " News";

            alexa.emit(':tellWithCard', output, cardTitle, cardContent);
        });
    },

    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

var topFiveHandlers = Alexa.CreateStateHandler(states.TOPFIVE, {
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
    'getTopFiveIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },

    'getMoreInfoIntent': function () {
        var slotValue = 0;
        if(this.event.request.intent.slots.attraction ) {
            if (this.event.request.intent.slots.attraction.value) {
                slotValue = this.event.request.intent.slots.attraction.value;

            }
        }

        if (slotValue > 0 && slotValue <= topFive.length) {

            var index = parseInt(slotValue) - 1;
            var selectedAttraction = topFive[index];

            output = selectedAttraction.caption + ". " + selectedAttraction.more + ". " + hearMoreMessage;
            var cardTitle = selectedAttraction.name;
            var cardContent = selectedAttraction.caption + newline + newline + selectedAttraction.more + newline + newline + selectedAttraction.location + newline + newline + selectedAttraction.contact;

            this.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage);
        }
    },

    'AMAZON.YesIntent': function () {
        output = getMoreInfoMessage;
        alexa.emit(':ask', output, getMoreInfoRepromtMessage);
    },
    'AMAZON.NoIntent': function () {
        output = goodbyeMessage;
        alexa.emit(':tell', output);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
    },

    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, startSearchHandlers, topFiveHandlers);
    alexa.execute();
};

// Create a web request and handle the response.
function httpGet(query, callback) {
    console.log("/n QUERY: "+query);

    var options = {
        //http://api.nytimes.com/svc/search/v2/articlesearch.json?q=seattle&sort=newest&api-key=
        host: 'api.nytimes.com',
        path: '/svc/search/v2/articlesearch.json?q=' + query + '&sort=newest&api-key=' + APIKey,
        method: 'GET'
    };

    var req = http.request(options, (res) => {

            var body = '';

    res.on('data', (d) => {
        body += d;
});

    res.on('end', function () {
        callback(body);
    });

});
    req.end();

    req.on('error', (e) => {
        console.error(e);
});
}

String.prototype.trunc =
    function (n) {
        return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
};

