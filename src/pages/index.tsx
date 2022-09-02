import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { get } from "../utils/axios";

export const Home = () => {
  const [channelName, setChannelName] = React.useState<string>("");
  let navigate = useNavigate();

  const handleJoinChannel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const uid = Math.floor(Math.random() * 100);
    const ExpireTime = 300;
    await get(`/rtc/${channelName}/1/uid/${uid}/?expiry=${ExpireTime}`)
      .then((res) => {
        console.log(res.rtcToken, "resposne");
        localStorage.setItem("token", res.rtcToken);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate(`/AgoraPage/${channelName}/${uid}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleJoinChannel}>
        <div className="flex flex-col justify-center">
          <label
            htmlFor="channel-name"
            className="mb-3 text-slate-800 font-semibold"
          >
            Channel name
          </label>
          <input
            type="text"
            name="channel-name"
            id="channel-name"
            className="border-[1px] border-gray-300 rounded p-2 mb-3"
            placeholder="Enter channel name"
            onChange={(e) => setChannelName(e.target.value)}
            required={true}
          />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <button type="submit" className="bg-blue-600 p-2 rounded text-white">
            Join
          </button>
          <Link to={"/CreateChannel"} className="text-blue-500">
            Create a channel
          </Link>
        </div>
      </form>
    </div>
  );
};
