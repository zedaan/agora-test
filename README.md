# Implement authentication with Video SDK

Authentication is the act of validating the identity of each user before they access a system. Agora uses digital tokens to authenticate users and their privileges before they access Agora SD-RTN to join Video Calling. Each token is valid for a limited period and works only for a specific channel. For example, you cannot use the token generated for a channel called AgoraChannel to join the
AppTest channel.
This page shows you how to quickly set up an authentication token server, retrieve a token from
the server, and use it to connect securely to a specific Video Calling channel.

# Understand the tech
An authentication token is a dynamic key that is valid for a maximum of 24 hours. On request, a token server returns an authentication token that is valid to join a specific channel.
When users attempt to connect to an Agora channel from your app, your app retrieves a token from the token server in your security infrastructure. Your app then sends this token to Agora SD- RTN for authentication. Agora SD-RTN validates the token and reads the user and project information stored in the token. A token contains the following information:

* The [App ID](http://localhost:3000) App ID \of your Agora project
* The [App certificate](http://localhost:3000) 
* The channel name
* The user ID of the user to be authenticated (optional)
* The privilege of the user, either as a publisher or a subscriber The Unix timestamp showing when the token will expire

The following figure shows the call flow you need to implement to create step-up-authentication with Agora Video Calling:

# Prerequisites

To follow this procedure you must have:

1. Open the project you created in Get Started with Video Calling.
2. Log in to your [Heroku](https://www.heroku.com/) account.

# Project setup

To integrate token authentication into your app, do the following:

1. Open the project you created in [Get Started with Video Calling](http://localhost:3000)
2. Log in to your [Heroku](https://www.heroku.com/) account.

# Implement the authentication workflow

In the Get Started project you implemented, the app uses an authentication token obtained manually from Agora Console to join a channel. In a production environment, your app retrieves this token from a token server. This section shows you how to:

1. Create and run a token server
2. Retrieve and use tokens from a token server

# Create and run a token server

This section shows you how to deploy a token server on Heroku.

1. Click here and deploy a token server to Heroku.
    Heroku retrieves the project code and necessary files from Github and takes you to a **Create New App** page. On this page, fill in the following information:
    * `app-name:` A name for your token server, containing only lowercase letters, numbers, and dashes.
    * `APP_CERTIFICATE:` The obtained from Agora Console
    * The `APP_ID:` [App ID](http://localhost:3000) obtained from Agora Console

2. Click **Deploy app.** Heroku configures and builds the token server. 
    You see a message 'Your app was successfully deployed.'

3. Click **View.**
    Heroku opens the token server URL in your browser. The URL is of the form `<app-name>.herokuapp.com`
    where `<app-name>` is the name you chose for your token server.
   
    Don’t worry if you see `404 page not found` in your browser. Follow the next steps and test
    your server.

4. Test your server

    * Ping the server

        Load the following URL in a browser tab. Replace `<app-name>` with the name of your server.

        `1 https://<app-name>.herokuapp.com/ping`

        You see the following message in your browser:

        `1 {"message": "pong"}`

    * Retrieve a token

    To retrieve an RTC token, send a request to the token server using a URL based on the
   
    **Token server GET request structure:**

    ` 1 /rtc/:channelName/:role/:tokentype/:uid/?expiry=expireTime`

    For example: `https://my-token-server.herokuapp.` 

    Your token server returns the following JSON object to your browser:

    `1 {"rtcToken":"ThisIsAnExampleTokenThisIsAnExampleTokenThisIsAnExampleT`

    To see how to create a token generator inside your IAM system, see [Integrate a token generator.](http://localhost:3000)

# Retrieve and use tokens from a token server

To integrate authentication into an app:

1. **Add the necessary dependencies**

    In order to make HTTPS calls to a token server and interpret the JSON return parameters, integrate a HTTP client into your app. In agora_project, open a command prompt, then run the following command.

    `1 npm install axios`

2. **Import the HTTP client library**

    To access the axios HTTP client from your project, add the following line at the beginning of the file `main.js`:

    `1 import axios from "axios"`

3. **Enable the user to specify a channel**

    Add a text box to the user interface. Open `index.html` and add the following code before `<button type="button" id="join">`.

    `1 <input type="text" id="textbox"/>`

4. **Add variables for your connection to the token server**

   Declare the variables you need to specify the token-server url and the token expire time. In

    Code need to add ..... 

    Make sure you specify the token-server URL in exactly the same format as shown in the example.

5. **Retrieve a token from the server**  

    Use a GET request to retrieve an authentication token for a specific channel from the token
    server.

    In `mian.js`, add the following code before `StartBasicCall`:

6. **Update the `join` method to fetch a token**

    Call `FetchToken` to get a fresh token before joining a channel. In `main.js`, add the following
    code before `await agoraEngine.join(`: 

7. **Handle the event triggered by Agora SD-RTN when the token is about to expire**

    A token expires after the `ExpireTime` specified in the call to the server or after 24 hours,
    if the time is not specified. The `onTokenPrivilegeWillExpire` event receives a callback when the current token is about to expire so that a fresh token may be retrieved and used.

    In the `main.js`, add the following method before `window.onload = function()`:

    Code goes here


# Test your implementation

To ensure that you have implemented Agora token authentication workflow in your app:

1. [Generate a token](http://localhost:3000) in Agora Console. 

    Users communicate securely using channels in the same project. The App ID you use to generate this token must be the same one you supplied to Heroku.

2. In your browser, navigate to the [Agora web demo](http://localhost:3000) and update *App ID*, *Channel*, and *Token* with the values for your temporary token, then click **Join**.

3. In your app, Update the `appID` in the declarations to the value from Agora Console .

4. Set the `token` variable to an empty string in the declarations.

5. Update the `serverURL` in the declarations to the base address of your token server. For example, `http://app-name.herokuapp.com`.

6. To start the dev server, execute the following commands in the terminal.

    `1 npm run dev`

    Use the URL displayed in the terminal to open the app in your browser.

7. Update the channel name, in the text box to the same string you used on the demo page.

8. Press **Join** to connect to the same channel as the web demo.

    Your app magically connects to the same channel you used in web demo. You don’t need to hardcode a token in your app; each channel is secured with a specific token, and each token is refreshed automatically. That’s pretty cool!

# Reference

This section contains information that completes the information in this page, or points you to documentation that explains other aspects to this product.

**Source code for a token server**

The token server RESTful web service used in this page is written in Golang using the Gin framework. Want to use the code in your authentication service? [Download](https://www.heroku.com/) the token server source code and binaries for various platforms from Github.

To see how to create a token generator inside your IAM system, see [Integrate a token generator](https://www.heroku.com/)

**Token server GET request structure**

A token server GET request has the following structure:
    
`1 /rtc/:channelName/:role/:tokentype/:uid/?expiry=expireTime`

* `:channelName` is the name of the Agora Channel you wish to join

A channel name may contain numbers with both upper and lower case letters. The name length must be less than 64 characters.

* `:role` is the user role

    Use `1` for publisher, `2` for subscriber.

* `:token SD-RTN` supports both integer user IDs and string user accounts for token generation. To ensure smooth communication, all the users in a channel must use the same type of ID, that is, either the integer `uid`, or a string `userAccount`. Best practice is to use the `uid`.

* `:uid` is the user ID

    User Id can be any 32-bit unsigned integer. It can be set to 0, if you do not need to authenticate
    the user based on the user ID.
  

* `expireTime` (optional) is the number of seconds after which the token will expire

By default, a token expires after 24 hours unless a shorter life span is explicitly specified in the token request.

# API references

* [renewToken](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartcclient.html#renewtoken)