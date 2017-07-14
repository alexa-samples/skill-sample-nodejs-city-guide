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

var locationOverview = "Carborro is a city in the North Carolina triangle and is in Orange country. Located directly west of Chapel Hill, home of the University of North Carolina's flagship campus, Carrboro has a reputation as one of the most progressive communities in the Southern United States.  What else would you like to know?";

var HelpMessage = "Here are some things you  can say: Give me an attraction. Tell me about " + location + ". Tell me the top five things to do. Tell me the local news.  What would you like to do?";

var moreInformation = "See your  Alexa app for  more  information."

var tryAgainMessage = "please try again."

var noAttractionErrorMessage = "There was an error finding this attraction, " + tryAgainMessage;

var topFiveMoreInfo = " You can tell me a number for more information. For example open number one.";

var getMoreInfoRepromtMessage = "What number attraction would you like to hear about?";
n
var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, have a nice time in " + location + ".";

var newsIntroMessage = "These are the " + numberOfResults + " most recent " + location + " headlines, you can read more on your Alexa app. ";

var hearMoreMessage = "Would you like to hear about another top thing that you can do in " + location +"?";

var newline = "\n";

var output = "";

var alexa;

var attractions = [
    { name: "The Woodland Park Zoo", content: "located just 10 minutes north of downtown Seattle. The zoo's 92-acres and award-winning exhibits are home to more than 1,000 animals representing 300 species from around the world.", location: "There are two zoo entrances. \n West Entrance:\n Cross streets: Phinney Ave. N. between N. 55th St. & N. 56th St.\n Street address: 5500 Phinney Ave. N., Seattle WA 98103\n South Entrance:\n Cross streets: N. 50th Street & Fremont Ave. N.\n Street address: 750 N. 50th Street, Seattle WA 98103", contact: "zooinfo@zoo.org\n 206 548 2500" },
    { name: "The EMP Museum", content: "Dedicated to contemporary popular culture, the EMP Museum was established by Microsoft co-founder Paul Allen in 2000. It's home to exhibits, interactive activity stations, sound sculpture, and various educational resources.", location: "325 5th Avenue N, Seattle, Washington", contact: "206 770 2700" },
    { name: "Waterfront Park", content: "Designed by the Bumgardner Partnership and consultants, Waterfront Park is a public park constructed on the site of the former Schwabacher Wharf. you can enjoy excellent views of the surrounding arey, such as the city skyline, ships in drydock, container cranes and the West Seattle Bridge.", location: "1401 Alaskan Way, Seattle, WA 98101, United States", contact: "206 684 4075" },
    { name: "Chihuly Garden and Glass", content: "Opened in 2012 on the former site of the Fun Forest, Chihuly Garden and Glass is an exhibit showcasing the work of Dale Chihuly. It comprises of three primary components: the Garden, the Glasshouse, and the Interior Exhibit. There is also a 90 seat cafe with additional outdoor dining.", location: "305 Harrison St, Seattle, WA 98109, United States", contact: "206 753 4940" },
    { name: "Woodland Park", content: "A 90 acre public park home to many species of birds and mammals. Woodland park boasts several picnic areas, a formal rose garden, ballfields, a miniature golf range and a play area for children.", location: "1000 N 50th St, Seattle, WA 98103, United States", contact: "206 684 4075" },
];


var topFive = [
    { number: "1", caption: "Live and breathe the local food scene!", more: "Carrboro has an ecclectic and exciting local food and drink scene. Visit the critically acclaimed local resturants such as ACME and Pizzeria Mercato. After eating to satiation, have a night cap by visiting the local bars and asking for a pickleback- a local speciality drink.", location: "Mercato: \n408 W Weaver St, Carrboro, NC\nBaxter Barcade:\n 108 N Graham St, Carrboro, NC 27510\n", contact: "Mercato: 919 967 2277\nBaxter: 919 929 2263\n" },
    { number: "2", caption: "Run free at the local greenways.", more: "North Carolina is absolutely beautiful. One of the best ways to experience nature is through the parks system. Carrboro is one of the most pedestrian friendly areas of the entire state, and it shows through their paved and unpaved greenways and park system. When you're in the area- ensure you make time to explore the nature.", location: "Miscellaneous: Review the websites of Carrboro Parks and Recreation for more information", contact: "919 918 4475" },
    { number: "3", caption: "Geek out at Baxter and put your quarters to good use.", more: "Baxter Barcade is a staple for hip people in Carrboro. When walking in, patrons are greeted with the sounds of classic arcades, pinball flippers, and nostalgic flashign lights. Games are only 25 cents a pop, and Baxter often hosts community events like The Walking Dead night.", location: "108 N Graham St, Carrboro, NC 27510", contact: "919 869 7486" },
    { number: "4", caption: "Get caught up in the rivalry watching a Tar Heels game.", more: "The athletic rivalry between the Duke Blue Devils and North carolina tarheels is considered one of the most intense rivalries in all of sports according to a poll conducted by Sports Illustrated. Visit Franklin Street during a game night and you are guaranteed to be in the midst of hundreds of UNC students and enjoy the energy of the basketball game.", location: "Anywhere on Franklin Street", contact: "Anyone At UNC Chapel Hill" },
    { number: "5", caption: "Maximize your time giving back to the community by volunteering.", more: "Carrobo is a small town with a tight knight community. Find a non profit that really is powerful to you and make some time to make a difference in the community around you. ReCYCLEry and Weaver Street Market are both great places to start volunteering. Both coops are community owned and are geared towards making people empowered and partner up with disabled communities. Making positive impactful changes on the community around you embodies the Tarheel spirit.", location: "ReCYCLEry: \n108 N Graham St, Chapel Hill, NC 27516\nWeaver Street Market: 716 Market St, Chapel Hill, NC 27516\n", contact: "ReCYCLEry:\nbikes@recyclery.org\nWeaver Street Market: tablenc@gmail.com" }
];

var topFiveIntro = "Here are the top five things to  do in " + location + ".";

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getTopFiveIntent': function(){
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
e    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
l    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'getOverview': function () {
        output = locationOverview;
/        this.emit(':askWithCard', output, location, locationOverview);
    },
    'getAttractionIntent': function () {
        var cardTitle = location;
        var cardContent = "";

        var attraction = attractions[Math.floor(Math.random() * attractions.length)];
        if (attraction) {
            output = attraction.name + " " + attraction.content + newline + moreInformation;
            cardTitle = attraction.name;
            cardContent = attraction.content + newline + attraction.contact;

            this.emit(':tellWithCard', output, cardTitle, cardContent);
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
        var slotValue = this.event.request.intent.slots.attraction.value;
        var index = parseInt(slotValue) - 1;

        var selectedAttraction = topFive[index];
        if (selectedAttraction) {

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
