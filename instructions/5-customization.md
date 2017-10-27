# Build An Alexa City Guide Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/tree/master/labs/LocalRecommendations/instructions/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/tree/master/labs/LocalRecommendations/instructions/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/tree/master/labs/LocalRecommendations/instructions/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/tree/master/labs/LocalRecommendations/instructions/4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png)](https://github.com/alexa/alexa-cookbook/tree/master/labs/LocalRecommendations/instructions/5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/tree/master/labs/LocalRecommendations/instructions/6-publication.md)

## Customization Labs


## Lab 2 - Intents with Slots

This lab will have you add Intents with Slots.

We will add a new Intent called ```MyNameIsIntent``` and define a slot with the intent.

Follow the steps for creating an intent in [step 1](https://github.com/alexa/alexa-cookbook/tree/master/labs/LocalRecommendations/instructions/1-voice-user-interface.md) with a sample utterance of "my name is {firstname}""

 * Create another handler within your AWS Lambda function for MyNameIsIntent that stores the firstname slot value in a local variable:
 * Be sure this line of code exists *inside* the scope of this new Intent Handler.

```
  const myName = this.event.request.intent.slots.firstname.value;
  const speechOutput =  'hello, ' + myName;
  const reprompt = 'try again.'
```

 * Repeat the name back to the user as part of the MyNameIsIntent handler.

 For example, you could have the MyNameIsIntent handler do this :

```
  this.response.speak(speechOutput).listen(reprompt);
  this.emit(':responseReady');
```

## Lab 3 - Session Attributes

Add session attributes to your skill to remember things.

Based on your work in the previous lab, your lambda function now has a MyNameIsIntent handler.

Add the following line of code after you have retrieved the firstname slot value into the myName variable:

```this.attributes['name'] = myName;```

Now, locate the handler for the AMAZON.StopIntent that you defined in Lab 1.
Within this handler, replace the code with the following:

```
  let myName = '';
  const speechOutput = 'goodbye, ' + myName;

  if (this.attributes['name']) {
    myName = this.attributes['name'];
  }

  this.speak(speechOutput);
  this.emit(':responseReady');

```

Test your skill.  Say "my name is sam".  Then say "stop".  You should hear a personalized goodbye message.

## Lab 4 - Calling Web Services
Your skill can make calls to external web services, APIs and REST services.

Read and follow the tutorial in the [external-calls/httpsGet](https://github.com/alexa/alexa-cookbook/blob/master/external-calls/httpsGet/README.md) folder, to create a starter skill that calls a web service.

Once you have this skill working:
 + Review the Lambda code.
 + Change the value of the myRequest from 'Florida' to 'California' or any other state.
 + Recalling what you have learned so far, try to add an Intent and Slot so that the user can say which state they want.


For example, you can repeat the steps from Lab 2, to add a new Intent to the Intent Schema, with the following slot:

```
        {
          "name":"usstate",
          "type":"AMAZON.US_STATE"
        }
```

Be sure to add a corresponding Sample Utterance line, such as:

```NewIntent go to {usstate}```

Then, within your Lambda code, you can get the value of the slot via:

```var myState = this.event.request.intent.slots.usstate.value;```


## Lab 5 - SSML Audio

Add short MP3 audio clips to your output via SSML.

SSML markup tags can be interspersed directly within normal speech output text.

You can test these within the **Voice Simulator** textbox, just above the Service Simulator textbox on the skill TEST page.


Examples:
```
There is a three second pause here <break time="3s"/>  then the speech continues.

<audio src='https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3' />
<audio src='https://s3.amazonaws.com/my-ssml-samples/cheap_thrills.mp3' />
<audio src='https://s3.amazonaws.com/my-ssml-samples/this_is_what_you_came_for.mp3' />
```

For example, you could make Alexa say words and sound effects by preparing an output string like this:

```
  let reprompt = 'try again'
  let speechOutput = " news flash <audio src='https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3' /> , i can create Alexa skills!";

  this.speak(speechOutput).listen(reprompt);
  this.emit('responseReady');
```

Read the [documentation page](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference#audio) on how to prepare and host MP3 audio clips in the required format.
You can use a tool such as "ffmpeg" or "vlc" to down-sample your existing MP3 content.  You can host the MP3s on your own website, or within the AWS S3 service.  Simply create an S3 bucket, upload your files, and set the files to be public, and note file properties which contain the public URL to the file.


## Lab 6 - Locale
Your skill code can create a custom response based on the geographic region of the user, whether they are in US, GB, or DE.

You can add conditional logic like this:

```
    let locale = this.event.request.locale;
    let speechOutput = '';
    let reprompt = 'try again'

    if (locale == 'en-GB'){
            speechOutput = 'hiya';

    } else if (locale == 'de-DE') {
            speechOutput = 'guten tag';

    } else {
            speechOutput = 'hello';
    }
    this.speak(speechOutput).listen(reprompt);
    this.emit('responseReady');

```

Based on Dean Bryen's post [How to Build a Multi-Language Alexa Skill](https://developer.amazon.com/blogs/post/Tx2XUAQ741IYQI4/how-to-build-a-multi-language-alexa-skill)


## Lab 7 - IOT Updates
Controlling IOT Devices

Read and follow the tutorial in the [aws/Amazon-IOT](https://github.com/alexa/alexa-cookbook/blob/master/aws/Amazon-IOT/README.md) folder.  You will:

 + Create a new virtual IOT device
 + Update it via a skill Lambda function
 + Build a web app to simulate a device and show updates happening


## Lab 8 - Session in DynamoDB

Skills written with the Node.JS ```alexa-sdk``` can easily store their session attributes in DynamoDB when the skill terminates.

When the user re-launches the skill at a later time, the session attributes are reloaded and available to the skill.

#### Pre-requisites:
Complete the lab exercises above.  You should have a Hello World skill that recalls the user's name upon exit.
Review the [Lab 3 solution](https://gist.github.com/robm26/aec28e68137e776aea9722a9fa7b4d56) to quickly create this skill.


#### Lab Steps:

Within your Lambda function's ```exports.handler``` block, add one new line:


```
exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);


    alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};
```

Add permissions for your Lambda function to access DynamoDB

1. From within AWS Console, click on IAM, then Roles, then ```lambda_basic_execution```:
1. Click "Attach Policy" and select a DynamoDB policy such as **AmazonDynamoDBFullAccess**
1. Test your skill by executing a unit test from the AWS Lambda console.
1. You may see an error such as ```"errorMessage": "Requested resource not found"```.  This is okay.
1. Wait 60 seconds, then navigate to [AWS DynamoDB](https://console.aws.amazon.com/dynamodb/home) and click on Tables.
1. You should see a table called ```YourTableName```.
1. Return to the Lambda console, and test your function again.  It should now succeed.
1. Return to DynamoDB, and click on Tables, then ```YourTableName```
1. Click on ```Items``` and you should now see a record that has "amzn1.ask.account" in the ```userId``` column
1. Click on this record to review the data stored for this userId.  You should see a mapAttr object that stores the state of your session.attributes.


Note:
 * The session.attribute state is persisted in Dynamo only when your skill ends.
 * The previous session.attributes is loaded again when the user starts the skill again.
 * The first 25GB of data stored in DynamoDB is always free.

#### Lab Demo
Test the full lifecycle of your skill to verify your name is remembered.

1. Launch your skill or begin testing in the Skill Test page.
1. Say "my name is sam"
1. Say "stop"
 + Your session has now ended and the "name" attribute should be stored in the DynamoDB table.  This is equivalent of an Echo user allowing the session to end and waiting for some time.
1. Begin testing the skill again.  Say "help"
 + You should hear "here is the help for you, sam"


## Lab 9 (optional)
Account Linking allows your users to enable your skill, and then enter their credentials to your existing website or directory.
This is how Uber and Domino's Pizza links an Alexa user to a user within their service.  The skill can gain access to user attributes, and the skill can make authenticated calls into the service using an OAuth token that is automatically kept for the user with their enabled skill.

Account linking is required as a component of a Smart Home skill.

 * Review the blog post about Account Linking: [Linking your Skill with LWA in Five Steps](https://developer.amazon.com/blogs/post/Tx3CX1ETRZZ2NPC/Alexa-Account-Linking-5-Steps-to-Seamlessly-Link-Your-Alexa-Skill-with-Login-wit)

Setup Account Linking to "Login with Amazon" as in the blog post.  Welcome the user by saying their full name.

## Lab 10

Using the **alexa-sdk**

  1. Search the internet for ```npm alexa sdk```
  1. Click the first link to open the alexa-sdk node module project page
  1. Read and scroll through the documentation and try out the code snippets in your skill.
  1. See if you can implement the Hi-Low guessing game described in the documentation.


**Once you have made the updates listed on this page, you can click "Next" to move on to Publishing and Certification of your skill.**


<br/><br/>
<a href="https://github.com/alexa/alexa-cookbook/tree/master/labs/LocalRecommendations/instructions/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
