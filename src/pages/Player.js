import React from "react";
import VideoPlayer from "../components/VideoPlayer";

function Player({ location: { state }, history }) {
  if (!state) {
    history.push("/");
    return <></>;
  }

  return (
    <div id="video-player">
      <VideoPlayer src={state.vidUrl} controls={true} autoplay={true} />
    </div>
  );
}

export default Player;
