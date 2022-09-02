import AgoraRTC from "agora-rtc-sdk";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { client } from "../../utils/AgoraRTC";

const AgoraRTCPage = () => {
  const { channelName, id } = useParams();
  let navigate = useNavigate();
  const localStream: any = AgoraRTC.createStream({
    streamID: id,
    audio: true,
    video: true,
    screen: false,
  });

  useEffect(() => {
    const APP_ID = "849f89c7fcbb4071ae21093dae45057d";
    const APP_TOKEN = localStorage.getItem("token");
    const CHANNEL_NAME = channelName ? channelName : "";
    const UID = id ? id : "";

    client.init(APP_ID);
    client.join(
      APP_TOKEN,
      CHANNEL_NAME,
      UID,
      "Audio",
      (uid: any) => {
        console.log("User " + uid + " join channel successfully");
        localStream.init(
          () => {
            console.log("getUserMedia successfully");
            localStream.play("agora_local", { fit: "contain" });
            client.publish(localStream, (err: any) => {
              console.log("Publish local stream error: " + err);
            });
            client.on("stream-added", (evt: any) => {
              client.subscribe(
                evt.stream,
                { video: true, audio: true },
                (err: any) => {
                  console.log("Subscribe stream failed", err);
                }
              );
            });
            client.on("stream-subscribed", (evt: any) => {
              const stream = evt.stream;
              console.log(
                "Subscribe remote stream successfully: " + stream.getId()
              );
              stream.play("agora_remote" + stream.getId());
            });
          },
          (err: any) => {
            console.log("getUserMedia failed", err);
          }
        );
        client.publish(localStream, (err: any) => {
          console.log("Publish local stream error: " + err);
        });
      },
      (err: any) => {
        console.log("Join channel failed", { err });
      }
    );
  }, [channelName, id]);

  useEffect(() => {
    client.on("stream-added", (evt: any) => {
      let remote = evt.stream;
      let remoteId = remote.getId();
      if (remoteId !== id) {
        client.subscribe(remote, { video: true, audio: true }, (err: any) => {
          console.log("Subscribe stream failed", err);
        });
      }
      console.log("stream-added remote-uid: ", id);
    });

    client.on("stream-subscribed", (evt) => {
      let remote = evt.stream;
      let remoteId = remote.getId();
      remote.play("agora_remote");
      console.log("stream-subscribed remote-uid: ", remoteId);
    });

    client.on("stream-removed", (evt: any) => {
      let remote = evt.stream;
      let remoteId = remote.getId();
      remote.stop("agora_remote");
      console.log("stream-removed remote-uid: ", remoteId);
    });

    client.on("peer-leave", (evt: any) => {
      let remoteId = evt.uid;
      let remote = evt.stream;
      remote.close();

      console.log("peer-leave remote-uid: ", remoteId);
    });
  }, [channelName, id]);

  const handleLeave = () => {
    client &&
      client.unpublish(localStream, (err: any) => {
        console.log("Unpublish stream failed", err);
      });
    if (localStream) {
      localStream.stop();
      localStream.close();
    }
    client.leave(
      () => {
        console.log("Leave channel successfully");
        localStorage.removeItem("token");
        navigate("/");
      },
      (err: any) => {
        console.log("Leave channel failed", err);
      }
    );
  };

  const style = {
    width: "311px",
    height: "311px",
    marginBottom: "20px",
    marginTop: "10px",
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="mb-5 text-gray-700 font-semibold text-2xl">
          hello to agora
        </h1>
        <h2 className="mb-5 text-gray-700 font-semibold">
          Channel name: <span className="text-gray-400">{channelName}</span>
        </h2>
        <div className="flex gap-5">
          <div id="agora_local" className="bg-gray-200" style={style}></div>
          <div id="agora_remote" className="bg-gray-200" style={style}></div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLeave}
            className="bg-red-600 p-2 rounded text-white"
          >
            leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgoraRTCPage;
