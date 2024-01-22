// Video.js

import React from 'react';
import ReactPlayer from 'react-player';

const Video = () => {
  const videoUrl = 'https://youtu.be/zFrlu3E18BA?si=eYhmmuLIXLrGXQqj';

  return (
    <div className="w-full h-[90vh]">
      <ReactPlayer
        url={videoUrl}
        playing={true}
        loop={true}
        controls={true} // Add the 'controls' prop to enable play controls
        muted={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Video;
