# Build An Alexa City Guide Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png)](1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png)](2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](6-publication.md)

## What You Will Learn
*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  Voice User Interface (VUI) Design
*  Skill Certification
*  State Management
* [Speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference)

## What You Will Need
*  [Amazon Developer Portal Account](http://developer.amazon.com)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](#).
*  Simple graphical editing tool

## What Your Skill Will Do
At some point we all gain some unexpected free time and wonder "What should I do today?". Whether going to a local restaurant or coffeehouse, checking out the local library, or just staying inside if the weather is bad, some suggestions are almost always welcome. Especially when those suggestions come from an individual who knows the area very well.

You can now bring that experience to Alexa using our new city guide template. Today you will provide the city and the places to visit in that city, and Alexa will dynamically build a recommendation for you. In the guide, Alexa will give recommendations like:
*  "For breakfast, try this, Zeke's place."
*  "Seaport Grille is located at 6 Rowe Square."
*  "Try whale watching, which is 8 miles away. Have fun!"

If you’re in the US, we've also included the new [speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference) feature for Alexa skill development. Speechcons are special words and phrases that Alexa pronounces more expressively. We use them in this quiz game to let the user know whether they gave a correct or incorrect answer during the quiz.

If you would like to see an example of this skill in action, you can enable the [Gloucester Guide](https://www.amazon.com/Robert-McCauley-Gloucester-Guide/dp/B0736QNPP1/ref=sr_1_5?s=digital-skills&ie=UTF8&qid=1501180976&sr=1-5&keywords=local+guide) from the [Alexa app](http://amazon.com/skills).  You may not get all of the info right away, but you'll definitely get a great feel for what your new local guide could sound like!

# Let's Get Started

<a href="./1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
