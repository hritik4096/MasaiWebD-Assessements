import React, { useRef } from "react";

function VideoPlayer() {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  const handleRestart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <div style={{ padding: "20px" }}>
      <video
        ref={videoRef}
        width="600"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls={false}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default VideoPlayer;