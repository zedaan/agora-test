import AgoraRTC from "agora-rtc-sdk";

export const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
