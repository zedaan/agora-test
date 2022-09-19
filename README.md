# Implement authentication with Video SDK

Authentication is the act of validating the identity of each user before they access a system. Agora uses digital tokens to authenticate users and their privileges before they access Agora SD-RTN to join Video Calling. Each token is valid for a limited period and works only for a specific channel. For example, you cannot use the token generated for a channel called AgoraChannel to join the
AppTest channel.
This page shows you how to quickly set up an authentication token server, retrieve a token from
the server, and use it to connect securely to a specific Video Calling channel.

# Understand the tech
An authentication token is a dynamic key that is valid for a maximum of 24 hours. On request, a token server returns an authentication token that is valid to join a specific channel.
When users attempt to connect to an Agora channel from your app, your app retrieves a token from the token server in your security infrastructure. Your app then sends this token to Agora SD- RTN for authentication. Agora SD-RTN validates the token and reads the user and project information stored in the token. A token contains the following information:

* The [App ID](http://localhost:3000/video-calling/reference/manage-agora-account#get-the-app-idhttp://localhost:3000/video-calling/reference/manage-agora-account#get-the-app-id) App ID of your Agora project
* The [App certificate](http://localhost:3000/video-calling/reference/manage-agora-account#get-the-app-certificate) 
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

1. Open the project you created in [Get Started with Video Calling](http://localhost:3000/video-calling/get-started/get-started-sdk?platform=web)
2. Log in to your [Heroku](https://www.heroku.com/) account.

# Implement the authentication workflow





# API Overview

Updated Time 2022/07/13 00:32


Agora provides ensured quality of experience (QoE) for worldwide Internet-based voice and video communications through SD-RTN™.

## Channel Management

Method | Description
--- | --- 
createAgoraRtcEngine | Creates the IRtcEngine object.
initialize | Initializes IRtcEngine.
joinChannelWithOptions | Joins a channel with media options.
leaveChannel | Leaves a channel.


## Channel Events


Method | Description
--- | --- 
onJoinChannelSuccess | Occurs when a user joins a channel.
onLeaveChannel | Occurs when a user leaves a channel.
onRequestToken | Occurs when the token expires.
