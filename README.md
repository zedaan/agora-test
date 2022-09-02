
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
