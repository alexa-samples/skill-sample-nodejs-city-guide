# Build An Alexa City Guide Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/step-by-step/4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/step-by-step/5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/step-by-step/6-publication.md)

## Customize the Skill to be Yours

At this point, you should have a working copy of our City Guide skill.  In order to make it your own, you will need to customize it with data and responses that you create.  Here are the things you will need to change:

1.  **New data.** You will need to create a new dataset for your skill that *isn't* the Gloucester, Massachusetts.  If you are looking for an idea, just use your hometown or favorite vacation destination.

    1.  **Open a copy of index.js.** If you haven't already downloaded the code for this project, [you can find a copy of index.js here on GitHub](https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/lambda/custom/index.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Lambda function.

    2.  **Search for the comment "const data = {"**  This is the data for our skill.  You can see that there is a row for city, state, postcode, restaurants, and attractions.

        You can provide as few or as many properties for your restaurant and attractions data as you would like, but we recommend a minimum of three to keep your skill interesting.  

    3.  **Consider using built-in slot values.** We recommend considering data from the built-in slot values provided by Amazon.  You still need to build your entire dataset, but using values from the built-in slots will make your work in the next few steps easier.  We have provided a few examples below, but you can see the [entire list of built-in slot values here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#list-types).

        | Slot Name | Description | Sample Values | Supported Languages |
        | --------- | ----------- | ------------- | ------------------- |
        | [AMAZON.Actor](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#actor) | Names of actors and actresses | Alan Rickman, Amy Adams, Daniel Radcliffe, Emma Watson | US |
        | [AMAZON.Airline](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#airline) | Name of a variety of airlines | Alaska Airlines, British Airways, Dolphin Air, Maestro | US |
        | [AMAZON.Animal](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#animal) | Names of many different animals | blister beetle, common frog, moray eel, opossum, spider monkey | US |
        | [AMAZON.Comic](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#comic) | Titles of comic books | Justice League, Runaways, The Amazing Spiderman, Watchmen, X-Men | US |
        | [AMAZON.EUROPE_CITY](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#europe_city) | European and world cities | Kempten, Lourdes, Paris, London, Barcelona | US, UK, DE |
        | [AMAZON.Sport](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#sport) | Names of sports | basketball, college football, football, gymnastics, team handball | US |
        | [AMAZON.VideoGame](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#videogame) | Titles of video games | Doom Two, Lemmings, The Sims, Worms | US |

    4.  **Once you have your data, here are a couple of tips to remember as we move forward:**

        *  **Alexa will read your restaurant and attraction names, so each property name should be readable in your questions.**  These names are also used in **cards** in the Alexa app, so you should capitalize the first letter of each word.  The skill will automatically separate words and add spaces as necessary.
        *  **If you can't remember the details for a place, just look them up.** We're going to be publishing this skill, so we need to make sure that our users are getting accurate data.

    5.  **When you have replaced the data in index.js, copy the contents of your file to your Lambda function.**  This should be as simple as copying the text, and pasting it into the code box for your Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/5-1-5-lambda-code-box._TTH_.png" />

2.  **New language.** If you are creating this skill for another language other than English, you will need to make sure Alexa's responses are also in that language.

    *  For example, if you are creating your skill in German, every single response that Alexa makes has to be in German.  You can't use English responses or your skill will fail certification.

3.  **Once you have made the updates listed above, you can move on to some of the optional customization below.**

## Add a New Intent with Slots

1.  **Choosing Slot Types**

Continuing with City Guide, we’ve customized for our city/town, let’s add a feature by adding a new intent, such as a new type of intent that we want our skill to handle. Let’s create an intent so we can ask this skill which sports team plays hockey, baseball, etc. Go into skill builder, create an intent, type a sample utterance, double-click on slot word and define that, then add some code to pull out a slot value and handle the intent and provide a custom response to the user.

1. Go to developer.amazon, click Interaction Model on the left to enter the skill builder.

1. Click "Add New Intent".

1. Name it ``` TeamNameIntent ``` and click Create Intent.

1. Click utterances and type: "what team plays basketball" then enter.

1. Double-click the word basketball, and name it "sport" in the create a new intent slot on the right.

1. Click choose a slot type. You should see a list of suggested slot types- search for sport here, then choose the premade ``` AMAZON.sport ``` type.

1. Click Save & then click Build Skill.

1. Click test.

1. Type "what team plays baseball" into the Service Simulator > Enter Utterance field and then hit enter.

1. When you see the Lambda Request box fill with code, select everything in that box and copy it.

1. In your aws.amazon window: click ‘Actions’ button, then select "Configure Test Event".

1. Paste the code that you just copied into the field that comes up, then scroll down and click "Save and Test".

1. This test should fail, but we expect it to so it's ok.  

1. Go back to your Lambda function and find your handlers. Copy an entire handler and paste it in. You should now have something like this:

```     
    'AboutIntent': function () {
        this.emit(':tell', this.t('ABOUT'));
    },

    'AboutIntent': function () {
        this.emit(':tell', this.t('ABOUT'));
    },
```

1. Change the name of your second AboutIntent to ``` TeamNameIntent ``` .

1. Add a line below the name that has this code: ``` let say = 'handling the team name intent'; ``` .

1. Add a line below that with this code: ``` this.emit(':tell', say); ``` .

1. Now Click Save at the top, then click Test.  This time our test should pass.

1. On the line below ``` let say = 'handling the team name intent'; ```, paste this code:

```
        let sportName = '';
        if (this.event.request.intent.slots.sport.value) {
            sportName = this.event.request.intent.slots.sport.value;
        }
        switch(sportName) {
        case 'basketball':
          say = 'The Boston Celtics are the local basketball team.';
          break;
          case 'hockey':
          say = 'The Boston Bruins are the local hockey team.';
          break;
          case 'baseball':
          say = 'The Boston Red Sox are the local baseball team.';
          break;
          case 'football':
          say = 'The New England Patriots are the local football team.';
          break;
          default:
          say = 'Please try again. You can ask which team plays either basketball, hockey, baseball, or football. ';
        }
```

1. Based on what the user says, this will give our user a response to what they asked, and the default will ensure that we help the user if they ask for a sport we haven't planned on.

1. Save, then test again, then go to the developer portal.

1. Now when you test your utterance in the skill builder, you should get and be able to hear a response.

### Extra Credit

What about custom slot types? The Alexa [Quiz Game](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md) Skill uses a custom slot, named US_STATE_ABBR.  Try creating a custom slot for your own skill.

## Add Smart Recommendations

When the user says "go outside", the ```GoOutIntent``` intent is called and the code in the GoOutIntent handler block is executed.
This makes an API call over the Internet to the Yahoo Weather service, which returns the weather and current time in your city.

You can enhance the ```GoOutIntent``` handler code (around line 185) to make a relevant activity suggestion to the user.
For example, add logic to decide, based on current time and weather conditions, whether to:

 * Go out to a local beach or park
 * Recommend a movie theatre or mall
 * Attend a scheduled public event happening soon
 * Staying home to watch a movie on Amazon Prime
 * etc..

### To begin, follow these steps

1. Test ‘go outside’ skill in simulator first. You should get a standard response giving you the time and weather conditions in your city.

1. Go to your lambda function

1. Scroll through your code to one of the last handlers, called ```GoOutIntent```

1. Now, paste this code into your GoOutIntent:

```
            let AMPM = localTime.substr(-2);
            console.log(AMPM);
            let hour = parseInt(localTime.split(':').shift());
            if(AMPM == "PM" && hour < 12) { hour = hour + 12; }
            console.log(hour);

            let suggestion = 'Read a book.';

            console.log(suggestion);

            if(hour < 7 ) {suggestion = 'Sleep.'; }
            if(hour >= 7 && hour < 12) {suggestion = 'Ask me for a breakfast recommendation.'; }
            if(hour >= 12 && hour < 14) {suggestion = 'Ask me for a lunch recommendation.'; }
            if(hour >= 17 && hour < 20) {suggestion = 'Ask me for a dinner recommendation.'; }

            if(hour >= 22) {suggestion = 'Go to bed.'; }

            if(hour >= 20 && hour < 22) {
                if(['Rain', 'Shower', 'Thunderstorms'].indexOf(currentCondition) > -1) {
                    suggestion = 'Stay home and watch a movie on Amazon Prime since it is wet outside.';   
                } else {
                    suggestion = 'Check out what is playing at the Cineplex movie theater on 123 Main St.';
                }

            }

            if (['Sunny'].indexOf(currentCondition) > -1 -1 && currentTemp > 75 && hour < 11) {suggestion = 'Plan a day at the beach, as it is sunny and warm today.'}

            console.log(suggestion);
            this.emit(':tell', 'It is ' + localTime
            + ' and the weather in ' + data.city
            + ' is '
            + currentTemp + ' and ' + currentCondition
            + '. I suggest you ' + suggestion);
```            

1. What we have just done is create some logic that matches possible outcomes to a custom response for our users.

1. Now click Save, then click Test. Our test should pass.

1. Go to the developer portal.

1. Type 'go outside' into the Enter Utterance field found in the Service Simulator and press enter

1. Alexa should give us a customized recommendation according to your code.

### Extra Credit

What if we wanted to get info about local movie showtimes? Try adding another API call, maybe one that checks movie showtimes for a local theater, or something creative that you come up with yourself!


<br/><br/>
<a href="https://github.com/alexa/skill-sample-nodejs-city-guide/blob/master/instructions/6-intents-slots.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
